import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CTAButton() {
  const buttonRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  const handleClick = () => {
    window.open('https://t.me/+P5rMLzNO3A4zY2Qy', '_blank');
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        transition: 'transform 0.15s ease-out',
        background: '#00F0FF',
        color: '#000',
      }}
      className="relative px-8 py-4 md:px-16 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all duration-300 group overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.5)]"
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        }}
      />

      {/* Extra glow on hover */}
      <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" style={{ background: '#00F0FF', boxShadow: '0 0 40px #00F0FF' }} />

      <span className="relative z-10 flex items-center justify-center gap-2">
        <span>Заглянути за ширму</span>
        <svg
          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </span>
    </button>
  );
}
