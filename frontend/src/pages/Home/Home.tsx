import TpButton from "../../components/Button/Button";
import "./Home.css";
import jinjaImg from "../../assets/jinja.png";
import toriiImg from "../../assets/saisen.png";
import StepDialog from "../../components/StepDialog/StepDialog";

export const Home = () => {
    return (
        <section
            className="hero"
            style={{ backgroundImage: `url(${jinjaImg})` }}
        >
            <div className="hero__overlay" />

            <div className="hero__content">
                <h1 className="hero__title">
                    正しい参拝を学び<br />おみくじを引こう
                </h1>

                <TpButton
                    label="参拝する"
                    onClick={() => console.log("clicked")}
                    variant="tp"
                />
            </div>
            <StepDialog
                step="02"
                title="5円玉を投げるように腕を振ってみよう"
                image={toriiImg}
                onPrev={() => console.log("prev")}
                onNext={() => console.log("next")}
            />
        </section>
        
    );
};
