import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import Header from "../../components/header/Header";
import StepDialog from "../../components/StepDialog/StepDialog";
import CompleteDialog from "../../components/SimpleDialog/SimpleDialog";
import steps from "../../types/step";

const StepFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFlowOpen, setIsFlowOpen] = useState(true);

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
        setIsCompleted(false);
        setCurrentStep(0);
    };

    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>

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
        </BrowserRouter>
    );
};

export default StepFlow;
