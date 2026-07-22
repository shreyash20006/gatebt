'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Float, OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Helix() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.45;
    }
  });

  const nodes = useMemo(() => {
    const arr: { a: [number, number, number]; b: [number, number, number] }[] = [];
    const N = 26;
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 4;
      const y = (i - N / 2) * 0.32;
      arr.push({
        a: [Math.cos(t) * 1.3, y, Math.sin(t) * 1.3],
        b: [Math.cos(t + Math.PI) * 1.3, y, Math.sin(t + Math.PI) * 1.3],
      });
    }
    return arr;
  }, []);

  return (
    <group ref={group} rotation={[0.3, 0, 0.15]}>
      {nodes.map((n, i) => (
        <group key={i}>
          {/* Azure Sphere (Strand A) */}
          <mesh position={n.a}>
            <sphereGeometry args={[0.17, 24, 24]} />
            <meshStandardMaterial color="#1CA3DC" roughness={0.25} metalness={0.4} />
          </mesh>
          {/* Navy Sphere (Strand B) */}
          <mesh position={n.b}>
            <sphereGeometry args={[0.17, 24, 24]} />
            <meshStandardMaterial color="#0B2A63" roughness={0.25} metalness={0.4} />
          </mesh>
          {/* Gold Connecting Rung */}
          <Line points={[n.a, n.b]} color="#F6B10A" lineWidth={1.6} />
        </group>
      ))}
    </group>
  );
}

export default function DNAHero() {
  return (
    <div className="h-[280px] sm:h-[320px] w-full relative">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
          <Helix />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
