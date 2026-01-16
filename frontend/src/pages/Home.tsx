import TpButton from "../components/Button/Button";

export const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <TpButton
                label="参拝する"
                onClick={() => console.log("clicked")}
                variant="tp"
            />
            <TpButton
                label="参拝する"
                onClick={() => console.log("clicked")}
                variant="brown"
            />
        </>
    );
};