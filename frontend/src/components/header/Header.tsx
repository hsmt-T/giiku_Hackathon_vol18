import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header_inner">
                <div className="header_logo">
                    <Link to="/">MAIRU</Link>
                </div>

                <nav className="header_nav">
                    <Link to="/">ホーム</Link>
                    <Link to="/">参拝</Link>
                    <Link to="/">おみくじ</Link>
                    <Link to="/">サイト概要</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
