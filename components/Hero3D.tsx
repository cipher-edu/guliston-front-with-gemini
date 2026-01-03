
// @ts-nocheck
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Float, 
  Sphere,
  PointMaterial,
  Line,
  AdaptiveDpr
} from '@react-three/drei';
import * as THREE from 'three';

const DNAStrand = ({ offset = 0, color = "#00A676" }) => {
  const count = 30;
  const radius = 1.5;
  const heightStep = 0.3;

  const spheres = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 0.4) + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (i - count / 2) * heightStep;
      list.push({ pos: [x, y, z], scale: 0.12 });
    }
    return list;
  }, [offset]);

  return (
    <group>
      {spheres.map((s, i) => (
        <Sphere key={i} position={s.pos} args={[s.scale, 16, 16]}>
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={1.2} 
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

const DNABonds = () => {
  const count = 30;
  const radius = 1.5;
  const heightStep = 0.3;

  const lines = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) {
        const angle1 = (i * 0.4);
        const angle2 = (i * 0.4) + Math.PI;
        const start = [Math.cos(angle1) * radius, (i - count / 2) * heightStep, Math.sin(angle1) * radius];
        const end = [Math.cos(angle2) * radius, (i - count / 2) * heightStep, Math.sin(angle2) * radius];
        list.push({ start, end });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {lines.map((l, i) => (
        <Line 
          key={i} 
          points={[l.start, l.end]} 
          color="#ffffff" 
          lineWidth={0.5} 
          transparent 
          opacity={0.15} 
        />
      ))}
    </group>
  );
};

const ParticleField = () => {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  const pointsRef = useRef();
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <PointMaterial 
        transparent 
        color="#00A676" 
        size={0.08} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.4}
      />
    </points>
  );
};

const HelixScene = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      <DNAStrand offset={0} color="#00A676" />
      <DNAStrand offset={Math.PI} color="#FFA600" />
      <DNABonds />
    </group>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div 
      className="w-full h-full relative" 
      role="img" 
      aria-label="Interaktiv, aylanuvchi 3D DNK spiral modeli."
      style={{ minHeight: '500px' }}
    >
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center text-primary/40 font-bold uppercase tracking-widest text-xs">
          3D Model yuklanmoqda...
        </div>
      }>
        <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 10], fov: 40 }}>
          <AdaptiveDpr pixelated />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#00A676" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#FFA600" />
          <spotLight position={[0, 20, 0]} intensity={1.5} angle={0.5} penumbra={1} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <HelixScene />
          </Float>

          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hero3D;
