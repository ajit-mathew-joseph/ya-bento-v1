import React from "react";
import "./AboutPage.scss";
import TravellerImg from "../Assets/Images/Nature.jpg";
import CheapImg from "../Assets/Images/Cheap.jpg";
import HealthyImg from "../Assets/Images/Healthy.jpg";
import EnvironmentImg from "../Assets/Images/Environment.jpg";

function AboutPage(props) {
    return (
        <section className="about">
            <div className="about__hero">
                <h2 className="about__hero-title">About Us</h2>
            </div>

            <div className="about__history-section">
                <h2 className="about__history-title">Our History</h2>
                <img className="about__history-image" src={TravellerImg} alt="travelling person" />
                <div className="about__history-container">
                    <p className="about__history-content">On his travels across Canada in the Summer of 2019, our Founder pondered about the
                    cost of food. He lamented the cost of his journey, especially that of food, and wondered how people who worked daily could
                afford it, discounting the unhealthiness of eating outside daily.</p>
                    <p className="about__history-content">Intrigued, he decided to conduct research on the matter,
                    and discovered that eating out daily was out of necessity and not choice, and the consequences were poor health and satifisaction.
                    Inspired, he committed to launching a meal service that would keep costs low while providing his customers with healthy choices. Thus, ya-Bento
                was born.</p>
                </div>
            </div>

            <div className="about__values-section">
                <h2 className="about__values-title">Our Values</h2>

                <div className="about__values-sub-container">
                    <img className="about__values-image" src={CheapImg} alt="Cheap Food" />
                    <div className="about__text-container about__text-container-2">
                        <h3 className="about__values-subTitle">Keep it Cheap</h3>
                        <p className="about__values-content">Our Core Tenet is making sure our customers, no matter how much they make,
                        can afford to take part in our meal plans. We work to ensure that the quality and price are kept consistent,
                        so our customers can enjoy a delicious meal every day.</p>
                    </div>
                </div>

                <div className="about__values-sub-container">
                    <img className="about__values-image" src={HealthyImg} alt="Healthy Food" />
                    <div className="about__text-container about__text-container-2">
                        <h3 className="about__values-subTitle">Keep it Healthy</h3>
                        <p className="about__values-content">Our customers' health comes first. Our nutritionists work to make sure
                        that the perfect balance of nutrients are added to every meal. A healthy customer is a happy customer after all.</p>
                    </div>
                </div>

                <div className="about__values-sub-container">
                    <img className="about__values-image" src={EnvironmentImg} alt="Environmentally Friendly" />
                    <div className="about__text-container about__text-container-2">
                        <h3 className="about__values-subTitle">Keep it Clean</h3>
                        <p className="about__values-content">We believe all organizations need to take leadership when it comes to
                        environmental stewardship. To that end, we work to ensure that we are reducing food waste by incentivizing
                        our customers to pre-order meals and skip personal delivery. We also work to streamline our procurement process
                        so we can minimize our carbon footprint.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;