import React, { Component } from 'react';
import "./UserDetails.scss"

class UserDetails extends Component {
    render() {
        const { values } = this.props;

        return (
            <div className="form__sub-section">
                <div className="form__input-container">
                    <label htmlFor="firstNameInput" className="form__label">First Name</label>
                    <input type="text" name="firstNameInput" placeholder="First Name" className="form__field" defaultValue={values.firstName} 
                    onChange={this.props.changeHandler("firstName")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="lastNameInput" className="form__label">Last Name</label>
                    <input type="text" name="lastNameInput" placeholder="Last Name" className="form__field" defaultValue={values.lastName} 
                    onChange={this.props.changeHandler("lastName")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="emailInput" className="form__label">Email</label>
                    <input type="text" name="emailInput" placeholder="Email" className="form__field" defaultValue={values.email} 
                    onChange={this.props.changeHandler("email")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="phoneInput" className="form__label">Phone Number</label>
                    <input type="text" name="phoneInput" placeholder="Phone number" className="form__field" defaultValue={values.phoneNumber} 
                    onChange={this.props.changeHandler("phoneNumber")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="passwordInput" className="form__label">Password</label>
                    <input type="password" name="passwordInput" placeholder="Password" className="form__field" defaultValue={values.password} 
                    onChange={this.props.changeHandler("password")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="passwordConfirm" className="form__label">Confirm Password</label>
                    <input type="password" name="passwordConfirm" placeholder="Confirm Password" className="form__field" defaultValue={values.passwordConfirm} 
                    onChange={this.props.changeHandler("passwordConfirm")} required/>
                </div>

                <button className="form__next-button" onClick={() => { this.props.stepForward() }}>Next</button>
            </div>
        );
    }
}

export default UserDetails;