import React from "react";
import "./StepDialog.css";
import PointLabel from "../PointLabel/PointLabel";
import Button from "../Button/Button";

type Props = {
    step: string;
    title: string;
    image: string;
    onPrev?: () => void;
    onNext?: () => void;
};

const StepDialog: React.FC<Props> = ({step,title,image,onPrev,onNext,}) => {
    return (
        <div className="step-dialog-overlay">
            <div className="step-dialog">
                <div className="step-dialog__header">
                    <PointLabel number={step} />
                    <h2 className="step-dialog__title">{title}</h2>
                </div>

                <div className="step-dialog__image">
                    <img src={image} alt="" />
                </div>

                <div className="step-dialog__actions">
                    <Button
                        label="戻る"
                        variant="azuki"
                        onClick={onPrev}
                    />
                    <Button
                        label="次へ"
                        variant="red"
                        onClick={onNext}
                    />
                </div>

                <div className="step-dialog__dots">
                    <span className="dot active" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
            </div>
        </div>
    );
};

export default StepDialog;
