import './Document3D.css';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect } from 'react';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.computeVertexNormals();
        child.rotation.set(-Math.PI / 80, Math.PI * 0.9, Math.PI / 80);
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#6a0dad'),
          roughness: 0.25,
          metalness: 0.0,
          side: THREE.DoubleSide,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
        });
      }
    });
    /*   const rimLight = new THREE.DirectionalLight('#8a2be2', 2);
    rimLight.position.set(5, 7, 4); // dietro e di lato
    scene.add(rimLight); */
  }, [scene]);

  return <primitive object={scene} />;
}

const Document3D = () => {
  const glbURL = '/document.glb';

  return (
    <Canvas
      shadows
      gl={{ toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace, alpha: true }}
      camera={{ position: [0, 1, 8], fov: 60 }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[0, 2, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, 2, -5]} intensity={1} color="#8a2be2" />
      {/* <Environment preset="studio" environmentIntensity={0} /> */}
      <Model url={glbURL} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Document3D;
