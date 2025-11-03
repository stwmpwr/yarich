import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Stats from './components/Stats';
import TradingChart from './components/TradingChart';
import ParticleBackground from './components/ParticleBackground';
import CTAButton from './components/CTAButton';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Trading Chart Background - reduced opacity */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 opacity-30">
          <TradingChart />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 snap-y snap-mandatory">
        <section className="snap-start min-h-screen">
          <Hero />
        </section>

        <section className="snap-start min-h-screen flex flex-col justify-center">
          <Benefits />
          <Stats />

          {/* Footer with CTA */}
          <footer className="relative py-8 text-center border-t border-white/10 mt-6">
            <div className="max-w-3xl mx-auto px-4">
              <h3 className="text-xl md:text-2xl font-bold mb-2 neon-text-green">
                Рухайся з капіталом, а не проти нього
              </h3>
              <p className="text-base md:text-lg text-gray-300 mb-6">
                Приєднуйся до спільноти розумних трейдерів
              </p>
              <div className="mb-6 flex justify-center">
                <CTAButton />
              </div>

              <p className="text-gray-500 text-xs md:text-sm font-light">
                &copy; 2025 YaRich. All rights reserved.
              </p>
              <p className="mt-2">
                <a
                  href="https://t.me/+P5rMLzNO3A4zY2Qy"
                  className="neon-text-green hover:opacity-80 transition-opacity font-medium text-sm"
                >
                  @marketmakercrypto
                </a>
              </p>

              {/* WhiteBit Partner Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm md:text-base">
                <span className="text-gray-400">🤝</span>
                <span className="text-gray-300">Офіційний партнер</span>
                <span className="font-semibold neon-text-cyan">WhiteBit</span>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
