import { useNavigate } from "react-router-dom";
import TpButton from "../../components/Button/Button";
import "./Home.css";
import jinjaImg from "../../assets/mainvisual.jpeg";
import goenImg from "../../assets/goen.jpeg";
import teawaseImg from "../../assets/teawase.png";
import kaneImg from "../../assets/kane.jpeg";
import daikitiImg from "../../assets/daikiti.png";
import tyukitiImg from "../../assets/chukiti.png";
import syokitiImg from "../../assets/shoukiti.png";
import kitiImg from "../../assets/kiti.png";
import suekitiImg from "../../assets/suekiti.png";
import kyouImg from "../../assets/kyou.png";
import daikyouImg from "../../assets/daikyou.png";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="hero" style={{ backgroundImage: `url(${jinjaImg})` }}>
                <div className="hero__overlay" />

                <div className="hero__content">
                    <h1 className="hero__title">
                        正しい参拝を学び
                        <br />
                        おみくじを引こう
                    </h1>

                    <TpButton label="参拝する" onClick={() => navigate("/sanpai")} variant="tp" />
                </div>
            </section>

            <section className="sanpai__lecture">
                <h2>正しい参拝の方法</h2>
                <div className="lecture__wraper">
                    <div className="lecture__wrap">
                        <span style={{ background: `url(${goenImg})` }}></span>
                        <div>
                            <p>step</p>
                            <h3>01</h3>
                        </div>
                        <p>
                            「良いご縁がありますように」という願いが込められている、穴の空いた硬貨は「見通しがよい」という意味でも縁起が良いとされます。{" "}
                        </p>
                    </div>
                    <div className="lecture__wrap">
                        <span style={{ background: `url(${teawaseImg})` }}></span>
                        <div>
                            <p>step</p>
                            <h3>02</h3>
                        </div>
                        <p>
                            神様への感謝や呼びかけ、そして邪気払いのためで、
                            音で神様を招き、神の霊力を呼び覚まし、
                            感謝や喜びを表現する意味があります。
                        </p>
                    </div>
                    <div className="lecture__wrap">
                        <span style={{ background: `url(${kaneImg})` }}></span>
                        <div>
                            <p>step</p>
                            <h3>03</h3>
                        </div>
                        <p>
                            神社で鈴を鳴らすのは、邪気や穢れを祓い清め、神様を呼び寄せ、御霊（みたま）を鎮め、参拝者の心を神様に届けるためです{" "}
                        </p>
                    </div>
                </div>
            </section>

            <section className="omikuji__wraper">
                <h2>おみくじ一覧</h2>
                <div className="omikuji__wrap">
                    <div>
                        <div style={{ background: `url(${daikitiImg})` }}></div>
                        <div style={{ background: `url(${tyukitiImg})` }}></div>
                        <div style={{ background: `url(${kitiImg})` }}></div>
                    </div>
                    <div>
                        <div style={{ background: `url(${syokitiImg})` }}></div>
                        <div style={{ background: `url(${suekitiImg})` }}></div>
                        <div style={{ background: `url(${kyouImg})` }}></div>
                    </div>
                    <div>
                        <div style={{ background: `url(${daikyouImg})` }}></div>
                    </div>
                </div>
            </section>
            <footer>
                <p>
                    <small>copyright &copy; comp ecccomp.inc</small>
                </p>
            </footer>
        </>
    );
};
