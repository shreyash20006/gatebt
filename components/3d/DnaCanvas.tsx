'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HelixParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const navy = new THREE.Color('#0B2A63');
    const azure = new THREE.Color('#1CA3DC');
    const gold = new THREE.Color('#F6B10A');

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 8;
      const strand = i % 2 === 0 ? 1 : -1;
      const radius = 1.8;

      const x = Math.cos(t + (strand * Math.PI) / 2) * radius;
      const y = (i / count) * 10 - 5;
      const z = Math.sin(t + (strand * Math.PI) / 2) * radius;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const choice = Math.random();
      const color = choice < 0.5 ? azure : choice < 0.8 ? navy : gold;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

export default function DnaCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <HelixParticles />
      </Canvas>
    </div>
  );
}
