import React from 'react';
import "./HiWorks.scss";
import mealImage from "../../Assets/Images/mealImage.jpg";
import orderImage from "../../Assets/Images/orderImage.jpg";
import pickupImage from "../../Assets/Images/pickupImage.jpg";

function HiWorks(props) {
    return (
        <div className="HiWorks">
            <h2 className="HiWorks__main-title">HOW IT WORKS</h2>
            <div className="HiWorks__container">
                <div className="HiWorks__sub-container">
                    <img className="HiWorks__image" src={orderImage} alt="Place Order Online" />
                    <div className="HiWorks__text-container">
                        <h3 className="HiWorks__section-title">Place your order online</h3>
                        <p className="HiWorks__description">Pick the days you want your deliveries, or pick a subscription plan, kick back and relax.</p>
                    </div>
                </div>

                <div className="HiWorks__sub-container">
                    <img className="HiWorks__image" src={pickupImage} alt="Pick Up Order" />
                    <div className="HiWorks__text-container HiWorks__text-container-2">
                        <h3 className="HiWorks__section-title">Pick up your order</h3>
                        <p className="HiWorks__description">Choose between delivery from one of our designated stalls,
                    free of charge, or enjoy convenience with the delivery option.</p>
                    </div>
                </div>

                <div className="HiWorks__sub-container">
                    <img className="HiWorks__image" src={mealImage} alt="Enjoy the meal" />
                    <div className="HiWorks__text-container">
                        <h3 className="HiWorks__section-title">Enjoy a great meal</h3>
                        <p className="HiWorks__description">Our promise to you is a new experience every day. Look forward to your meal and ittadakimasu!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HiWorks;