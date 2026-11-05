/**
 * File location: src/presentation/three/hero-scene.tsx
 * File function:
 * Escena tridimensional principal de la landing, construida con React Three
 * Fiber sobre three.js, que monta una malla de icosaedro con material PBR,
 * iluminacion de estudio y un suelo reflectante, preparada para animarse con
 * GSAP en las siguientes iteraciones del esqueleto.
 * All Rights Reserved arodoo
 */
"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#05060a"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#4f46e5" />

        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
          <mesh>
            <icosahedronGeometry args={[1.25, 1]} />
            <meshStandardMaterial
              color="#6366f1"
              roughness={0.18}
              metalness={0.85}
              wireframe={false}
            />
          </mesh>
        </Float>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#0a0b12" roughness={0.9} />
        </mesh>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Suspense>
    </Canvas>
  );
}
