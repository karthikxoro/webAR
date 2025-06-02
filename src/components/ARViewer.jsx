import { useEffect, useState } from "react";

const ARViewer = ({ modelURL }) => {
  const [modelPosition, setModelPosition] = useState("0 0 0");

  useEffect(() => {
  async function enableCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.style.position = "absolute";
      videoElement.style.top = "0";
      videoElement.style.left = "0";
      videoElement.style.width = "100vw";
      videoElement.style.height = "100vh";
      videoElement.style.objectFit = "cover";
      document.body.appendChild(videoElement);
      console.log("Camera feed enabled!");
    } catch (error) {
      console.error("Camera access denied!", error);
    }
  }
  enableCamera();
}, []);

  useEffect(() => {
    console.log("AR Mode Loaded");

    async function enableCamera() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Camera access granted!");
      } catch (error) {
        console.error("Camera access denied!", error);
      }
    }
    enableCamera();

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
    <a-scene embedded arjs id="ar-scene">
      <a-marker-camera>
        <a-entity gltf-model={modelURL} position="0 0 0" scale="1 1 1"></a-entity>
      </a-marker-camera>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARViewer;