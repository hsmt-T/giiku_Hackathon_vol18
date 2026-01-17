import { useEffect, useRef, useState } from "react";

type DetectResponse = {
  detected: boolean;
};

type MotionResult = {
  clap: boolean;
  bow: boolean;
  swing: boolean;
  throw: boolean;
};

type MotionName = keyof MotionResult;

const motionEndpoints: Record<MotionName, string> = {
  clap: "clap",
  bow: "bow",
  swing: "swing",
  throw: "throw",
};

const motionEmojis: Record<MotionName, string> = {
  clap: "👏",
  bow: "🙇",
  swing: "🔄",
  throw: "💴",
};

type CameraProps = {
  detectMotion: MotionName; // ← ここで検知するモーションを指定
};

const Camera = ({ detectMotion }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [motion, setMotion] = useState<MotionResult>({
    clap: false,
    bow: false,
    swing: false,
    throw: false,
  });

  /* =========================
   * 検知ログ（デバッグ用）
   * ========================= */
  useEffect(() => {
    if (motion[detectMotion]) {
      console.log(`${motionEmojis[detectMotion]} ${detectMotion} detected`);
    }
  }, [motion, detectMotion]);

  /* =========================
   * ① カメラ起動
   * ========================= */
  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (e) {
        console.error("カメラ起動失敗", e);
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  /* =========================
   * ② モーション検知フレーム送信
   * ========================= */
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
    formData.append("image", blob);

    try {
      const res = await fetch(
        `http://localhost:8000/motion/${motionEndpoints[detectMotion]}`,
        { method: "POST", body: formData }
      );

      const data: DetectResponse = await res.json();

      if (data.detected) {
        setMotion((prev) => ({ ...prev, [detectMotion]: true }));
        setTimeout(
          () => setMotion((prev) => ({ ...prev, [detectMotion]: false })),
          1000
        );
      }
    } catch (e) {
      console.error(`${detectMotion} API error`, e);
    }
  };

  /* =========================
   * ③ 定期送信（指定されたモーションだけ）
   * ========================= */
  useEffect(() => {
    const id = setInterval(sendFrame, 100);
    return () => clearInterval(id);
  }, [detectMotion]);

  /* =========================
   * UI
   * ========================= */
  return (
    <div style={{ textAlign: "center" }}>
      <h2>参拝モーション検知</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: 640, borderRadius: 12, border: "2px solid #aaa" }}
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div style={{ fontSize: 120, marginTop: 16 }}>
        {motion[detectMotion] && motionEmojis[detectMotion]}
      </div>
    </div>
  );
};

export default Camera;
