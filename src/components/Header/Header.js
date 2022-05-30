import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header-area header-sticky">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            {/* ***** Logo Start ***** */}
                            <a href="index.html" className="logo">
                                <img src="assets/images/logo.png" />
                            </a>
                            {/* ***** Logo End ***** */}
                            {/* ***** Menu Start ***** */}
                            <ul className="nav">
                                <li className="scroll-to-section">
                                    <NavLink to={"/"}>Home</NavLink>
                                </li>
                                <li className="scroll-to-section">
                                    <NavLink to={"/men"} className="">Men's</NavLink>
                                </li>
                                <li className="scroll-to-section">
                                    <NavLink to={"/women"}>Women's</NavLink>
                                </li>
                                <li className="scroll-to-section">
                                    <NavLink to={"/kid"} className="">Kid's</NavLink>
                                </li>
                                <li className="submenu">
                                    <a href="javascript:;">Pages</a>
                                    <ul>
                                        <li>
                                            <NavLink to={"/about"} className="active">About</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/products"} className="active">Products</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/single-product"} className="active">Single_Product</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={"/contact"} className="active">Contact</NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li className="submenu">
                                    <a href="javascript:;">Features</a>
                                    <ul>
                                        <li><a href="#">Features Page 1</a></li>
                                        <li><a href="#">Features Page 2</a></li>
                                        <li><a href="#">Features Page 3</a></li>
                                        <li><a rel="nofollow" href="https://templatemo.com/page/4" target="_blank">Template Page 4</a></li>
                                    </ul>
                                </li>
                                <li className="scroll-to-section"><a href="#explore">Explore</a></li>

                                <li className="scroll-to-section">
                                    <NavLink to={"/login"} >Login</NavLink>
                                </li>
                            </ul>
                            <a className="menu-trigger">
                                <span>Menu</span>
                            </a>
                            {/* ***** Menu End ***** */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;