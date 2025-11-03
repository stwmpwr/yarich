import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CTAButton from './CTAButton';

const painPoints = [
  'Втомився втрачати гроші на pump&dump схемах?',
  'Не знаєш коли купувати і продавати?',
  'Самотній у світі крипто без підтримки?',
  'Бомбить від фейкових "експертів"?',
];

export default function Hero() {
  const containerRef = useRef();
  const painTextRef = useRef();
  const [painIndex, setPainIndex] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }
    );

    // Rotate pain points
    const interval = setInterval(() => {
      if (painTextRef.current) {
        gsap.to(painTextRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            setPainIndex((prev) => (prev + 1) % painPoints.length);
            gsap.fromTo(
              painTextRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden">
      {/* Electric glow blobs */}
      <div className="absolute top-20 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(0, 255, 65, 0.15)' }} />
      <div
        className="absolute bottom-20 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse"
        style={{ background: 'rgba(255, 255, 0, 0.1)', animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse"
        style={{ background: 'rgba(0, 255, 65, 0.08)', animationDelay: '2s' }}
      />

      <div ref={containerRef} className="max-w-4xl mx-auto text-center relative z-10">
        {/* Neon card */}
        <div className="backdrop-blur-xl bg-black/60 neon-gradient-border rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl">
          {/* Logo */}
          <h1 className="font-bold text-5xl md:text-8xl mb-2 md:mb-3 text-white tracking-tight">
            YaRich
          </h1>

          {/* Telegram handle */}
          <div className="mb-4 md:mb-6 neon-text-cyan text-xs md:text-lg font-medium tracking-widest flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse" style={{ background: '#00F0FF' }} />
            @marketmakercrypto
            <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse" style={{ background: '#00F0FF' }} />
          </div>

          {/* Value prop - rotating pain points */}
          <p className="text-base md:text-xl mb-4 md:mb-6 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            <span
              ref={painTextRef}
              className="block neon-text-red font-semibold mb-2"
            >
              {painPoints[painIndex]}
            </span>
            <span className="text-sm md:text-base text-gray-300">
              Щодня отримуй чесну аналітику та підтримку експерта. Без води і платних каналів.
            </span>
          </p>

          <p className="text-lg md:text-2xl font-bold mb-6 md:mb-8 neon-text-gradient animate-gradient">
            Подивись на ринок без ілюзій
          </p>

          {/* CTA */}
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
