import React from 'react';
import "./PaymentHistory.scss";
import CancelLogo from "../../Assets/Icons/close-circle-outline.svg";
import Modal from "react-awesome-modal";

function PaymentHistory(props) {
    return (
        <div className="paymentHistory">
            <div className="paymentHistory__container">
                <h2 className="paymentHistory__title">Payment History</h2>
                <div className="paymentHistory__header">
                    <p className="paymentHistory__header-title">Payment Date</p>
                    <p className="paymentHistory__header-title">Amount</p>
                    <p className="paymentHistory__header-title">Cancel</p>
                </div>

                {props.payments.map(payment => <div className="paymentHistory__payment-container">
                    <div className="paymentHistory__card" key={payment.id}>
                        <p className="paymentHistory__date">{payment.date}</p>
                        <p className="paymentHistory__amount">{payment.amount}</p>
                        <img className="paymentHistory__cancel" dataid={payment.id} onClick={props.openModal} src={CancelLogo} alt="Cancel" />
                    </div>

                    <Modal className="paymentHistory__modal" visible={props.visible} width="300px" height="375px" effect="fadeInUp" onClickAway={props.closeModal}>
                        <div className="paymentHistory__modal-container">
                            <h2 className="paymentHistory__modal-title">Cancel Order?</h2>
                            <p className="paymentHistory__modal-content">Your payment will be refunded in 3-5 Business Days.</p>
                            <div className="paymentHistory__modal-buttonContainer">
                                <button className="paymentHistory__modal-Cancelbutton" onClick={(e) => props.deletePayment(e, payment.id)}>Yes</button>
                                <button className="paymentHistory__modal-button" onClick={props.closeModal}>No</button>
                            </div>
                        </div>
                    </Modal>
                </div>
                )}
            </div>
        </div>
    );
}

export default PaymentHistory;

