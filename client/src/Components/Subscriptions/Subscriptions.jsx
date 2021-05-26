import React from 'react';
import "./Subscriptions.scss";
import { Link } from "react-router-dom";

function Subscriptions(props) {
    return (
        // Conditionally Rendering Links based on if User is logged in or not
        // Select Plan will go to the Login Modal if user isn't logged in/doesn't exist and the *MyAccount* page otherwise

        <div className="subscriptions">
            <h2 className="subscriptions__main-title">SUBSCRIPTIONS</h2>
            <div className="subscriptions__container">

                <div className="subscriptions__card">
                    <h3 className="subscriptions__card-title">The Regular</h3>
                    <div className="subscriptions__card-text">
                        <h3 className="subscriptions__card-price">$8.00</h3>
                        <p className="subscriptions__card-quantity">/Meal</p>
                        <p className="subscriptions__card-frequency">5 Deliveries per week</p>
                        {props.user ? (<Link to="/myAccount"><button className="subscriptions__button">Select Plan</button></Link>) : 
                        (<button className="subscriptions__button" onClick={() => props.openModal()}>Select Plan</button>)}
                    </div>
                </div>

                <div className="subscriptions__card">
                    <h3 className="subscriptions__card-title">The Occasional</h3>
                    <div className="subscriptions__card-text">
                        <h3 className="subscriptions__card-price">$9.00</h3>
                        <p className="subscriptions__card-quantity">/Meal</p>
                        <p className="subscriptions__card-frequency">3 Deliveries per week</p>
                        {props.user ? (<Link to="/myAccount"><button className="subscriptions__button">Select Plan</button></Link>) : 
                        (<button className="subscriptions__button" onClick={() => props.openModal()}>Select Plan</button>)}
                    </div>
                </div>

                <div className="subscriptions__card">
                    <h3 className="subscriptions__card-title">The Newcomer</h3>
                    <div className="subscriptions__card-text">
                        <h3 className="subscriptions__card-price">$10.00</h3>
                        <p className="subscriptions__card-quantity">/Meal</p>
                        <p className="subscriptions__card-frequency"> 1 Delivery per week</p>
                        {props.user ? (<Link to="/myAccount"><button className="subscriptions__button">Select Plan</button></Link>) : 
                        (<button className="subscriptions__button" onClick={() => props.openModal()}>Select Plan</button>)}
                    </div>
                </div>

            </div>
            <p className="subscriptions__info-text">*Delivery Fee not included</p>
        </div>
    );
}

export default Subscriptions;