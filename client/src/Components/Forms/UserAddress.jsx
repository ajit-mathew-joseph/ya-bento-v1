import React, { Component } from 'react';

class UserAddress extends Component {
    render() {
        const { values } = this.props;

        return (
            <div className="form__sub-section">
                <div className="form__input-container">
                    <label htmlFor="suiteInput" className="form__label">Suite (Apt/Unit)</label>
                    <input type="text" name="suiteInput" className="form__field" placeholder="Suite No." defaultValue={values.suite}
                        onChange={this.props.changeHandler("suite")} />
                </div>

                <div className="form__input-container">
                    <label htmlFor="streetInput" className="form__label">Street</label>
                    <input type="text" name="streetInput" className="form__field" placeholder="Street" defaultValue={values.street}
                        onChange={this.props.changeHandler("street")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="cityInput" className="form__label">City</label>
                    <input type="text" name="cityInput" className="form__field" placeholder="City" defaultValue={values.city}
                        onChange={this.props.changeHandler("city")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="countryInput" className="form__label">Country</label>
                    <input type="text" name="countryInput" className="form__field" placeholder="Country" defaultValue={values.country}
                        onChange={this.props.changeHandler("country")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="postalCodeInp" className="form__label">Postal Code</label>
                    <input type="text" name="postalCodeInp" className="form__field" placeholder="Postal Code" defaultValue={values.postalCode}
                        onChange={this.props.changeHandler("postalCode")} required/>
                </div>

                <div className="form__input-container">
                    <label htmlFor="subPlanInp" className="form__label">Subscription Plan</label>
                    <select name="subPlanInp" defaultValue={values.subscriptionPlan} className="form__select" onChange={this.props.changeHandler("subscriptionPlan")} required>
                        <option value="The Regular -- $8">The Regular -- $8</option>
                        <option value="The Occasional -- $9">The Occasional -- $9</option>
                        <option value="The Newcomer -- $10">The Newcomer -- $10</option>
                    </select>
                </div>

                <div className="form__button-container">
                    <button className="form__previous-button" onClick={() => { this.props.stepBackward() }}>Previous</button>
                    <button className="form__next-button" onClick={() => { this.props.stepForward() }}>Next</button>
                </div>
            </div>
        );
    }
}

export default UserAddress;