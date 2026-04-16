import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Html, PerspectiveCamera, Stars, Float as FloatDrei } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

const ServiceNode = ({ position, label, index, onClick }: { position: [number, number, number], label: string, index: number, onClick?: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Orbit logic
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const radius = 3.5;
    const speed = 0.3 + (index * 0.05);
    const angle = time * speed + (index * (Math.PI * 2 / 5));
    
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.position.y = Math.sin(angle * 0.5) * 0.8;
  });

  return (
    <group>
      <FloatDrei speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh 
          ref={meshRef} 
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          className="cursor-pointer"
        >
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial 
            color={hovered ? "#8B5CF6" : "#4F46E5"} 
            emissive={hovered ? "#8B5CF6" : "#4F46E5"}
            emissiveIntensity={hovered ? 2 : 0.5}
            metalness={0.8}
            roughness={0.2}
          />
          <Html distanceFactor={10} position={[0, 0.5, 0]}>
            <div className={`
              px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 pointer-events-none
              ${hovered ? 'bg-primary text-white scale-110 opacity-100 shadow-[0_0_20px_rgba(139,92,246,0.5)]' : 'bg-background/80 text-muted-foreground opacity-70 scale-100'}
              text-xs font-bold border border-border/50 backdrop-blur-md
            `}>
              {label}
            </div>
          </Html>
        </mesh>
      </FloatDrei>
    </group>
  );
};

const Hub = () => {
  const hubRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!hubRef.current) return;
    hubRef.current.rotation.y += 0.01;
    hubRef.current.rotation.z += 0.01;
  });

  return (
    <group>
       <Sphere ref={hubRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#6366F1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          emissive="#4F46E5"
          emissiveIntensity={1}
        />
      </Sphere>
      {/* Glow Effect */}
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color="#8B5CF6"
          transparent
          opacity={0.1}
          emissive="#8B5CF6"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </group>
  );
};

const Connections = ({ count = 5 }) => {
  const lineRef = useRef<THREE.LineSegments>(null);
  
  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
        const radius = 3.5;
        const speed = 0.3 + (i * 0.05);
        const angle = time * speed + (i * (Math.PI * 2 / 5));
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 0.5) * 0.8;
        
        // Start point (Hub)
        positions[i * 6] = 0;
        positions[i * 6 + 1] = 0;
        positions[i * 6 + 2] = 0;
        
        // End point (Node)
        positions[i * 6 + 3] = x;
        positions[i * 6 + 4] = y;
        positions[i * 6 + 5] = z;
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 2 * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.15} linewidth={1} />
    </lineSegments>
  );
};

const ThreeHeroScene = () => {
  const services = [
    { label: "Business Directory", link: "/businesses" },
    { label: "Jobs Directory", link: "/jobs" },
    { label: "Ecommerce", link: "/products" },
    { label: "Business Network", link: "/profile" },
    { label: "Services", link: "/services" },
  ];

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] cursor-grab active:cursor-grabbing relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
        <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            
            <Hub />
            
            {services.map((service, index) => (
                <ServiceNode 
                    key={service.label} 
                    index={index} 
                    label={service.label} 
                    position={[0, 0, 0]} 
                    onClick={() => window.location.href = service.link}
                />
            ))}
            
            <Connections count={services.length} />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
    </div>
  );
};

export default ThreeHeroScene;
