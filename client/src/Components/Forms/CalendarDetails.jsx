import React, { useState } from 'react';
import { isSameDay } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Calendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import "./CalendarDetails.scss";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Iq8juFCbxaAmtxROpyQPoAUdZBJ7Qwuy9T90u2cNpM7W4otQR6AE6usR2PaRUH8QmhqmEpkfkKUyhSlmXnCnVqL00UW58sXwL")

function CalendarDetails(props) {
    // This is a set-up taken from React Nice Dates -- 
    // The Hook is being used to select values from the Calendar UI and then being stored in state 

    const [selectedDates, setSelectedDates] = useState([])
    const modifiers = {
        selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
    }
    const handleDayClick = date => {
        setSelectedDates([...selectedDates, date])
        props.logDates(selectedDates)
    }

    const handleClick = async (event) => {
        event.preventDefault();
        props.tempLog();

        if (props.values.subscriptionPlan === "The Regular -- $8") {
            const stripe = await stripePromise;
            const response = await fetch("http://localhost:8080/create-checkout-session/1", {
                method: "POST",
            });
            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            if (result.error) {
                console.log(result.error);
            }
        } else if (props.values.subscriptionPlan === "The Occasional -- $9") {
            const stripe = await stripePromise;
            const response = await fetch("http://localhost:8080/create-checkout-session/2", {
                method: "POST",
            });
            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            if (result.error) {
                console.log(result.error);
            }
        } else {
            const stripe = await stripePromise;
            const response = await fetch("http://localhost:8080/create-checkout-session/3", {
                method: "POST",
            });
            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            if (result.error) {
                console.log(result.error);
            }
        }
    };

    return (
        <div className="calendar-form">
            <h2 className="calendar-form__title">Select Dates for Delivery</h2>
            <div className="calendar-form__calendar">
                <Calendar onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
            </div>

            <div className="form__button-container--calendar">
                <button className="form__previous-button" onClick={() => { props.stepBackward() }}>Previous</button>
                <button className="form__next-button" onClick={handleClick}>Checkout</button>
            </div>
        </div>
    )
}

export default CalendarDetails;

