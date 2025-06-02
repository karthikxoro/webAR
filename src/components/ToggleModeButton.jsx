import { useState } from "react";
import ThreeDViewer from "./ThreeDViewer";
import ARViewer from "./ARViewer";

const ToggleModeButton = () => {
  const [isARMode, setIsARMode] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <button
        onClick={() => setIsARMode(!isARMode)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        {isARMode ? "Switch to 3D Viewer" : "Enter AR Mode"}
      </button>
      {isARMode ? (
        <ARViewer modelURL="/assets/Forklift.glb" />
      ) : (
        <ThreeDViewer modelURL="/assets/Forklift.glb" />
      )}
    </div>
  );
};

export default ToggleModeButton;