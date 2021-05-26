import React, { Component } from 'react';
import "./UserPage.scss"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import UserInfo from "../Components/UserInfo/UserInfo";
import PaymentHistory from "../Components/PaymentHistory/PaymentHistory";
import MyCalendar from "../Components/MyCalendar/MyCalendar";
import AddCalendar from "../Components/AddCalendar/AddCalendar";


// State and Axios Calls separated from the App State so as to avoid any potential conflicts
// The secondary state is being used to house data specific to the user info page, and is set up to avoid conflicts with the sign-up/login process

class UserPage extends Component {
    state = {
        visible: false,
        step: 1,
        firstName: '',
        lastName: '',
        suite: '',
        street: '',
        city: '',
        country: '',
        postalCode: '',
        phoneNumber: '',
        cardNumber: '',
        cardName: '',
        cvc: '',
        expiry: '',
        subscriptionPlan: '',
        payments: [],
        addPayments: []
    }

    componentDidMount() {
        axios.get("http://localhost:8080/myAccount")
            .then(res => {
                let userInfo = res.data.filter(info => info.email === localStorage.email);
                this.setState({
                    firstName: userInfo[0].firstName,
                    lastName: userInfo[0].lastName,
                    phoneNumber: userInfo[0].phoneNumber,
                    suite: userInfo[0].suite,
                    street: userInfo[0].street,
                    city: userInfo[0].city,
                    country: userInfo[0].country,
                    postalCode: userInfo[0].postalCode,
                    subscriptionPlan: userInfo[0].subscriptionPlan,
                })
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get("http://localhost:8080/payments")
            .then(res => {
                let paymentInfo = res.data.filter(info => info.email === localStorage.email)
                this.setState({
                    payments: paymentInfo[0].payments
                })
            })
    }

    SubmitChange = () => {
        axios.put("http://localhost:8080/myAccount",
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                suite: this.state.suite,
                street: this.state.street,
                city: this.state.city,
                country: this.state.country,
                postalCode: this.state.postalCode,
                subscriptionPlan: this.state.subscriptionPlan,
                cardNumber: this.state.cardNumber,
                cardName: this.state.cardName,
                cvc: this.state.cvc,
                expiry: this.state.expiry,
                email: localStorage.email
            })
            .then((_res) => {
                this.props.history.push("/home");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    changeHandle = input => event => {
        this.setState({ [input]: event.target.value })
    }

    MyCalendar = () => {
        this.setState({
            step: 1
        })
    }

    PayHistory = () => {
        this.setState({
            step: 2
        })
    }

    MyInfo = () => {
        this.setState({
            step: 3
        })
    }

    AddCalendar = () => {
        this.setState({
            step: 4
        })
    }

    deletePayment = (e, id) => {
        axios.delete(`http://localhost:8080/myAccount/${id}`)
            .then(res => {
                console.log(res.data.payments);
                this.setState({
                    payments: res.data.payments
                })
            })
        this.closeModal();
    }

    addDates = (arr) => {
        if (this.state.subscriptionPlan === "The Regular -- $8") {
            let paymentArr = arr.map(item => {
                return { id: uuidv4(), "date": new Date(item).toLocaleDateString(), "amount": "$8" }
            })
            this.setState({
                addPayments: paymentArr
            })
        } else if (this.state.subscriptionPlan === "The Occasional -- $9") {
            let paymentArr = arr.map(item => {
                return { id: uuidv4(), "date": new Date(item).toLocaleDateString(), "amount": "$9" }
            })
            this.setState({
                addPayments: paymentArr
            })
        } else {
            let paymentArr = arr.map(item => {
                return { id: uuidv4(), "date": new Date(item).toLocaleDateString(), "amount": "$10" }
            })
            this.setState({
                addPayments: paymentArr
            })
        }
    }

    postDates = () => {
        axios.put("http://localhost:8080/addDates", {
            email: localStorage.email,
            addPayments: this.state.addPayments
        })
            .then((_res) => {
                this.props.history.push("/home");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    openModal = () => {
        this.setState({
            visible: true
        });
    }

    closeModal = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        const { firstName, lastName, suite, street, city, country, postalCode, phoneNumber, cardNumber,
            cardName, cvc, expiry, subscriptionPlan } = this.state;

        const userValues = {
            firstName, lastName, suite, street, city, country, postalCode, phoneNumber, cardNumber,
            cardName, cvc, expiry, subscriptionPlan
        };
        return (
            // Conditional Rendering similar to multi-page form (to avoid unnecessary reload and re-rendering)

            <div className="userPage">
                <div className="userPage__nav-bar">
                    <ul className="userPage__nav-list">
                        <li className="userPage__nav-item"><button className="userPage__nav-button" onClick={() => this.MyCalendar()}>My Calendar</button></li>
                        <li className="userPage__nav-item"><button className="userPage__nav-button" onClick={() => this.PayHistory()}>Payment History</button></li>
                        <li className="userPage__nav-item"><button className="userPage__nav-button" onClick={() => this.MyInfo()}>My Info</button></li>
                        <li className="userPage__nav-item"><button className="userPage__nav-button" onClick={() => this.AddCalendar()}>Add Orders</button></li>
                    </ul>
                </div>

                {this.state.step === 1 &&
                    <MyCalendar payments={this.state.payments} />}

                {this.state.step === 2 &&
                    <PaymentHistory changeHandler={this.changeHandle} values={userValues} payments={this.state.payments} deletePayment={this.deletePayment}
                        openModal={this.openModal} closeModal={this.closeModal} visible={this.state.visible} />}

                {this.state.step === 3 &&
                    <UserInfo changeHandler={this.changeHandle} values={userValues} submitChange={this.SubmitChange} />}

                {this.state.step === 4 &&
                    <AddCalendar changeHandler={this.changeHandle} values={userValues} addDates={this.addDates} submitChange={this.SubmitChange} postDates={this.postDates} />}
            </div>
        );
    }
}

export default UserPage;