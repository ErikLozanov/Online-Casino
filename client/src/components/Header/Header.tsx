import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Header() {
    const { isAuthenticated } = useAuthContext();

    return (
        <div className="header-top">
            <div className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                            <div className="full">
                                <div className="center-desk">
                                    <div className="logo">
                                        <h3 id="header-logo-title">
                                            Casino Royale
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                            <div className="menu-area">
                                <div className="limit-box">
                                    <nav className="main-menu">
                                        <ul className="menu-area-main">
                                            <li className="active">
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="/about-us">
                                                    About
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="#casino">Roulette</a>
                                            </li>
                                            <li>
                                                <a href="#testimonial">Slots</a>
                                            </li>
                                            <li>
                                                <Link to="/contact-us">
                                                    Contact Us
                                                </Link>
                                            </li>
                                            {isAuthenticated ? (
                                                <li>
                                                    <a href="#booktable">
                                                        Logout
                                                    </a>
                                                </li>
                                            ) : (
                                                <>
                                                    <li>
                                                        <Link to="/users/login">
                                                            Log In
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <a href="#booktable">
                                                            Sign Up
                                                        </a>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end header inner */}
            {/* end header */}
        </div>
    );
}
