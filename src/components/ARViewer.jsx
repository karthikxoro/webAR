import { useEffect, useState } from "react";

const ARViewer = ({ modelURL }) => {
  const [modelPosition, setModelPosition] = useState("0 0 0");

 useEffect(() => {
  async function enableBackCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }  // Forces back camera
      });
      console.log("Back Camera Access Granted!");

      // Create video element & attach stream
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
    } catch (error) {
      console.error("Camera access denied!", error);
    }
  }

  enableBackCamera();
}, []);

  useEffect(() => {
    console.log("AR Mode Loaded");
  }, []);


  useEffect(() => {
  const handleTap = (event) => {
    const touchX = event.clientX;
    const touchY = event.clientY;
    setModelPosition(`${touchX / 100} ${touchY / 100} -2`);
    console.log("Model placed at:", touchX, touchY);
  };

  document.addEventListener("click", handleTap);
  return () => document.removeEventListener("click", handleTap); // Cleanup
}, []);

useEffect(() => {
  console.log("Model Position Updated:", modelPosition);
}, [modelPosition]);


  return (
    <a-scene embedded arjs="sourceType: webcam;">
  <a-marker-camera>
   <a-entity gltf-model={modelURL} position={modelPosition} scale="1 1 1"></a-entity>
  </a-marker-camera>
  <a-entity camera></a-entity>
</a-scene>
  );
};

export default ARViewer;