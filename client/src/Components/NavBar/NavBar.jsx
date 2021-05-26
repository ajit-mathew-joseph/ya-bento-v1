import "./NavBar.scss";
import React from "react";
import Logo from "../../Assets/Logo/yb-logo.png";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import Modal from "react-awesome-modal";

function NavBar(props) {

    return (
        <div className="header-container">
            <Modal className="header__modal" visible={props.visible} width="300px" height="375px" effect="fadeInUp" onClickAway={props.closeModal}>
                <h2 className="header__modal-title">Get your Bento</h2>
                <div className="header__modal-login">
                    <form className="header__modal-form">
                        <p className="header__modal-text">Email</p>
                        <input className="header__modal-input" type="email" placeholder="Enter your e-mail" onChange={props.changeHandler("email")} />
                        <p className="header__modal-text">Password</p>
                        <input className="header__modal-input" type="password" placeholder="Enter your Password" onChange={props.changeHandler("password")} />
                        <button className="header__modal-button" onClick={props.login}>Log In</button>
                    </form>
                </div>
                <div className="header__modal-signUp">
                    <p className="header__modal-signUp-prompt">New User?</p>
                    <p className="header__modal-signUp-prompt"><Link to="/signup" onClick={() => props.closeModal()}>Sign Up</Link></p>
                </div>
            </Modal>

            <div className="header-mobile">
                <Link to="/"><img src={Logo} className="header-mobile__logo" alt="site logo" /></Link>
                {props.user ? (<Menu right noOverlay className={"header-mobile__list"}>
                    <Link to="/myAccount"><p className="header-mobile__list-item">MY ACCOUNT</p></Link>
                    <p className="header-mobile__list-item" onClick={() => props.logout()}>LOG OUT</p>
                    <Link to="/about"><p className="header-mobile__list-item">ABOUT</p></Link>
                    <p className="header-mobile__list-item">FAQs</p>
                </Menu>) : (<Menu right noOverlay className={"header-mobile__list"}>
                    <Link to="/signup"><p className="header-mobile__list-item">SIGN UP</p></Link>
                    <p className="header-mobile__list-item" onClick={() => props.openModal()}>LOGIN</p>
                    <Link to="/about"><p className="header-mobile__list-item">ABOUT</p></Link>
                    <p className="header-mobile__list-item">FAQs</p>
                </Menu>)}
            </div>

            <div className="header-desktop">
                <Link to="/"><img src={Logo} className="header-desktop__logo" alt="site logo" /></Link>
                <div className="header-desktop__container">
                    <ul className="header-desktop__list">
                        <Link to="/about"><li className="header-desktop__list-item">ABOUT</li></Link>
                        <Link to="#"><li className="header-desktop__list-item">FAQs</li></Link>
                    </ul>

                    {props.user ? (<div className="header-desktop__button-container">
                        <Link to="/myAccount"><button className="header-desktop__button">MY ACCOUNT</button></Link>
                        <button className="header-desktop__button--active" onClick={() => props.logout()}>LOG OUT</button>
                    </div>) : (<div className="header-desktop__button-container">
                        <Link to="/signup"><button className="header-desktop__button">SIGN UP</button></Link>
                        <button className="header-desktop__button--active" onClick={() => props.openModal()}>LOG IN</button>
                    </div>)}
                </div>
            </div>
        </div>
    );
}


export default NavBar;