import React from "react";
import "./tparentButton.css";
import "./brownButton.css";

type Props = {
    label: string;
    onClick?: () => void;
    variant?: "tp" | "brown";
};

const Button: React.FC<Props> = ({
    label,
    onClick,
    variant = "tp",
}) => {
    return (
        <button
            className={`button ${variant}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;