import { useState } from "react";

function Payments() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: "2024-11-01",
      totalPayment: 500,
      interestPayment: 50,
      principalPayment: 450,
      remainingBalance: 9500,
      delayed: false,
    },
    {
      id: 2,
      date: "2024-11-15",
      totalPayment: 500,
      interestPayment: 45,
      principalPayment: 455,
      remainingBalance: 9050,
      delayed: true,
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Gestión de Pagos
      </h1>

      {/* Tabla de Pagos */}
      <table className="w-full table-auto bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Fecha</th>
            <th className="py-2 px-4">Pago Total</th>
            <th className="py-2 px-4">Intereses</th>
            <th className="py-2 px-4">Capital</th>
            <th className="py-2 px-4">Saldo Restante</th>
            <th className="py-2 px-4">Atrasado</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className={`${
                payment.delayed ? "bg-red-100" : "bg-green-100"
              } text-gray-800`}
            >
              <td className="py-2 px-4">{payment.date}</td>
              <td className="py-2 px-4">${payment.totalPayment}</td>
              <td className="py-2 px-4">${payment.interestPayment}</td>
              <td className="py-2 px-4">${payment.principalPayment}</td>
              <td className="py-2 px-4">${payment.remainingBalance}</td>
              <td className="py-2 px-4">{payment.delayed ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>




      {/* Formulario para añadir un nuevo pago */}
<div className="mt-6 bg-white p-4 shadow-md rounded-md">
  <h2 className="text-xl font-bold mb-4 text-gray-800">Añadir Pago</h2>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const newPayment = {
        id: payments.length + 1,
        date: e.target.date.value,
        totalPayment: Number(e.target.totalPayment.value),
        interestPayment: Number(e.target.interestPayment.value),
        principalPayment: Number(e.target.principalPayment.value),
        remainingBalance: Number(e.target.remainingBalance.value),
        delayed: e.target.delayed.checked,
      };
      setPayments([...payments, newPayment]);
      e.target.reset();
    }}
  >
    <div className="grid grid-cols-2 gap-4">
      <input
        type="date"
        name="date"
        className="border p-2 rounded-md"
        placeholder="Fecha"
        required
      />
      <input
        type="number"
        name="totalPayment"
        className="border p-2 rounded-md"
        placeholder="Pago Total"
        required
      />
      <input
        type="number"
        name="interestPayment"
        className="border p-2 rounded-md"
        placeholder="Pago Intereses"
        required
      />
      <input
        type="number"
        name="principalPayment"
        className="border p-2 rounded-md"
        placeholder="Pago Capital"
        required
      />
      <input
        type="number"
        name="remainingBalance"
        className="border p-2 rounded-md"
        placeholder="Saldo Restante"
        required
      />
      <div className="flex items-center">
        <input
          type="checkbox"
          name="delayed"
          className="mr-2"
        />
        <label>¿Atrasado?</label>
      </div>
    </div>
    <button
      type="submit"
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Añadir Pago
    </button>
  </form>
</div>

    </div>
  );
}

export default Payments;
