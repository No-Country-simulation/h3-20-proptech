import React, { useContext, useState, useEffect  } from "react";
import Select from "react-select"; // Ensure react-select is installed
// import usersData from "../shared/data/usersData.json";
import investmentData from "../shared/data/investmentData.json";
// import axios from "axios";
import Context from "../context/Context";
import { NotificationService } from "../shared/notistack.service";

function CapitalizationCalculatorModal({
setInvestor, 
  showModal,
  setShowModal,
  newInvestmentData,
  setNewInvestmentData,
  investorData,
  setInvestorData,
}) {
    const { getUsers, getUserById} = useContext(Context);
    const [usersData, setUsersData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    // const API_URL = "https://h3-20-proptech-production.up.railway.app";

    // useEffect(() => {
    //   const fetchUsers = async () => {
    //     try {
    //       const response = await axios.get(`${API_URL}/api/all-users/`);
    //       setUsersData(response.data);
    //       NotificationService.success("Success loading users.", 3000);
    //       console.log(usersData);
    //     } catch (error) {
    //       NotificationService.error("Error loading users.", 3000);
    //     }
    //   };
    //   fetchUsers();
    // }, []);
    
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await getUsers();
            // const response = await getUserById(2);
            setUsersData(response.data);
            // NotificationService.success("Success loading users.", 3000);
          } catch (error) {
            NotificationService.error("Error loading users.", 3000);
          }
        };
        fetchUsers();
      }, []);
    
  // Transform usersData into options for react-select
  const options = usersData.map((user) => ({
    value: user.id,
    label: `${user.id} - ${user.username}`,
  }));

  // Handle user selection
  const handleSelectChange = (selectedOption) => {
    setSelectedUser(selectedOption ? selectedOption.value : null);
  };

  // Save finalized data
  const saveInvestmentData = () => {
    if (!selectedUser) {
      alert("Please select an investor.");
      return;
    }
    const dataArray = Array.isArray(investorData) ? investorData : [];

    const newId =
    dataArray.length > 0 ? Math.max(...dataArray.map((item) => item.id)) + 1 : 1;

    // Update newInvestmentData with investor ID
    const finalizedData = {
        id: newId,
        investor: selectedUser, // Set the selected user's ID
        ...newInvestmentData,
    };
  // Append to the existing data array
  const updatedData = [...dataArray, finalizedData];
  // Save the updated data as a file
  const blob = new Blob([JSON.stringify(updatedData, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "investmentData.json");

    // Simulate saving to JSON file (you can connect this to an API if needed)
    setInvestorData(updatedData);
    console.log("Finalized Investment Data:", updatedData);

    // Close modal and alert success
    setShowModal(false);
    alert("Investment data saved successfully!");
  };

  return (
      <div>
        {/* Modal backdrop */}
        <div
          className="modal-backdrop fixed inset-0 bg-gray-900 bg-opacity-50"
          onClick={() => setShowModal(false)}
        ></div>

        {/* Modal content */}
        <div className="modal-custom">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Seleccione Inversor
          </h2>

          {/* React-Select searchable dropdown */}
          <Select
            options={options}
            onChange={handleSelectChange}
            placeholder="Buscar y elegir inversor"
            isSearchable
          />

          {/* Display details */}
          {newInvestmentData && (
            <div className="mt-4 text-sm">
                      <div >
                          <label className="label">Capital:</label>
                          <input
                              className="input-field"
                              type="text"
                              value={newInvestmentData.principal.toFixed(2)}
                              readOnly
                          />
                      </div>
                      <div>
                          <label className="label">Tasa de Interes:</label>
                          <input
                              className="input-field"
                              type="text"
                              value={`${(newInvestmentData.interestRate * 100).toFixed(3)}%`}
                              readOnly
                          />
                      </div>
                      <div>
                          <label className="label">Numero de Cuotas:</label>
                          <input
                              className="input-field"
                              type="text"
                              value={newInvestmentData.numberOfPayments}
                              readOnly
                          />
                      </div>
                      <div>
                          <label className="label">Cuota Mensual:</label>
                          <input
                              className="input-field"
                              type="text"
                              value={newInvestmentData.monthlyReturn}
                              readOnly
                          />
                      </div>
                  </div>
          )}

          {/* Modal buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              className="btn-tertiary px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
            <button
              className="btn-primary px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={saveInvestmentData}
            >
              Guardar Inversion
            </button>
          </div>
        </div>
      </div>
  );
}

export default CapitalizationCalculatorModal;


// import React, { useState, useEffect } from "react";
// import Select from "react-select"; // Ensure to install this via `npm install react-select`
// import usersData from "../shared/data/usersData.json";
// import investmentData from "../shared/data/investmentData.json";

// function CapitalizationCalculatorModal(showModal, setShowModal) {
//     const [investor, setInvestor] = useState('');
//     // const [selectedOption, setSelectedOption] = useState('');

//     useEffect(() => {
        
//     }, [investor]);

//   // Transform usersData into a format compatible with react-select
//   const options = usersData.map((user) => ({
//     value: user.id, // User ID
//     label: `${user.id + " " + user.username}` // Displayed name
//   }));

//   // Handle selection
//   const handleSelectChange = (selectedOption) => {
//     if (selectedOption) {

//       setInvestor(selectedOption.value);
//       console.log(investor); // Set the selected user's ID as the investor
//     }
//   };

//     //select user for investment data
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [newInvestmentData, setNewInvestmentData] = useState([]);

//     // Save the finalized data to investmentData.json
//     const saveInvestmentData = () => {
//         if (!selectedUser) {
//             alert("Please select an investor.");
//             return;
//         }

//         // Add new investment data
//         const newId = investmentData.length > 0
//             ? Math.max(...investmentData.map((item) => item.id)) + 1
//             : 1;

//         const newData = {
//             id: newId,
//             investor: selectedUser,
//             ...newInvestmentData, // Include the generated JSON data
//         };

//         // Append to investmentData and save
//         const updatedData = [...investmentData, newData];
//         const blob = new Blob([JSON.stringify(updatedData, null, 2)], { type: "application/json" });
//         saveAs(blob, "investmentData.json");

//         setShowModal(false); // Close the modal
//         alert("Investment data saved successfully!");
//     };


//   return (
//       <div >
//         {/* Modal backdrop */}
//         <div
//           className="modal-backdrop fixed inset-0 bg-gray-900 bg-opacity-50"
//           onClick={() => setShowModal(false)}
//         ></div>

//         {/* Modal content */}
//         <div className="modal-custom">
//           <h2 className="text-lg font-semibold mb-4 text-center">Select an Investor</h2>

//           {/* React-Select searchable dropdown */}
//           <Select
//             options={options}
//             onChange={handleSelectChange}
//             placeholder="Search and select a user"
//             isSearchable
//           />

//           {/* Modal buttons */}
//           <div className="mt-6 flex justify-end gap-4">
//             <button
//               className="btn-tertiary px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               onClick={() => setShowModal(false)}
//             >
//               Cancel
//             </button>
//             <button onClick={saveInvestmentData} className="btn-primary">
//             Save Investment
//             </button>
//           </div>
//         </div>
//       </div>

//   );
// }

// export default CapitalizationCalculatorModal;