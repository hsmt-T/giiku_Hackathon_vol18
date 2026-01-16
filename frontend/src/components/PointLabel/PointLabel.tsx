import React from "react";
import "./PointLabel.css";

type Props = {
    number: string;
};

const PointLabel: React.FC<Props> = ({ number }) => {
    return (
        <div className="point-label">
            <span className="point-label__text">Point</span>
            <span className="point-label__number">{number}</span>
        </div>
    );
};

export default PointLabel;
