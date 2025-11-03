import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CryptoChart({ position, color, speed }) {
  const meshRef = useRef();
  const points = useMemo(() => {
    const pts = [];
    // Створюємо графік що нагадує ціну криптовалюти
    for (let i = 0; i < 50; i++) {
      const x = (i - 25) * 0.1;
      const y = Math.sin(i * 0.3) * Math.random() * 2 + Math.sin(i * 0.1) * 3;
      const z = 0;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <line ref={meshRef} position={position}>
      <primitive object={lineGeometry} attach="geometry" />
      <lineBasicMaterial color={color} linewidth={2} />
    </line>
  );
}

function Particles() {
  const particlesRef = useRef();
  const particleCount = 100;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0003;
      particlesRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#b026ff" />

        {/* Криптографіки */}
        <CryptoChart position={[-3, 0, -2]} color="#00f0ff" speed={0.002} />
        <CryptoChart position={[3, 1, -3]} color="#b026ff" speed={-0.003} />
        <CryptoChart position={[0, -2, -1]} color="#39ff14" speed={0.0025} />

        {/* Частинки */}
        <Particles />
      </Canvas>
    </div>
  );
}
