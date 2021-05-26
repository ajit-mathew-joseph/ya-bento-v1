import React from "react";
import "./SuccessPage.scss"


function SuccessPage(props) {
    return (
        <section className="success">
            <div className="success__container">
                <h2 className="success__title">Payment Successful!</h2>
                <button className="success__button" onClick={props.signUp}>Sign Up</button>
            </div>
        </section>
    );
}

export default SuccessPage;