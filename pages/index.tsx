import TimeCounter from '../components/TimeCounter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10 w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Nossos Contadores de Tempo Especial
        </h1>

        <div className="mb-8 p-6 border border-pink-300 rounded-lg bg-pink-50">
          <h2 className="text-2xl font-semibold text-pink-700 mb-3">
            Tempo de Casamento <span role="img" aria-label="Wedding Rings">💍</span>
          </h2>
          <div className="text-lg text-pink-600">
            <TimeCounter startDateTime="2023-10-24T17:00:00" />
          </div>
        </div>

        <div className="p-6 border border-blue-300 rounded-lg bg-blue-50">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            Tempo de Namoro <span role="img" aria-label="Couple with Heart">💑</span>
          </h2>
          <div className="text-lg text-blue-600">
            <TimeCounter startDateTime="2021-01-15T20:30:00" />
          </div>
        </div>
      </div>
    </div>
  );
}
