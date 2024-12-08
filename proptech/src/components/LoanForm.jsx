import React, { useState } from 'react';
import axios from 'axios';
import TieneDeudasImage from "../assets/TieneDeudas.png";


function LoanForm() {
    const [loanData, setLoanData] = useState({
        user: '', 
        original_month_duration: '',
        actual_month_duration: '',
        original_total_due: '',
        actual_total_due: '',
        interest_rate: '',
        total_payments: '',
        start_date: '',
        end_date: '',
        state: 'N', // Default to Normal
    });

    const [errors, setErrors] = useState({});
    const [focus, setFocus] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData({ ...loanData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/loans/', loanData); // Update the endpoint URL
            alert('Loan submitted successfully!');
        } catch (error) {
            console.error('Error submitting loan:', error);
            alert('Failed to submit loan data.');
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
                    <h2>Alta de prestamo</h2>
                </div>
            </div>
        <form className="loan-form" onSubmit={handleSubmit}>
            <div>
                <label className="font-bold text-text-primary mb-1">Usuario</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.user === true
                            ? "p-messageError"
                            : errors.user === false && focus.user
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Usuario
                </p>
                <input
                    type="number"
                    name="user"
                    className="input-field"
                    placeholder="User ID"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Duración Original (Meses)</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.original_month_duration === true
                            ? "p-messageError"
                            : errors.original_month_duration === false && focus.original_month_duration
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Duración Original (Meses)
                </p>
                <input
                    type="number"
                    name="original_month_duration"
                    className="input-field"
                    placeholder="Original Month Duration"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Duración Actual (Meses)</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.actual_month_duration === true
                            ? "p-messageError"
                            : errors.actual_month_duration === false && focus.actual_month_duration
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Duración Actual (Meses)
                </p>
                <input
                    type="number"
                    name="actual_month_duration"
                    className="input-field"
                    placeholder="Actual Month Duration"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Total Original</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.original_total_due === true
                            ? "p-messageError"
                            : errors.original_total_due === false && focus.original_total_due
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Total Original
                </p>
                <input
                    type="number"
                    name="original_total_due"
                    className="input-field"
                    placeholder="Original Total Due"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Total Actual</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.actual_total_due === true
                            ? "p-messageError"
                            : errors.actual_total_due === false && focus.actual_total_due
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Total Actual
                </p>
                <input
                    type="number"
                    name="actual_total_due"
                    className="input-field"
                    placeholder="Actual Total Due"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Tasa de Interés (%)</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.interest_rate === true
                            ? "p-messageError"
                            : errors.interest_rate === false && focus.interest_rate
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Tasa de Interés (%)
                </p>
                <input
                    type="number"
                    name="interest_rate"
                    className="input-field"
                    placeholder="Interest Rate (%)"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Pagos Totales</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.total_payments === true
                            ? "p-messageError"
                            : errors.total_payments === false && focus.total_payments
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Pagos Totales
                </p>
                <input
                    type="number"
                    name="total_payments"
                    className="input-field"
                    placeholder="Total Payments"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Fecha de Inicio</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.start_date === true
                            ? "p-messageError"
                            : errors.start_date === false && focus.start_date
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Fecha de Inicio
                </p>
                <input
                    type="date"
                    name="start_date"
                    className="input-field"
                    placeholder="Start Date"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Fecha de Fin</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.end_date === true
                            ? "p-messageError"
                            : errors.end_date === false && focus.end_date
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Fecha de Fin
                </p>
                <input
                    type="date"
                    name="end_date"
                    className="input-field"
                    placeholder="End Date"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="font-bold text-text-primary mb-1">Estado</label>
                <p
                    className={`text-sm mt-1 ${
                        errors.state === true
                            ? "p-messageError"
                            : errors.state === false && focus.state
                            ? "p-messageOk"
                            : "p-message"
                    }`}
                >
                    Estado
                </p>
                <select
                    name="state"
                    className="select"
                    value={loanData.state}
                    onChange={handleChange}
                >
                    <option value="N">Normal</option>
                    <option value="D">Defaulter</option>
                </select>
            </div>
            <button type="submit" className="btn-primary">
                Enviar Préstamo
            </button>
        </form>
    </div>
    );
}

export default LoanForm;
