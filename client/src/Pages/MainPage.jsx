import "../Components/NavBar/NavBar";
import React from "react";
import Hero from "../Components/Hero/Hero"
import HiWorks from "../Components/HiWorks/HiWorks";
import Benefits from "../Components/Benefits/Benefits";
import Subscriptions from "../Components/Subscriptions/Subscriptions";

function MainPage(props) {
    return (
        <section className="main__nav">
            <Hero user={props.user} />
            <HiWorks/>
            <Benefits/>
            <Subscriptions openModal={props.openModal} closeModal={props.closeModal} visible={props.visible} user={props.user} />
        </section>
    );
}

export default MainPage;