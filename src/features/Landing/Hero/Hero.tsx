import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const GradientPlane = () => {
  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial
        side={THREE.DoubleSide}
      >
        <canvasTexture
          attach="map"
          image={(() => {
            const canvas = document.createElement("canvas");
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext("2d")!;
            const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 300);
            gradient.addColorStop(0, "#f59e0b");
            gradient.addColorStop(0.3, "#f97316");
            gradient.addColorStop(0.6, "#ec4899");
            gradient.addColorStop(1, "#1e0030");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);
            return canvas;
          })()}
        />
      </meshBasicMaterial>
    </mesh>
  );
};

const MagicSphere = () => {
  return (
    <>
      {/* Piano gradiente DIETRO la sfera */}
      <GradientPlane />

      <mesh>
        <sphereGeometry args={[1.8, 128, 128]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={1024}
          transmission={1}
          roughness={0.07}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.08}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          color="#d8b4fe"
          envMapIntensity={0.5}
        />
      </mesh>

      <Environment background={false} resolution={256}>
        <Lightformer
          intensity={4}
          color="#a855f7"
          position={[0, 5, -3]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[15, 2, 1]}
        />
        <Lightformer
          intensity={3}
          color="#f97316"
          position={[0, -4, -1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[15, 2, 1]}
        />
        <Lightformer
          intensity={2}
          color="#ec4899"
          position={[-5, 1, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[8, 5, 1]}
        />
        <Lightformer
          intensity={1}
          color="#7c3aed"
          position={[5, 0, -2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          intensity={1.5}
          color="#fbbf24"
          position={[0, 0, -5]}
          scale={[5, 5, 1]}
        />
      </Environment>
    </>
  );
};

const Hero = () => (
  <section className="hero bg-c-dark min-h-screen w-full">
    <Canvas
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <MagicSphere />
    </Canvas>
  </section>
);

export default Hero;