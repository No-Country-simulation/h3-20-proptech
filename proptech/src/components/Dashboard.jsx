import React, { useState, useEffect } from "react";
import investmentDataFile from "../shared/data/investmentData.json";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom"; // Assuming react-router is used
import AdministratorDashboard from "./AdministratorDashboard";
import dashboardMan from "../assets/dashboardMan.png";
import Stats from "./Stats";
import Content from "./Content";
import CapitalizationCalculatorViewer from "./CapitalizationCalculatorViewer";

function Dashboard() {
    const [selectedRow, setSelectedRow] = useState(null); // To handle selected investment details
    const [investmentData, setInvestmentData] = useState([]); // Add state for investment data
    const [pivotData, setPivotData] = useState(null); // Data from onUpdatePivot
    const [showModal, setShowModal] = useState(false);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    // Calculate Balance Total
    const totalBalance = investmentData.reduce(
        (sum, investment) => sum + (parseFloat(investment.principal) || 0),
        0
    );



    // useEffect(() => {
    //     handleUpdatePivot();
    //     // const fetchUsers = async () => {
    //     //     try {
    //     //         const response = await getUsers();
    //     //         // const response = await getUserById(2);
    //     //         setUsersData(response.data);
    //     //         // NotificationService.success("Success loading users.", 3000);
    //     //     } catch (error) {
    //     //         NotificationService.error("Error loading users.", 3000);
    //     //     }
    //     // };

    // }, []);


    // Handle Row Selection
    const handleRowSelection = (row) => {
        console.log("Selected Row Data:", row);
        setSelectedRow(row);
        // setResults(results);
    };
    // Handle data load from AdministratorDashboard
    const handleDataLoad = (data) => {
        console.log("Received Investment Data:", data);
        setInvestmentData(data);
    };


    // const graphData = investmentDataFile.map((item) => ({
    //     term: item.term,
    //     capitalizacionMes: parseFloat(item.capitalizacionMes),
    //     capitalizacion: parseFloat(item.capitalizacion),
    // }));

    const graphData = selectedRow
    ? selectedRow.results.map((result) => ({
        term: result.term,
        capitalizacionMes: parseFloat(result.capitalizacionMes), // Ensure it's a number
        capitalizacion: parseFloat(result.capitalizacion), // Ensure it's a number
    }))
    : investmentDataFile.map((item) => ({
        term: item.term, // Default term if no row selected
        capitalizacionMes: parseFloat(item.results?.[0]?.capitalizacionMes || 0), // First result's monthly capitalization
        capitalizacion: parseFloat(item.results?.[0]?.capitalizacion || 0), // First result's accumulated capitalization
    }));


    // // Prepare Graph Data
    // const graphData = selectedRow
    //     ? selectedRow.results.map((result, index) => ({
    //         term: result.term, // Use the term directly from the results
    //         capitalizacionMes: parseFloat(result.capitalizacionMes), // Monthly capitalization
    //         capitalizacion: parseFloat(result.capitalizacion), // Accumulated capitalization converted to thousands
    //     }))
    //     : [];

    // const graphData = selectedRow?.results?.map((result) => ({
    //     term: result.term,
    //     capitalizacionMes: parseFloat(result.capitalizacionMes),
    //     capitalizacion: parseFloat(result.capitalizacion),
    // })) || [];

    // useEffect(() => {
    //     console.log("Updated Graph Data:", graphData);
    // }, [graphData]);

    // Prepare Graph Data v0
    // const graphData = selectedRow
    //     ? selectedRow.results.map((result, index) => ({
    //         term: result.term, // Use the term directly from the results
    //         capitalizacionMes: parseFloat(result.capitalizacionMes), // Monthly capitalization
    //         capitalizacion: parseFloat(result.capitalizacion), // Accumulated capitalization converted to thousands
    //     }))
    //     : [];

    // Prepare Graph Data (uses pivotData if available)
    // const graphData = pivotData
    
    //     ? pivotData.results.map((result, index) => ({
    //         term: result.term,
    //         capitalizacionMes: parseFloat(result.capitalizacionMes),
    //         capitalizacion: parseFloat(result.capitalizacion),
    //     }))
    //     : selectedRow?.results.map((result) => ({
    //         term: result.term,
    //         capitalizacionMes: parseFloat(result.capitalizacionMes),
    //         capitalizacion: parseFloat(result.capitalizacion),
    //     })) || [];
    //     console.log("pivotData:" , pivotData);
    // // Handle Pivot Update
    // const handleUpdatePivot = (data) => {
    //     console.log("Pivot Data:", data);
    //     setPivotData(data); // Set pivotData for both modal and graph
    //     setShowModal(false); // Close modal after update
    // };

    const handleResultsUpdate = (results) => {
        console.log("Results Updated: ", results);
        setResults(results);
        console.log("Results : ", results);
        // Perform any additional operations with results
    };


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
                    <p className="text-primary font-bold">Dinero invertido: $ {selectedRow ? (selectedRow.principal*1).toFixed(2) : ""}</p>
                    {/* <p className="text-primary font-bold">Dinero invertido: $ {selectedRow ? (selectedRow.principal*1).toFixed(2) : ""}</p> */}
                    {/* Dinero invertido: $ {pivotData ? pivotData.principal.toFixed(2) : selectedRow?.principal.toFixed(2) || ""} */}
                    {/* </p> */}
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

            {/* Modal Trigger
            <button
                className="btn-primary mt-4"
                onClick={() => setShowModal(true)}
            >
                Ver Detalles de Pivot
            </button>
            {showModal && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="font-bold text-lg mb-4">Capitalization Details</h3>
                        <CapitalizationCalculatorViewer
                            rowData={selectedRow}
                            onUpdatePivot={handleUpdatePivot}
                        />
                        <button
                            className="btn-secondary mt-4"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )} */}




            </div>
            {/* Administrator Dashboard */}
            <div>
                <AdministratorDashboard onRowSelect={handleRowSelection} onDataLoad={handleDataLoad} onResultsUpdate={handleResultsUpdate}/>
            </div>
        </div>
    );
}

export default Dashboard;
