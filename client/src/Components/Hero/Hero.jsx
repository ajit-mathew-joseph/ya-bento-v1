import "./Hero.scss";
import React from 'react';
import HeroVid from "../../Assets/Videos/Hero.mp4";
import { Link } from "react-router-dom";

function Hero(props) {
    return (
        <div className="hero">
            <div className="hero__video-container">
                <video autoPlay muted loop className="hero__video">
                    <source src={HeroVid} type="video/mp4" />
                </video>
            </div>
            <div className="hero__text-container">
                <div className="hero__text">
                    <h1 className="hero__description">Get ya-Bento Today</h1>

                </div>
                {props.user ? (<Link to="/myAccount"><button className="hero__button--2">MY ACCOUNT</button></Link>) : 
                (<Link to="/signup"><button className="hero__button">SIGN UP</button></Link>) }
                
            </div>

        </div>


    );
}

export default Hero;