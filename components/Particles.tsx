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
  showComet?: boolean;
  className?: string;
}

// Cores de estrelas reais (tons azulados, brancos e avermelhados)
const defaultColors: string[] = [
  "#FFFFFF", 
  "#F8F7FF", 
  "#FFF4E8", 
  "#FFE9D1", 
  "#CAE8FF", 
  "#A7C5EB", 
  "#92A8D1",
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

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  attribute float isComet; // 1.0 se for o cometa, 0.0 caso contrário
  
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
  varying float vIsComet;
  
  void main() {
    vRandom = random;
    vColor = color;
    vIsComet = isComet;
    
    vec3 pos = position;
    
    // Movimento especial para o cometa
    if (isComet > 0.5) {
      // Trajetória lenta e linear da direita para a esquerda (oeste)
      pos.x -= uTime * 0.1;
      pos.y += sin(uTime * 0.2) * 0.05; // Pequena oscilação
      vBrightness = 1.0; // Brilho máximo constante
    } else {
      // Cintilação suave para estrelas normais
      vBrightness = 0.7 + 0.3 * sin(uTime * random.y * 1.5 + random.x * 10.0);
    }
    
    pos *= uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    
    if (isComet < 0.5) {
        float t = uTime;
        float moveFactor = mix(0.1, 0.4, random.x);
        mPos.x += sin(t * random.z * 0.6 + 6.28 * random.w) * moveFactor;
        mPos.y += sin(t * random.y * 0.6 + 6.28 * random.x) * moveFactor;
        mPos.z += sin(t * random.w * 0.6 + 6.28 * random.y) * moveFactor;
    }
    
    vec4 mvPos = viewMatrix * mPos;
    
    // Tamanho diferenciado para o cometa
    if (isComet > 0.5) {
      gl_PointSize = (uBaseSize * 3.5) / length(mvPos.xyz);
    } else {
      float sizeVariation = pow(random.x, 2.0) * uSizeRandomness * 1.5;
      gl_PointSize = (uBaseSize * (0.4 + sizeVariation)) / length(mvPos.xyz);
    }
    
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  varying float vBrightness;
  varying float vIsComet;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    vec2 center = vec2(0.5);
    
    // Lógica para o cometa
    if (vIsComet > 0.5) {
      // Cauda simulada alongando o ponto
      uv.x -= 0.5; // Centraliza
      uv.x *= 0.1; // Achata ainda mais para uma cauda bem longa
      uv.x += 0.5; // Reposiciona

      float d = length(uv - center);
      float glow = 0.0;

      if(d < 0.5) {
        // Núcleo brilhante
        glow = smoothstep(0.1, 0.0, d);
        // Cauda que se desvanece
        glow += smoothstep(0.5, 0.1, d) * (1.0 - uv.x) * 0.9; // Cauda mais opaca
      }
      
      if (glow < 0.01) discard;
      
      gl_FragColor = vec4(vColor, glow);

    } else { // Lógica para estrelas normais
      float d = length(uv - center);
      float glow = 0.0;

      if(d < 0.5) {
        if(d < 0.08) glow = 1.0;
        else if(d < 0.2) glow = mix(1.0, 0.5, (d - 0.08) * 8.33);
        else glow = mix(0.5, 0.0, (d - 0.2) * 3.33);
        
        glow *= vBrightness;
        
        vec3 starColor = vColor;
        if(d > 0.15) {
          float chromatic = (d - 0.15) * 2.85;
          starColor.r *= (1.0 + chromatic * 0.3);
          starColor.b *= (1.0 - chromatic * 0.15);
        }
        if(d < 0.12) starColor = mix(vec3(1.0), starColor, d * 8.33);
        
        if(uAlphaParticles < 0.5) gl_FragColor = vec4(starColor, 1.0);
        else gl_FragColor = vec4(starColor, glow);

      } else {
        discard;
      }
    }
  }
`;

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 2500,
  particleSpread = 15,
  speed = 0.15,
  particleColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 0.2,
  alphaParticles = true,
  particleBaseSize = 70,
  sizeRandomness = 3.0,
  cameraDistance = 25,
  disableRotation = false,
  showComet = true,
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
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };
    if (moveParticlesOnHover) container.addEventListener("mousemove", handleMouseMove);

    const totalParticles = showComet ? particleCount + 1 : particleCount;
    const positions = new Float32Array(totalParticles * 3);
    const randoms = new Float32Array(totalParticles * 4);
    const colors = new Float32Array(totalParticles * 3);
    const isComet = new Float32Array(totalParticles);
    const palette = particleColors ?? defaultColors;

    // Distribuição para Via Láctea
    for (let i = 0; i < particleCount; i++) {
      let x, y, z;
      if (Math.random() < 0.7) { // 70% das estrelas na faixa
        x = (Math.random() - 0.5) * 2; // Espalha em X
        y = (Math.random() - 0.5) * 0.2; // Compacta em Y
        z = (Math.random() - 0.5) * 1.5;
        
        // Rotação para inclinar a faixa
        const angle = Math.PI / 4;
        const newY = y * Math.cos(angle) - z * Math.sin(angle);
        const newZ = y * Math.sin(angle) + z * Math.cos(angle);
        y = newY;
        z = newZ;
      } else { // 30% espalhadas
        let len;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          z = Math.random() * 2 - 1;
          len = x * x + y * y + z * z;
        } while (len > 1 || len === 0);
      }
      
      const r = Math.pow(Math.random(), 0.5);
      positions.set([x * r, y * r, z * r], i * 3);
      
      randoms.set([Math.random(), Math.random() * 0.8 + 0.2, Math.random(), Math.random()], i * 4);
      
      const colorIndex = Math.random() > 0.85 ? Math.floor(Math.random() * 2) + 3 : Math.floor(Math.random() * 3);
      colors.set(hexToRgb(palette[colorIndex % palette.length]), i * 3);
      
      isComet[i] = 0.0;
    }

    // Adiciona o Cometa Leonard
    if (showComet) {
        const i = particleCount;
        positions.set([1.2, 0.3, 0], i * 3); // Posição inicial (direita, um pouco acima do centro)
        randoms.set([1, 1, 1, 1], i * 4); // Randoms não se aplicam, mas precisam de valor
        colors.set(hexToRgb("#EAF0FE"), i * 3); // Cor branco-azulada brilhante
        isComet[i] = 1.0;
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
      isComet: { size: 1, data: isComet },
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
      }
      
      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.00008) * 0.05;
        particles.rotation.y = Math.cos(elapsed * 0.00012) * 0.05;
        particles.rotation.z += 0.0005 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, [
    particleCount, particleSpread, speed, particleColors, moveParticlesOnHover, 
    particleHoverFactor, alphaParticles, particleBaseSize, sizeRandomness, 
    cameraDistance, disableRotation, showComet
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className || ""}`}
    />
  );
};

export default Particles; 