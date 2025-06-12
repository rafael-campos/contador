import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
}

// Cores de estrelas reais (tons azulados, brancos e avermelhados)
const defaultColors: string[] = [
  "#FFFFFF", // Branco puro
  "#F8F7FF", // Branco azulado
  "#FFF4E8", // Branco amarelado
  "#FFE9D1", // Laranja muito claro (estrelas mais frias)
  "#CAE8FF", // Azul claro (estrelas quentes)
  "#A7C5EB", // Azul médio
  "#92A8D1", // Azul Serenity
];

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

// Shader de vértice melhorado para estrelas
const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  varying float vBrightness;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    // Cintilação mais rápida para cada estrela
    vBrightness = 0.7 + 0.3 * sin(uTime * random.y * 2.0 + random.x * 15.0);
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    
    // Movimento mais rápido para as estrelas
    float moveFactor = mix(0.1, 0.4, random.x);
    mPos.x += sin(t * random.z * 0.6 + 6.28 * random.w) * moveFactor;
    mPos.y += sin(t * random.y * 0.6 + 6.28 * random.x) * moveFactor;
    mPos.z += sin(t * random.w * 0.6 + 6.28 * random.y) * moveFactor;
    
    vec4 mvPos = viewMatrix * mPos;
    
    // Tamanho mais definido para as estrelas
    float sizeVariation = pow(random.x, 2.0) * uSizeRandomness * 1.5;
    gl_PointSize = (uBaseSize * (0.3 + sizeVariation)) / length(mvPos.xyz);
    
    gl_Position = projectionMatrix * mvPos;
  }
`;

// Shader de fragmento melhorado para estrelas
const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  varying float vBrightness;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    // Brilho central mais intenso e definido
    float glow = 0.0;
    if(d < 0.5) {
      // Núcleo da estrela - mais brilhante
      if(d < 0.08) {
        glow = 1.0;
      } 
      // Halo interno - mais definido
      else if(d < 0.2) {
        glow = mix(1.0, 0.5, (d - 0.08) * 8.33);
      }
      // Halo externo - menos difuso
      else {
        glow = mix(0.5, 0.0, (d - 0.2) * 3.33);
      }
      
      // Adicionar cintilação mais intensa
      glow *= vBrightness;
      
      // Adicionar pequeno efeito de aberração cromática nas bordas
      vec3 starColor = vColor;
      if(d > 0.15) {
        float chromatic = (d - 0.15) * 2.85;
        starColor.r *= (1.0 + chromatic * 0.3);
        starColor.b *= (1.0 - chromatic * 0.15);
      }
      
      // Adicionar brilho extra ao centro
      if(d < 0.12) {
        starColor = mix(vec3(1.0), starColor, d * 8.33);
      }
      
      if(uAlphaParticles < 0.5) {
        gl_FragColor = vec4(starColor * (1.0 + 0.3 * sin(vRandom.y * 6.28 + uTime * 2.0)), 1.0);
      } else {
        gl_FragColor = vec4(starColor * (1.0 + 0.3 * sin(vRandom.y * 6.28 + uTime * 2.0)), glow);
      }
    } else {
      discard;
    }
  }
`;

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 500,
  particleSpread = 10,
  speed = 0.3,
  particleColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 0.4,
  alphaParticles = true,
  particleBaseSize = 80,
  sizeRandomness = 2.5,
  cameraDistance = 20,
  disableRotation = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    // Distribuição de estrelas mais realista (mais concentradas no centro)
    for (let i = 0; i < count; i++) {
      // Distribuição esférica para posicionamento 3D mais natural
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      
      // Distribuição menos concentrada para parecer mais natural
      const r = Math.pow(Math.random(), 0.4); // Distribuição mais uniforme
      positions.set([x * r, y * r, z * r], i * 3);
      
      // Valores aleatórios para animação e tamanho
      randoms.set([
        Math.random(), // Tamanho
        Math.random() * 0.8 + 0.2, // Velocidade de cintilação
        Math.random(), // Fase x
        Math.random(), // Fase y
      ], i * 4);
      
      // Distribuição de cores mais realista para estrelas
      // Mais estrelas brancas/azuladas, poucas avermelhadas
      const colorIndex = Math.random() > 0.85 
        ? Math.floor(Math.random() * 2) + 3 // 15% de chance de cores mais quentes (índices 3-4)
        : Math.floor(Math.random() * 3); // 85% de chance de cores mais frias (índices 0-2)
      
      const col = hexToRgb(palette[colorIndex % palette.length]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        // Rotação mais rápida para um efeito mais dinâmico
        particles.rotation.x = Math.sin(elapsed * 0.0001) * 0.03;
        particles.rotation.y = Math.cos(elapsed * 0.00015) * 0.03;
        particles.rotation.z += 0.0008 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className || ""}`}
    />
  );
};

export default Particles; 