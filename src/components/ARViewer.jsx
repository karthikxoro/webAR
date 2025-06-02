import { useEffect, useState } from "react";

const ARViewer = ({ modelURL }) => {
  const [modelPosition, setModelPosition] = useState("0 0 0");

  useEffect(() => {
    console.log("AR Mode Loaded");

    navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
      console.log("Camera access granted!");
    }).catch(() => {
      console.error("Camera access denied!");
    });

    document.addEventListener("click", (event) => {
      const touchX = event.clientX;
      const touchY = event.clientY;
      setModelPosition(`${touchX / 100} ${touchY / 100} -2`);
      console.log("Model placed at:", modelPosition);
    });

    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", (event) => {
        console.error("WebGL context lost! Restarting...");
        event.preventDefault();
        setTimeout(() => window.location.reload(), 500);
      });
    }
  }, []);

  return (
    <a-scene embedded arjs>
      <a-marker-camera>
        <a-entity
          gltf-model={modelURL}
          position={modelPosition}
          scale="1 1 1"
          rotation="0 0 0"
        ></a-entity>
      </a-marker-camera>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARViewer;