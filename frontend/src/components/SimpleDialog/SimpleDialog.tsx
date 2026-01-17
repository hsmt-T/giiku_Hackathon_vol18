import React from "react";
import "./SimpleDialog.css";
import Button from "../Button/Button";

type Props = {
    title: string;
    description?: string;
    buttonLabel: string;
    onAction?: () => void;
};

const SimpleDialog: React.FC<Props> = ({
    title,
    description,
    buttonLabel,
    onAction,
}) => {
    return (
        <div className="simple-dialog-overlay">
            <div className="simple-dialog">
                <p className="simple-dialog__text">
                    {title}
                    {description && (
                        <>
                            <br />
                            {description}
                        </>
                    )}
                </p>

                <Button
                    label={buttonLabel}
                    variant="red"
                    onClick={onAction}
                />
            </div>
        </div>
    );
};

export default SimpleDialog;

