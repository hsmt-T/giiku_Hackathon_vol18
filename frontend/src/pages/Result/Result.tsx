import { useNavigate } from "react-router-dom";
import "./Result.css"
import TpButton from "../../components/Button/Button";
import downloadBtn from "../../assets/underber.png";
import omikujiImage from "../../assets/daikichi.png";

export const Result = () => {
    const unnsei = "大吉"
    const navigate = useNavigate();
    return (
        <div className="content">
            <div className="header-text">おみくじの結果は...</div>
            
            <h1 className="result-title">{unnsei}でした！</h1>
            
            <div className="image-container">
                <img 
                    src={omikujiImage} 
                    alt="おみくじ結果" 
                    className="omikuji-img" 
                />
            </div>

            <div className="save-section">
                <p className="save-text">画像を保存する</p>
                <div className="divider"></div>
                
                <button className="download-btn" 
                        onClick={() => alert("保存機能は別途実装が必要")}
                >
                    <img 
                        src={downloadBtn} 
                        alt="保存ボタン" 
                        style={{}}
                    />
                </button>
            </div>

            <div className="action-area">
                <TpButton
                    label="ホームへ"
                    onClick={() => navigate("/")}
                    variant="red"
                />
            </div>
        </div>
    );
};
