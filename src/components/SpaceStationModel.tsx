// src/components/SpaceStationModel.tsx

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// This component loads the 3D model
const Model: React.FC = () => {
  // UPDATED: Load model2.glb
  // We'll point this to the compressed version 'model2-draco.glb' in Step 3
  const { scene } = useGLTF('/model/model2-draco.glb'); // <-- UPDATED PATH
  
  // UPDATED: Increased scale from 0.6 to 1.5
  // Tweak this value as needed (e.g., 1.2, 1.8, etc.)
  return <primitive object={scene} scale={4.8} position={[0, -6, 0]} />;
};

// This is the main component we will lazy-load
const SpaceStationModel: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 50 }} 
      style={{ width: '100%', height: '450px' }} 
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Model />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={true} 
          autoRotateSpeed={0.8} 
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

// UPDATED: Preload the new compressed model
useGLTF.preload('/model/model2-draco.glb');

export default SpaceStationModel;