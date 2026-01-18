import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import StepDialog from "../../components/StepDialog/StepDialog";
import CompleteDialog from "../../components/SimpleDialog/SimpleDialog";
import Camera from "../../lib/camera";
import steps from "../../types/step";
import "./Sampai.css";

const motionOrder = ["throw", "clap", "bow", "swing"] as const;
const motionEmojis: Record<MotionName, string> = {
    throw: "01クリア🪙",
    clap: "02クリア👏",
    bow: "03クリア🙇",
    swing: "",
};

type MotionName = typeof motionOrder[number];


export const Sampai = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFlowOpen, setIsFlowOpen] = useState(true);
    const [motionIndex, setMotionIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [showMotionText, setShowMotionText] = useState<MotionName | null>(null);


    const currentMotion = motionOrder[motionIndex];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleCloseAll = () => {
        setIsFlowOpen(false);
    };

    const handleMotionDetected = () => {
        setShowMotionText(currentMotion);

        setTimeout(() => {
            setShowMotionText(null);
        }, 2000);
        if (motionIndex < motionOrder.length - 1) {
            setMotionIndex((prev) => prev + 1);
        } else {
            setIsFinished(true); // 全モーション完了
        }
    };

    return (
        <div className="sampai">


            {isFlowOpen && !isCompleted && (
                <StepDialog
                    step={steps[currentStep].step}
                    title={steps[currentStep].title}
                    image={steps[currentStep].image}
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}

            {isFlowOpen && isCompleted && (
                <CompleteDialog
                    title="手順は覚えたかな？"
                    description="実際にカメラに向かってやってみよう！"
                    buttonLabel="挑戦する"
                    onAction={handleCloseAll}
                />
            )}

            {!isFinished && (
                <Camera
                    detectMotion={currentMotion}
                    onDetected={handleMotionDetected}
                />
            )}
            {showMotionText && (
                <div style={{ fontSize: 65, textAlign: "center", marginTop: 80, color : "black", fontWeight: "bold", fontFamily: "'Noto Sans JP', sans-serif", }}>
                    {motionEmojis[showMotionText]}
                </div>
            )}


            {isFinished && (
                <CompleteDialog
                    title="参拝完了！"
                    description="おみくじを引いてみよう！！"
                    buttonLabel="おみくじを引く"
                    onAction={() => {
                    setIsFinished(false);
                    setMotionIndex(0);
                    setIsFlowOpen(true);
                    setCurrentStep(0);
                    navigate("/result")
                    }}
                    
                />
            )}
        </div>
    );
};
