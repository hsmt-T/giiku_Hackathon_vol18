import { useNavigate } from "react-router-dom";
import TpButton from "../../components/Button/Button";
import "./Home.css";
import jinjaImg from "../../assets/mainvisual.jpeg";

export const Home = () => {
    const navigate = useNavigate();
    return (
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
    );
};
