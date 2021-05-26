import React from 'react';
import "./Footer.scss";
import FacebookLogo from "../../Assets/Icons/logo-facebook.svg";
import InstaLogo from "../../Assets/Icons/logo-instagram.svg";
import TwitterLogo from "../../Assets/Icons/logo-twitter.svg";
import {Link} from 'react-router-dom';


function Footer(props) {
    return (
        <div className="footer">
            <div className="footer__icons">
                <a href="https://www.facebook.com/" className="footer__icon--link"><img className="footer__icon" src={FacebookLogo} alt="Facebook"/></a>
                <a href="https://www.instagram.com/" className="footer__icon--link"><img className="footer__icon" src={InstaLogo} alt="Instagram"/></a>
                <a href="https://twitter.com/" className="footer__icon--link"><img className="footer__icon" src={TwitterLogo} alt="Twitter"/></a>
            </div>
            <ul className="footer__list">
                <Link to="/about"><li className="footer__list-item">ABOUT</li></Link>
                <Link to="#"><li className="footer__list-item">FAQs</li></Link>
                <Link to="#"><li className="footer__list-item">CAREERS</li></Link>
            </ul>
        </div>
    );
}

export default Footer;