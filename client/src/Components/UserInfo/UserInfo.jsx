import React, { Component } from 'react';
import "./UserInfo.scss"

class UserInfo extends Component {
    render() {
        const { values } = this.props;

        return (
            <>
                <div className="userInfo">
                    <h3 className="userInfo__title">Account Info</h3>
                    <div className="userInfo__main">
                        <div className="userInfo__sub-section">
                            <div className="userInfo__input-container">
                                <label htmlFor="firstNameInput" className="userInfo__label">First Name</label>
                                <input type="text" name="firstNameInput" placeholder="First Name" className="userInfo__field"
                                    defaultValue={values.firstName} onChange={this.props.changeHandler("firstName")} />
                            </div>

                            <div className="userInfo__input-container">
                                <label htmlFor="lastNameInput" className="userInfo__label">Last Name</label>
                                <input type="text" name="lastNameInput" placeholder="Last Name" className="userInfo__field"
                                    defaultValue={values.lastName} onChange={this.props.changeHandler("lastName")} />
                            </div>

                            <div className="userInfo__input-container">
                                <label htmlFor="phoneInput" className="userInfo__label">Phone Number</label>
                                <input type="text" name="phoneInput" placeholder="Phone number" className="userInfo__field"
                                    defaultValue={values.phoneNumber} onChange={this.props.changeHandler("phoneNumber")} />
                            </div>

                            <div className="userInfo__input-container">
                                <label htmlFor="subPlanInp" className="userInfo__label">Subscription Plan</label>
                                <select name="subPlanInp" className="form__select" defaultValue={values.subscriptionPlan} onChange={this.props.changeHandler("subscriptionPlan")}>
                                    <option value="The Regular -- $8">The Regular -- $8</option>
                                    <option value="The Occasional -- $9">The Occasional -- $9</option>
                                    <option value="The Newcomer -- $10">The Newcomer -- $10</option>
                                </select>
                            </div>
                        </div>

                        <div className="userInfo__sub-section">
                            <div className="userInfo__input-container">
                                <label htmlFor="suiteInput" className="userInfo__label">Suite (Apt/Unit)</label>
                                <input type="text" name="suiteInput" className="userInfo__field" placeholder="Suite No."
                                    defaultValue={values.suite} onChange={this.props.changeHandler("suite")} />
                            </div>

                            <div className="userInfo__input-container">
                                <label htmlFor="streetInput" className="userInfo__label">Street</label>
                                <input type="text" name="streetInput" className="userInfo__field" placeholder="Street"
                                    defaultValue={values.street} onChange={this.props.changeHandler("street")} />
                            </div>

                            <div className="userInfo__input-container">
                                <label htmlFor="cityInput" className="userInfo__label">City</label>
                                <input type="text" name="cityInput" className="userInfo__field" placeholder="City"
                                    defaultValue={values.city} onChange={this.props.changeHandler("city")} />
                            </div>

                            <div className="userInfo__input-container">
                                <label htmlFor="countryInput" className="userInfo__label">Country</label>
                                <input type="text" name="countryInput" className="userInfo__field" placeholder="Country"
                                    defaultValue={values.country} onChange={this.props.changeHandler("country")} />
                            </div>

                            <div className="userInfo__input-container">
                                <label htmlFor="postalCodeInp" className="userInfo__label">Postal Code</label>
                                <input type="text" name="postalCodeInp" className="userInfo__field" placeholder="Postal Code"
                                    defaultValue={values.postalCode} onChange={this.props.changeHandler("postalCode")} />
                            </div>
                        </div>
                    </div>

                    <div className="userInfo__button-container">
                        <button className="userInfo__save-button" onClick={() => this.props.submitChange()}>Save Changes</button>
                    </div>
                </div>
            </>
        );
    }
}

export default UserInfo;