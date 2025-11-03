import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

function StatCard({ number, label, suffix = '', color = 'cyan' }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = cardRef.current;

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;

          gsap.to({}, {
            duration: 2,
            ease: 'power1.out',
            onUpdate: function () {
              setCount(Math.floor(this.progress() * number));
            },
          });

          gsap.from(element, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          });
        }
      },
    });
  }, [number]);

  const textClass = color === 'green' ? 'neon-text-green' : 'neon-text-yellow';
  const borderStyle =
    color === 'green'
      ? { borderColor: 'rgba(0, 255, 65, 0.3)' }
      : { borderColor: 'rgba(255, 255, 0, 0.3)' };
  const hoverBorderStyle =
    color === 'green'
      ? 'hover:border-[rgba(0,255,65,0.6)]'
      : 'hover:border-[rgba(255,255,0,0.6)]';
  const glowClass = color === 'green' ? 'group-hover:neon-glow-green' : 'group-hover:neon-glow-yellow';

  return (
    <div ref={cardRef}>
      <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02} transitionSpeed={400}>
        <div
          className={`group bg-black/40 backdrop-blur-sm border rounded-xl p-5 md:p-6 transition-all duration-300 ${hoverBorderStyle} ${glowClass}`}
          style={borderStyle}
        >
          <div className={`font-bold text-4xl md:text-5xl mb-1 ${textClass} tracking-tight`}>
            {count}
            {suffix}
          </div>
          <div className="text-gray-300 text-sm md:text-base">{label}</div>
        </div>
      </Tilt>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-4 md:py-6 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>

        <p className="text-center text-lg md:text-xl text-gray-300 mb-4">
          Понад 450 трейдерів вже з нами, приєднуйся і ти?
        </p>

        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
          <StatCard number={450} suffix="+" label="Учасників" color="green" />
          <StatCard number={5} suffix="+" label="Років досвіду" color="green" />
        </div>
      </div>
    </section>
  );
}
