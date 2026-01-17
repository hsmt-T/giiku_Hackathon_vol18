import { useNavigate } from "react-router-dom";
import "./Result.css"
import TpButton from "../../components/Button/Button";

export const Result = () => {
    const unnsei = "大吉"
    const navigate = useNavigate();
    return (
        <div className="content">
            <h1>a</h1>
            <p>こんにちわ</p>
            <p>${unnsei}でした！</p>
            <img src="" alt="" />
            <p>画像の保存</p>
            <p>____________</p>
            {/* icon */}
            <TpButton
                    label="ホームに戻る"
                    onClick={() => navigate("/")}
                    variant="red"
                />
        </div>
    );
};
