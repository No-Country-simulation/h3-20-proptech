import { useState } from "react";

function FileUploadField({ label }) {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsUploaded(false);
  };

  const handleUpload = () => {
    if (file) {
      setIsUploaded(true);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-gray-700">{label}</label>
      <div className="flex justify-between items-center mt-2">
        {isUploaded ? (
          <span className="text-green-600">Cargado correctamente</span>
        ) : (
          <span className="text-gray-500">Selecciona un archivo para cargar</span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {/* Input field */}
        <input
          type="file"
          accept=".png, .jpg"
          className="input-field"
          onChange={handleFileChange}
        />
        
        {/* Upload Button */}
        <button
          className="btn-secondary px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleUpload}
          disabled={!file}
        >
          Cargar
        </button>
      </div>
    </div>
  );
}

export default FileUploadField;
