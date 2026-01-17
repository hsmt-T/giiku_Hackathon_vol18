import { useEffect, useRef, useState } from "react";

type MotionResult = {
  clap: boolean;
  bow: boolean;
  swing: boolean;
  throw: boolean;
};

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [motion, setMotion] = useState<MotionResult>({
    clap: false,
    bow: false,
    swing: false,
    throw: false,
  });
  useEffect(() => {
    if (motion.clap) console.log("👏 clap detected");
    if (motion.bow) console.log("🙇 bow detected");
    if (motion.swing) console.log("🔄 swing detected");
    if (motion.throw) console.log("💴 throw detected");
  }, [motion]);

  // ① カメラ起動
  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ② フレーム送信
  const sendFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );
    if (!blob) return;

    const formData = new FormData();
    formData.append("image", blob); // ← FastAPI と一致

    try {
      const res = await fetch("http://localhost:8000/motion/frame", {
        method: "POST",
        body: formData,
      });

      const data: MotionResult = await res.json();
      setMotion(data);
    } catch (e) {
      console.error("motion error", e);
    }
  };

  // ③ 定期送信（300ms）
  useEffect(() => {
    const id = setInterval(sendFrame, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>参拝モーション検知</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: 640,
          borderRadius: 12,
          border: "2px solid #aaa",
        }}
      />

      {/* 送信用キャンバス */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* 結果表示 */}
      <div style={{ fontSize: 120, marginTop: 16 }}>
        {motion.clap && "👏 "}
        {motion.bow && "🙇 "}
        {motion.swing && "🔄 "}
        {motion.throw && "💴 "}
      </div>
    </div>
  );
};

export default Camera;
