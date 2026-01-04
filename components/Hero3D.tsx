
// @ts-nocheck
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  PointMaterial,
  Line,
  AdaptiveDpr,
  PerspectiveCamera
} from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import * as THREE from 'three';

const DNAStrand = ({ offset = 0, color = "#00A676" }) => {
  const count = 35;
  const radius = 1.6;
  const heightStep = 0.32;
  const groupRef = useRef();

  const spheres = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 0.38) + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (i - count / 2) * heightStep;
      list.push({ 
        pos: new THREE.Vector3(x, y, z), 
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5 
      });
    }
    return list;
  }, [offset]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    groupRef.current.children.forEach((mesh, i) => {
      const s = spheres[i];
      // Generative multi-layered pulse
      const wave1 = Math.sin(time * 1.5 + i * 0.15);
      const wave2 = Math.sin(time * 3.2 + s.phase) * 0.3;
      const pulse = (wave1 + wave2 + 2) / 2;
      
      mesh.scale.setScalar(pulse * 0.14);
      
      if (mesh.material) {
        mesh.material.emissiveIntensity = pulse * 2.0;
        // Subtle color shifting based on height
        mesh.material.color.lerp(new THREE.Color(color).add(new THREE.Color(0.1, 0.1, 0.1)), pulse * 0.1);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={1.5} 
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};

const DNABonds = () => {
  const count = 35;
  const radius = 1.6;
  const heightStep = 0.32;
  const groupRef = useRef();

  const lines = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) {
        const angle1 = (i * 0.38);
        const angle2 = (i * 0.38) + Math.PI;
        const start = [Math.cos(angle1) * radius, (i - count / 2) * heightStep, Math.sin(angle1) * radius];
        const end = [Math.cos(angle2) * radius, (i - count / 2) * heightStep, Math.sin(angle2) * radius];
        list.push({ start, end, phase: Math.random() * Math.PI });
      }
    }
    return list;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((line, i) => {
      // Shimmering bond effect
      line.material.opacity = 0.08 + Math.abs(Math.sin(time * 2 + lines[i].phase)) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((l, i) => (
        <Line 
          key={i} 
          points={[l.start, l.end]} 
          color="#ffffff" 
          lineWidth={0.8} 
          transparent 
          opacity={0.1} 
        />
      ))}
    </group>
  );
};

const ParticleField = () => {
  const count = 1500;
  const pointsRef = useRef();
  
  const [positions, initialPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 45;
      pos[i * 3] = init[i * 3] = x;
      pos[i * 3 + 1] = init[i * 3 + 1] = y;
      pos[i * 3 + 2] = init[i * 3 + 2] = z;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, init, vel];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const { mouse } = state;
    const attr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Drift physics
      attr.array[ix] += velocities[ix] + Math.cos(time + i) * 0.002;
      attr.array[iy] += velocities[iy] + Math.sin(time + i) * 0.002;
      attr.array[iz] += velocities[iz];

      // Mouse interactive turbulence
      const dx = attr.array[ix] - mouse.x * 12;
      const dy = attr.array[iy] - mouse.y * 12;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 6) {
        const repulsion = (6 - dist) / 50;
        attr.array[ix] += (dx / dist) * repulsion;
        attr.array[iy] += (dy / dist) * repulsion;
      }

      // Soft boundary reset
      if (Math.abs(attr.array[ix]) > 25) attr.array[ix] = -attr.array[ix] * 0.9;
      if (Math.abs(attr.array[iy]) > 25) attr.array[iy] = -attr.array[iy] * 0.9;
    }
    attr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.03;
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
        size={0.05} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HelixScene = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.25;
      groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <DNAStrand offset={0} color="#00A676" />
      <DNAStrand offset={Math.PI} color="#FFA600" />
      <DNABonds />
      {/* Floating data particles inside the helix core */}
      <points>
        <sphereGeometry args={[0.8, 16, 16]} />
        <PointMaterial color="#ffffff" size={0.02} opacity={0.2} transparent />
      </points>
    </group>
  );
};

const CameraRig = () => {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Organic cinematic breathing + mouse follow
    const breathX = Math.sin(time * 0.4) * 0.5;
    const breathY = Math.cos(time * 0.3) * 0.5;
    
    camera.position.lerp(vec.set(pointer.x * 3 + breathX, pointer.y * 2 + breathY, 14), 0.025);
    camera.lookAt(0, 0, 0);
    // Subtle tilt roll
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, pointer.x * 0.05, 0.025);
  });

  return null;
};

const PulsingLights = () => {
  const light1 = useRef();
  const light2 = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (light1.current) {
      light1.current.intensity = 2.5 + Math.sin(time * 1.1) * 1.5;
      light1.current.position.x = 10 * Math.sin(time * 0.5);
    }
    if (light2.current) {
      light2.current.intensity = 1.8 + Math.cos(time * 1.5) * 1.2;
      light2.current.position.z = 10 * Math.cos(time * 0.5);
    }
  });

  return (
    <>
      <pointLight ref={light1} position={[10, 10, 10]} color="#00A676" />
      <pointLight ref={light2} position={[-10, -10, -10]} color="#FFA600" />
      <spotLight position={[0, 20, 0]} intensity={1.5} angle={0.7} penumbra={1} color="#ffffff" />
      <ambientLight intensity={0.4} />
    </>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div 
      className="w-full h-full relative" 
      role="img" 
      aria-label="Generative interaktiv 3D biomolekulyar vizualizatsiya."
      style={{ minHeight: '500px' }}
    >
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center text-primary/40 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
          <Loader2 className="animate-spin mr-3" size={16} />
          Sinxronizatsiya...
        </div>
      }>
        <Canvas 
          gl={{ antialias: true, alpha: true, stencil: false, depth: true }} 
          camera={{ position: [0, 0, 14], fov: 45 }}
          shadows
        >
          <AdaptiveDpr pixelated />
          
          <PulsingLights />
          <CameraRig />

          <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.6}>
            <HelixScene />
          </Float>

          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hero3D;
