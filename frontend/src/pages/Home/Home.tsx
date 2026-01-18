import { useNavigate } from "react-router-dom";
import TpButton from "../../components/Button/Button";
import "./Home.css";
import jinjaImg from "../../assets/mainvisual.jpeg";
import toriiImg from "../../assets/torii.png";
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
                        <span style={{ background: `url(${toriiImg})` }}></span>
                        <div>
                            <p>step</p>
                            <h3>01</h3>
                        </div>
                        <p>
                            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                        </p>
                    </div>
                    <div className="lecture__wrap">
                        <span style={{ background: `url(${toriiImg})` }}></span>
                        <div>
                            <p>step</p>
                            <h3>01</h3>
                        </div>
                        <p>
                            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                        </p>
                    </div>{" "}
                    <div className="lecture__wrap">
                        <span style={{ background: `url(${toriiImg})` }}></span>
                        <div>
                            <p>step</p>
                            <h3>01</h3>
                        </div>
                        <p>
                            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                        </p>
                    </div>
                </div>
            </section>

            <section className="omikuji__wraper">
                <h2>おみくじ一覧</h2>
                <div className="omikuji__wrap">
                    <div>
                        <div style={{ background: `url(${daikitiImg})` }}></div>
                    </div>
                    <div>
                        <div style={{ background: `url(${tyukitiImg})` }}></div>
                        <div style={{ background: `url(${kitiImg})` }}></div>
                        <div style={{ background: `url(${syokitiImg})` }}></div>
                    </div>
                    <div>
                        <div style={{ background: `url(${suekitiImg})` }}></div>
                        <div style={{ background: `url(${kyouImg})` }}></div>
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
