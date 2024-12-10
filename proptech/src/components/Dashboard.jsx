import React, { useState } from "react";
import investmentDataFile from "../shared/data/investmentData.json";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom"; // Assuming react-router is used
import AdministrationDashboard from "./AdministrationDashboard";
import dashboardMan from "../assets/dashboardMan.png";

function Dashboard() {
    const [selectedRow, setSelectedRow] = useState(null); // To handle selected investment details
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    // Calculate Balance Total
    const totalBalance = investmentDataFile.reduce((sum, investment) => sum + investment.principal, 0);

    // Handle Row Selection
    const handleRowSelection = (row) => {
        console.log("Selected Row Data:", row);
        setSelectedRow(row);
    };

    // Prepare Graph Data
    const graphData = selectedRow
        ? selectedRow.results.map((result, index) => ({
            term: result.term, // Use the term directly from the results
            capitalizacionMes: parseFloat(result.capitalizacionMes), // Monthly capitalization
            capitalizacion: parseFloat(result.capitalizacion), // Accumulated capitalization converted to thousands
        }))
        : [];

    return (
        <div>
            <div className="dashboard-grid flex">
                <div className="space-y-4">

                    {/* Welcome Box */}
                    <div className="welcome-box flex">
                        <div>
                            <h2>¡Hola {user}! Bienvenido a tu <span className="font-bold">panel de control</span>!</h2>
                            <p>
                                Estamos encantados de tenerte acá. Desde este espacio, podrás explorar todas tus inversiones,
                                revisar tus rendimientos y mucho más.
                            </p>
                            <p>
                                ¡Todo lo que necesitas al alcance de un clic! Si tienes alguna pregunta o necesitas ayuda, no dudes en consultarnos. ¡Disfruta navegando!
                            </p>
                        </div>
                        <img
                            src={dashboardMan}
                            alt="dashboardMan"
                            className="w-full h-[90%] object-cover mt-0 "
                        />
                        <div>

                        </div>
                    </div>
                    {/* Balance Total Box */}
                    <div className="balance-box">
                        <h3>Balance Total</h3>
                        <h2 className="h2">$ {totalBalance.toFixed(2)}</h2>
                        <button className="btn-primary w-full" onClick={() => navigate("/capitalizacionAdmin")}>
                            Calcular nueva inversión
                        </button>
                    </div>
                </div>
                {/* Investment Details Box */}
                <div className="investment-details-box">
                    <h3 className="font-bold">Detalle de la inversión</h3>
                    <p className="text-primary font-bold">Dinero invertido: $ {selectedRow ? selectedRow.principal.toFixed(2) : ""}</p>
                    <div className="chart-container">
                        <LineChart
                            width={600}
                            height={350}
                            data={graphData}
                            margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="term" label={{ value: "Plazo (Meses)", position: "insideBottom", offset: -5 }} />
                            <YAxis label={{ value: "Capital ($k)", angle: -90, position: "insideLeft" }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="capitalizacionMes" stroke="#82ca9d" name="Capitalización Mensual" />
                            <Line type="monotone" dataKey="capitalizacion" stroke="#8884d8" name="Capitalización Acumulada" />
                        </LineChart>
                    </div>
                    <button className="btn-tertiary w-full">Solicitar baja de inversión</button>
                </div>


            </div>
            {/* Administrator Dashboard */}
            <div>
                <AdministrationDashboard onRowSelect={handleRowSelection} />
            </div>
        </div>
    );
}

export default Dashboard;
