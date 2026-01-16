import React from "react";
import "./tparentButton.css";
import "./brownButton.css";
import "./redButton.css";
import "./azukiButton.css"

type Props = {
    label: string;
    onClick?: () => void;
    variant?: "tp" | "brown" | "red" | "azuki";
};

const Button: React.FC<Props> = ({
    label,
    onClick,
    variant,
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