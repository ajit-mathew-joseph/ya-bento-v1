import React, { Component } from "react";
import "./FormsPage.scss";
import UserDetails from "../Components/Forms/UserDetails";
import UserAddress from "../Components/Forms/UserAddress";
import CalendarDetails from "../Components/Forms/CalendarDetails";


class FormsPage extends Component {
    // In order to create a multi-page Form UI, added in conditional rendering with buttons that fire the render
    // Logic Housed in App.jsx

    render() {
        return (
            <form className="form">
                <h3 className="form__title">Register your Account</h3>
                {this.props.values.step === 1 &&
                    <UserDetails stepForward={this.props.stepForward} values={this.props.values} changeHandler={this.props.changeHandler} />
                }

                {this.props.values.step === 2 &&
                    <UserAddress stepForward={this.props.stepForward} stepBackward={this.props.stepBackward} values={this.props.values} changeHandler={this.props.changeHandler} />
                }

                {this.props.values.step === 3 &&
                    <CalendarDetails stepForward={this.props.stepForward} stepBackward={this.props.stepBackward} values={this.props.values} changeHandler={this.props.changeHandler} 
                    logDates={this.props.logDates} tempLog={this.props.tempLog} />
                }
            </form>
        )
    }
}

export default FormsPage;