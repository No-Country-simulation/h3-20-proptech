//src/components/AdministratorDashboard.jsx
import React, {  useContext, useState, useEffect } from "react";
import investmentDataFile from "../shared/data/investmentData.json";
import { saveAs } from "file-saver";
import { PiTrash, PiNotePencil } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import RegisterUserAdmin from "./RegisterUserAdmin";
import axios from "axios";
import Context from "../context/Context";
import { NotificationService } from "../shared/notistack.service";

const AdministratorDashboard = ({ onRowSelect }) => {
    const { getUsers} = useContext(Context);
    const [usersData, setUsersData] = useState([]);
    const [investmentData0, setInvestmentData0] = useState(investmentDataFile);
    const [investmentData, setInvestmentData] = useState(investmentData0);
    const [editingRow, setEditingRow] = useState(null);
    const [newInvestment, setNewInvestment] = useState({
        investor: "",
        principal: "",
        interestRate: "",
        numberOfPayments: "",
        monthlyReturn: "",
    });
    // const API_URL = "https://h3-20-proptech-production.up.railway.app";

    // Fetch users data from API
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await axios.get(`${API_URL}/api/all-users/`);
    //             const users = response.data;
    //             if (Array.isArray(users)) {
    //                 setUsersData(users);
    //             } else {
    //                 throw new Error("Invalid users data format");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching users data:", error);
    //             NotificationService.error("Error loading user data.", 3000);
    //         }
    //     };

    //     fetchUsers();
    // }, [API_URL]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await getUsers();
            setUsersData(response.data);
            // NotificationService.success("Success loading users.", 3000);
            // console.log(usersData);
          } catch (error) {
            NotificationService.error("Error loading users.", 3000);
          }
        };
        fetchUsers();
      }, []);


    const getUsernameById = (id) => {
        const user = usersData.find((user) => user.id === id);
        return user ? user.username : "Unknown User";
    };

    const navigate = useNavigate();

    const handleRowLoad = (rowId) => {
        const rowData = investmentData.find((row) => row.id === rowId);
        navigate("/capitalizacionEdit", { state: rowData });
    };

    const handleRowLoadEdit = (rowId) => {
        const rowData = investmentData.find((row) => row.id === rowId);
        navigate("/capitalizacionEdit", { state: rowData });
    };

    const handleUpdate = (rowId, updatedData) => {
        const updatedInvestmentData = investmentData.map((item) =>
            item.id === rowId ? { ...item, ...updatedData } : item
        );
        setInvestmentData(updatedInvestmentData);
        saveDataToFile(updatedInvestmentData);
    };

    const handleDelete = (rowId) => {
        const updatedInvestmentData = investmentData.filter((item) => item.id !== rowId);
        setInvestmentData(updatedInvestmentData);
        saveDataToFile(updatedInvestmentData);
    };

    const handleCreate = () => {
        const newId =
            investmentData.length > 0
                ? Math.max(...investmentData.map((item) => item.id)) + 1
                : 1;

        const newEntry = { ...newInvestment, id: newId };
        const updatedInvestmentData = [...investmentData, newEntry];
        setInvestmentData(updatedInvestmentData);
        saveDataToFile(updatedInvestmentData);
        setNewInvestment({
            investor: "",
            principal: "",
            interestRate: "",
            numberOfPayments: "",
            monthlyReturn: "",
        });
    };

    const saveDataToFile = (data) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        saveAs(blob, "investmentData.json");
    };

    return (
        <div className="p-4">
            <h2 className="h2">Administrator Dashboard</h2>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Inversor</th>
                        <th className="border border-gray-300 px-4 py-2">Capital</th>
                        <th className="border border-gray-300 px-4 py-2">Tasa de Interes</th>
                        <th className="border border-gray-300 px-4 py-2">Cuotas</th>
                        <th className="border border-gray-300 px-4 py-2">Cuota mensual</th>
                        <th className="border border-gray-300 px-4 py-2">Activo</th>
                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {investmentData.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onDoubleClick={() => onRowSelect(row)}
                        >
                            <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {getUsernameById(row.investor)}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{row.principal.toFixed(2)}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {(row.interestRate * 100).toFixed(3)}%
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.numberOfPayments}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{row.monthlyReturn}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="checkbox"
                                    checked={row.isActive}
                                    className="checkbox-custom"
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleRowLoadEdit(row.id)}
                                >
                                    <PiNotePencil />
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(row.id)}
                                >
                                    <PiTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingRow && (
                <div>
                    <div className="modal-custom">
                        <h2 className="h2">Editar Inversión</h2>
                        <input
                            type="text"
                            placeholder="Principal"
                            value={editingRow.principal}
                            onChange={(e) =>
                                setEditingRow({ ...editingRow, principal: e.target.value })
                            }
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Interest Rate"
                            value={editingRow.interestRate}
                            onChange={(e) =>
                                setEditingRow({ ...editingRow, interestRate: e.target.value })
                            }
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Numero de cuotas"
                            value={editingRow.numberOfPayments}
                            onChange={(e) =>
                                setEditingRow({ ...editingRow, numberOfPayments: e.target.value })
                            }
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Cuota"
                            value={editingRow.monthlyReturn}
                            onChange={(e) =>
                                setEditingRow({ ...editingRow, monthlyReturn: e.target.value })
                            }
                            className="input-field"
                        />
                        <input
                            type="checkbox"
                            checked={editingRow.isActive}
                            onChange={(e) =>
                                setEditingRow({ ...editingRow, isActive: e.target.checked })
                            }
                            className="mr-2 checkbox-custom"
                            
                        />
                        <button
                            className="btn-tertiary"
                            onClick={() => setEditingRow(null)}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                handleUpdate(editingRow.id, editingRow);
                                setEditingRow(null);
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <h2 className="h2">Registrar nuevo usuario para inversión</h2>
                <RegisterUserAdmin />
            </div>
        </div>
    );
};

export default AdministratorDashboard;



// import React, { useState, useEffect } from "react";
// import usersDataFile from "../shared/data/usersData.json";
// import investmentDataFile from "../shared/data/investmentData.json";
// import { saveAs } from "file-saver";
// import { PiTrash, PiNotePencil, PiNote } from "react-icons/pi";
// import { useNavigate } from "react-router-dom";
// import { CheckBox } from "@mui/icons-material";
// import RegisterUserAdmin from "./RegisterUserAdmin";
// import axios from "axios";
// import { NotificationService } from "../shared/notistack.service";

// const AdministratorDashboard = ({ onRowSelect }) => {
//     const [usersData, setUsersData] = useState(usersDataFile);
//     const [investmentData, setInvestmentData] = useState(investmentDataFile);
//     const [editingRow, setEditingRow] = useState(null);
//     const [newInvestment, setNewInvestment] = useState({
//         investor: "",
//         principal: "",
//         interestRate: "",
//         numberOfPayments: "",
//         monthlyReturn: "",
//     });

//     const navigate = useNavigate();
//     const handleRowLoad = (rowId) => {
//         // Find the row data by ID
//         const rowData = investmentData.find((row) => row.id === rowId);
//         // Redirect to CapitalizationCalculator.jsx with data
//         navigate("/capitalizacionEdit", { state: rowData });
//     };

//     const handleRowLoadEdit = (rowId) => {
//         // Find the row data by ID
//         const rowData = investmentData.find((row) => row.id === rowId);
//         // Redirect to CapitalizationCalculator.jsx with data
//         navigate("/capitalizacionEdit", { state: rowData });
//     };

//     // Map investor IDs to usernames
//     const getUsernameById = (id) => {
//         const user = usersData.find((user) => user.id === id);
//         return user ? user.username : "Unknown User";
//     };

    
//     // Update investment data (simulated API call)
//     const handleUpdate = (rowId, updatedData) => {
//         const updatedInvestmentData = investmentData.map((item) =>
//             item.id === rowId ? { ...item, ...updatedData } : item
//         );
//         setInvestmentData(updatedInvestmentData);
//         saveDataToFile(updatedInvestmentData);
//     };

//     // Delete investment entry
//     const handleDelete = (rowId) => {
//         const updatedInvestmentData = investmentData.filter((item) => item.id !== rowId);
//         setInvestmentData(updatedInvestmentData);
//         saveDataToFile(updatedInvestmentData);
//     };

//     // Add new investment
//     const handleCreate = () => {
//         const newId =
//             investmentData.length > 0
//                 ? Math.max(...investmentData.map((item) => item.id)) + 1
//                 : 1;

//         const newEntry = { ...newInvestment, id: newId };
//         const updatedInvestmentData = [...investmentData, newEntry];
//         setInvestmentData(updatedInvestmentData);
//         saveDataToFile(updatedInvestmentData);
//         setNewInvestment({
//             investor: "",
//             principal: "",
//             interestRate: "",
//             numberOfPayments: "",
//             monthlyReturn: "",
//         });
//     };

//     // Save updated data to file
//     const saveDataToFile = (data) => {
//         const blob = new Blob([JSON.stringify(data, null, 2)], {
//             type: "application/json",
//         });
//         saveAs(blob, "investmentData.json");
//     };

//     return (

//             <div className="p-4">
//                 <h2 className="h2">Administrator Dashboard</h2>

//                 {/* Display investment data */}
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border border-gray-300 px-4 py-2">ID</th>
//                             <th className="border border-gray-300 px-4 py-2">Inversor</th>
//                             <th className="border border-gray-300 px-4 py-2">Capital</th>
//                             <th className="border border-gray-300 px-4 py-2">Tasa de Interes</th>
//                             <th className="border border-gray-300 px-4 py-2">Cuotas</th>
//                             <th className="border border-gray-300 px-4 py-2">Cuota mensual</th>
//                             <th className="border border-gray-300 px-4 py-2">Activo</th>
//                             <th className="border border-gray-300 px-4 py-2">Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {investmentData.map((row) => (
//                             <tr key={row.id} className="hover:bg-gray-50 cursor-pointer" onDoubleClick={() => onRowSelect(row)}>
//                                 <td className="border border-gray-300 px-4 py-2">{row.id}</td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {getUsernameById(row.investor)}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2">{row.principal.toFixed(2)}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{(row.interestRate * 100).toFixed(3)}%</td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {row.numberOfPayments}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2">{row.monthlyReturn}</td>
//                                 <td className="border border-gray-300 px-4 py-2"><input type="checkbox" checked={row.isActive} className="checkbox-custom" /></td>
//                                 <td className="border border-gray-300 px-4 py-2 flex gap-2">
//                                     {/* <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleRowLoad(row.id)}>
//                   <PiNote />
//                 </button> */}
//                                     <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleRowLoadEdit(row.id)}>
//                                         <PiNotePencil />
//                                     </button>
//                                     <button
//                                         className="bg-red-500 text-white px-2 py-1 rounded"
//                                         onClick={() => handleDelete(row.id)}
//                                     >
//                                         <PiTrash />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Edit Modal */}
//                 {editingRow && (
//                     <div >
//                         <div className="modal-custom">
//                             <h2 className="h2">Editar Inversión</h2>
//                             <input
//                                 type="text"
//                                 placeholder="Principal"
//                                 value={editingRow.principal}
//                                 onChange={(e) =>
//                                     setEditingRow({ ...editingRow, principal: e.target.value })
//                                 }
//                                 className="input-field"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Interest Rate"
//                                 value={editingRow.interestRate}
//                                 onChange={(e) =>
//                                     setEditingRow({ ...editingRow, interestRate: e.target.value })
//                                 }
//                                 className="input-field"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Numero de cuotas"
//                                 value={editingRow.numberOfPayments}
//                                 onChange={(e) =>
//                                     setEditingRow({ ...editingRow, numberOfPayments: e.target.value })
//                                 }
//                                 className="input-field"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Cuota"
//                                 value={editingRow.monthlyReturn}
//                                 onChange={(e) =>
//                                     setEditingRow({ ...editingRow, monthlyReturn: e.target.value })
//                                 }
//                                 className="input-field"
//                             />
//                             <input
//                                 type="checkbox"
//                                 checked={editingRow.isActive}
//                                 onChange={(e) =>
//                                     setEditingRow({ ...editingRow, isActive: e.target.checked })
//                                 }
//                                 className="mr-2 checkbox-custom"
//                             />
//                             <button
//                                 className="btn-tertiary"
//                                 onClick={() => setEditingRow(null)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="btn-primary"
//                                 onClick={() => {
//                                     handleUpdate(editingRow.id, editingRow);
//                                     setEditingRow(null);
//                                 }}
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Add New Investment */}
//                 <div className="mt-4">
//                     <h2 className="h2">Registrar nuevo usuario para inversión</h2>
//                     <RegisterUserAdmin/>
//                 </div>
//             </div>
        
//     );
// };

// export default AdministratorDashboard;
