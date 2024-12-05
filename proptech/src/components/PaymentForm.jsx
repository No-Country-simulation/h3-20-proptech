import React, { useState } from 'react';
import axios from 'axios';
import TieneDeudasImage from "../assets/TieneDeudas.png";

function PaymentForm() {
    const [paymentData, setPaymentData] = useState({
        loan: '',
        total_payment: '',
        interest_payment: '',
        principal_payment: '',
        punitive_interest: '',
        punitive_payment: '',
        remaining_balance: '',
        delayed: false,
    });

    const [errors, setErrors] = useState({});
    const [focus, setFocus] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/payments/', paymentData); // Update the endpoint URL
            alert('Payment applied successfully!');
        } catch (error) {
            console.error('Error applying payment:', error);
            alert('Failed to apply payment.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-white">
        {/* Left Side with Image */}
        <div className="w-full lg:w-1/2 relative">
            <img
                src={TieneDeudasImage}
                alt="Tiene Deudas"
                className="object-cover w-full h-full"
            />
            <div className="absolute bottom-10 left-10 text-white text-4xl font-bold">
                <h2>Ingresar pagos</h2>
            </div>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>

            <div>
                <label className="font-bold text-text-primary mb-1">Préstamo</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.loan === true
                            ? "p-messageError"
                            : errors.loan === false && focus.loan
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Préstamo
                </p>
                <input
                    type="number"
                    name="loan"
                    className="input-field"
                    placeholder="Loan ID"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Pago Total</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.total_payment === true
                            ? "p-messageError"
                            : errors.total_payment === false && focus.total_payment
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Pago Total
                </p>
                <input
                    type="number"
                    name="total_payment"
                    className="input-field"
                    placeholder="Total Payment"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Pago de Interés</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.interest_payment === true
                            ? "p-messageError"
                            : errors.interest_payment === false && focus.interest_payment
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Pago de Interés
                </p>
                <input
                    type="number"
                    name="interest_payment"
                    className="input-field"
                    placeholder="Interest Payment"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Pago de Principal</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.principal_payment === true
                            ? "p-messageError"
                            : errors.principal_payment === false && focus.principal_payment
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Pago de Principal
                </p>
                <input
                    type="number"
                    name="principal_payment"
                    className="input-field"
                    placeholder="Principal Payment"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Interés Punitivo</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.punitive_interest === true
                            ? "p-messageError"
                            : errors.punitive_interest === false && focus.punitive_interest
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Interés Punitivo
                </p>
                <input
                    type="number"
                    name="punitive_interest"
                    className="input-field"
                    placeholder="Punitive Interest"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Pago Punitivo</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.punitive_payment === true
                            ? "p-messageError"
                            : errors.punitive_payment === false && focus.punitive_payment
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Pago Punitivo
                </p>
                <input
                    type="number"
                    name="punitive_payment"
                    className="input-field"
                    placeholder="Punitive Payment"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Balance Restante</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.remaining_balance === true
                            ? "p-messageError"
                            : errors.remaining_balance === false && focus.remaining_balance
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Balance Restante
                </p>
                <input
                    type="number"
                    name="remaining_balance"
                    className="input-field"
                    placeholder="Remaining Balance"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Retrasado</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.delayed === true
                            ? "p-messageError"
                            : errors.delayed === false && focus.delayed
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Retrasado
                </p>
                <input
                    type="checkbox"
                    name="delayed"
                    className="checkbox-custom"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn-primary">
                Aplicar Pago
            </button>
        </form>
        </div>
    );
}

export default PaymentForm;



