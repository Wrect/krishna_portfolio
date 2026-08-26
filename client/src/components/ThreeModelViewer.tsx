import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { useRef, Suspense, useMemo, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { Play, Pause, ZoomIn, ZoomOut, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Gauge, Maximize, Hand } from "lucide-react";

function STLModel({ url, rotationOffset }: { url: string, rotationOffset: {x: number, y: number} }) {
  const geom = useLoader(STLLoader, url);
  
  // Center the geometry so it rotates around its own axis
  const centeredGeom = useMemo(() => {
    geom.computeBoundingBox();
    geom.center();
    return geom;
  }, [geom]);

  return (
    <mesh geometry={centeredGeom} castShadow receiveShadow rotation={[rotationOffset.x, rotationOffset.y, 0]}>
      <meshStandardMaterial 
        color="#a8b2c1" 
        metalness={0.8} 
        roughness={0.3} 
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

// Helper component to control zoom programmatically
function CameraController({ zoomIn, zoomOut }: { zoomIn: boolean, zoomOut: boolean }) {
  const { camera } = useThree();
  
  if (zoomIn) {
    camera.position.z = Math.max(camera.position.z - 5, 10);
  }
  if (zoomOut) {
    camera.position.z = Math.min(camera.position.z + 5, 500);
  }
  
  return null;
}

export default function ThreeModelViewer({ modelUrl }: { modelUrl?: string }) {
  const url = modelUrl || `${import.meta.env.BASE_URL}introduction_model/intro.STL`;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Models stationary by default
  const [isRotating, setIsRotating] = useState(false);
  const [speed, setSpeed] = useState(1.5);
  const [panMode, setPanMode] = useState(false);
  const [manualRotation, setManualRotation] = useState({ x: 0, y: 0 });
  
  const [triggerZoomIn, setTriggerZoomIn] = useState(false);
  const [triggerZoomOut, setTriggerZoomOut] = useState(false);

  const handleZoomIn = () => {
    setTriggerZoomIn(true);
    setTimeout(() => setTriggerZoomIn(false), 50);
  };

  const handleZoomOut = () => {
    setTriggerZoomOut(true);
    setTimeout(() => setTriggerZoomOut(false), 50);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err.message);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const rotateManual = (axis: 'x' | 'y', amount: number) => {
    setIsRotating(false);
    setManualRotation(prev => ({ ...prev, [axis]: prev[axis] + amount }));
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-gradient-to-br from-background to-card rounded-lg overflow-hidden relative group" style={{ touchAction: 'none' }}>
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border/50 text-xs font-semibold text-foreground/80 pointer-events-none shadow-sm">
        Interactive WebGL
      </div>

      {/* Control Overlay - Always visible so user knows controls exist */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-md p-2 rounded-xl border border-border/50 shadow-lg">
        
        {/* Play / Pause */}
        <button 
          onClick={() => setIsRotating(!isRotating)}
          className={`p-2 rounded-lg transition-colors tooltip ${isRotating ? 'bg-[#DC2626]/20 text-[#DC2626]' : 'hover:bg-foreground/10 text-foreground/70'}`}
          title={isRotating ? "Pause Auto-Rotation" : "Play Auto-Rotation"}
        >
          {isRotating ? <Pause size={18} /> : <Play size={18} />}
        </button>

        {/* Speed Control */}
        <button 
          onClick={() => setSpeed(s => s === 1.5 ? 0.5 : 1.5)}
          className={`p-2 rounded-lg transition-colors tooltip ${speed === 0.5 ? 'bg-[#DC2626]/20 text-[#DC2626]' : 'hover:bg-foreground/10 text-foreground/70'}`}
          title="Toggle Slow Motion"
        >
          <Gauge size={18} />
        </button>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Pan Mode */}
        <button 
          onClick={() => setPanMode(!panMode)}
          className={`p-2 rounded-lg transition-colors tooltip ${panMode ? 'bg-[#DC2626]/20 text-[#DC2626]' : 'hover:bg-foreground/10 text-foreground/70'}`}
          title={panMode ? "Pan Mode Active (Left Click)" : "Enable Pan Mode"}
        >
          <Hand size={18} />
        </button>

        {/* Zoom Controls */}
        <button onClick={handleZoomOut} className="p-2 hover:bg-foreground/10 text-foreground/70 rounded-lg transition-colors" title="Zoom Out">
          <ZoomOut size={18} />
        </button>
        <button onClick={handleZoomIn} className="p-2 hover:bg-foreground/10 text-foreground/70 rounded-lg transition-colors" title="Zoom In">
          <ZoomIn size={18} />
        </button>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Directional Pad */}
        <div className="flex items-center gap-1">
          <button onClick={() => rotateManual('x', -0.2)} className="p-1 hover:bg-foreground/10 text-foreground/70 rounded-lg transition-colors" title="Rotate Up"><ArrowUp size={16} /></button>
          <button onClick={() => rotateManual('y', -0.2)} className="p-1 hover:bg-foreground/10 text-foreground/70 rounded-lg transition-colors" title="Rotate Left"><ArrowLeft size={16} /></button>
          <button onClick={() => rotateManual('y', 0.2)} className="p-1 hover:bg-foreground/10 text-foreground/70 rounded-lg transition-colors" title="Rotate Right"><ArrowRight size={16} /></button>
          <button onClick={() => rotateManual('x', 0.2)} className="p-1 hover:bg-foreground/10 text-foreground/70 rounded-lg transition-colors" title="Rotate Down"><ArrowDown size={16} /></button>
        </div>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Fullscreen */}
        <button onClick={handleFullscreen} className="p-2 hover:bg-foreground/10 text-foreground/70 rounded-lg transition-colors" title="Fullscreen">
          <Maximize size={18} />
        </button>

      </div>

      <Canvas shadows dpr={[1, 1.5]} performance={{ min: 0.5 }} camera={{ position: [0, 0, 100], fov: 45 }}>
        <color attach="background" args={["transparent"]} />
        
        <CameraController zoomIn={triggerZoomIn} zoomOut={triggerZoomOut} />

        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.8} castShadow={false} adjustCamera>
            <STLModel url={url} rotationOffset={manualRotation} />
          </Stage>
        </Suspense>
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          autoRotate={isRotating}
          autoRotateSpeed={speed}
          mouseButtons={{
            LEFT: panMode ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: panMode ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN
          }}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
