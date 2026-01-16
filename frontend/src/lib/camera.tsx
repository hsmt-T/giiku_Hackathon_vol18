import { useEffect, useRef } from "react";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1200,
            height: 500,
            facingMode: "user", // スマホ背面なら "environment"
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("カメラ起動エラー", err);
        alert("カメラを起動できませんでした");
      }
    };

    startCamera();

    // コンポーネント破棄時にカメラ停止
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Camera Check</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          maxWidth: 640,
          borderRadius: 12,
          border: "2px solid #ccc",
        }}
      />
    </div>
  );
};

export default Camera;
