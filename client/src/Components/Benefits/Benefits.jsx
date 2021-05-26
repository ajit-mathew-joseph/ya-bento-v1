import React from 'react';
import "./Benefits.scss";
import heartLogo from "../../Assets/Icons/fitness-outline.svg";
import earthLogo from "../../Assets/Icons/earth-outline.svg";
import cashLogo from "../../Assets/Icons/cash-outline.svg";

function Benefits(props) {
    return (
        <div className="benefits">
            <h2 className="benefits__main-title">BENEFITS</h2>
            <div className="benefits__container">
                <div className="benefits__sub-container">
                    <img className="benefits__logo" src={cashLogo} alt="Cash Logo" />
                    <div className="benefits__text-container">
                        <h3 className="benefits__section-title">Cheap, good food</h3>
                        <p className="benefits__description">Pre-ordering food means we can plan better, which means lower costs, passed right back to you.
                        If you opt to pick up, then there's no additional delivery fees either. Now that's a good deal.</p>
                    </div>
                </div>

                <div className="benefits__sub-container">
                    <img className="benefits__logo" src={heartLogo} alt="Heart Logo" />
                    <div className="benefits__text-container">
                        <h3 className="benefits__section-title">Your health first</h3>
                        <p className="benefits__description">While it means fewer choices, our meals are tailored with nutrition in mind -- our 
                        nutritionists work hard to balance your protein and carb intake for your best health.</p>
                    </div>
                </div>

                <div className="benefits__sub-container">
                    <img className="benefits__logo" src={earthLogo} alt="Earth Logo" />
                    <div className="benefits__text-container">
                        <h3 className="benefits__section-title">Contribute to a better world</h3>
                        <p className="benefits__description">Every meal you buy from ya-Bento is less waste. Pre-ordering food allows us to plan
                        better, which means fewer deliveries and fewer ingredients ending up in a landfill.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Benefits;