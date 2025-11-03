import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: '📊',
    title: 'Таймінг',
    desc: 'Вчасна аналітика і рука на пульсі ринку',
    color: 'orange',
  },
  {
    icon: '📚',
    title: 'Матеріали',
    desc: 'Безкоштовна аналітика ринку',
    color: 'yellow',
  },
  {
    icon: '💬',
    title: 'Спільнота',
    desc: 'Підтримка людей які дивляться ширше',
    color: 'cyan',
  },
  {
    icon: '🛡️',
    title: 'Без шахраїв',
    desc: 'Чесна аналітика без pump&dump',
    color: 'green',
  },
];

function BenefitCard({ icon, title, desc, color, index }) {
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      }
    );
  }, [index]);

  const colorMap = {
    green: {
      glow: 'group-hover:neon-glow-green',
      text: 'neon-text-green',
      border: 'rgba(0, 255, 65, 0.3)',
      hoverBorder: 'hover:border-[rgba(0,255,65,0.6)]',
    },
    orange: {
      glow: 'group-hover:neon-glow-orange',
      text: 'neon-text-orange',
      border: 'rgba(255, 107, 0, 0.3)',
      hoverBorder: 'hover:border-[rgba(255,107,0,0.6)]',
    },
    cyan: {
      glow: 'group-hover:neon-glow-cyan',
      text: 'neon-text-cyan',
      border: 'rgba(0, 240, 255, 0.3)',
      hoverBorder: 'hover:border-[rgba(0,240,255,0.6)]',
    },
    yellow: {
      glow: 'group-hover:neon-glow-yellow',
      text: 'neon-text-yellow',
      border: 'rgba(255, 255, 0, 0.3)',
      hoverBorder: 'hover:border-[rgba(255,255,0,0.6)]',
    },
  };

  const { glow: glowClass, text: textClass, border, hoverBorder: hoverBorderStyle } = colorMap[color];
  const borderStyle = { borderColor: border };

  return (
    <div ref={cardRef}>
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.02}
        transitionSpeed={400}
        className="group"
      >
        <div
          className={`bg-black/40 backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 ${hoverBorderStyle} ${glowClass}`}
          style={borderStyle}
        >
          <div className={`text-3xl mb-2 ${textClass}`}>{icon}</div>
          <h3 className={`font-bold text-base mb-1 ${textClass}`}>{title}</h3>
          <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
        </div>
      </Tilt>
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="relative py-4 md:py-6 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-bold text-2xl md:text-3xl text-center mb-5 neon-text-green">
          Що отримаєш в каналі?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
