import { useState } from "react";
import { claimsData } from "../data/config";
const PatientList = ({ data, onClose }) => {
  return data.map((item) => (
    <div key={item.id} className="p-2">
      <span className="p-2">{item.patient}</span>
      <span className="p-2">{item.type}</span>
      <span className="p-2">{item.status}</span>
      <button
        onClick={() => onClose(item.id)}
        className="p-1 bg-blue-300 cursor-pointer"
      >
        X
      </button>
    </div>
  ));
};

const AddPatient = () => {
  const [data, setClaimsData] = useState(claimsData);
  const [patientDetails, setPatientDetails] = useState({
    id: "",
    patient: "",
    type: "Dental",
    status: "Approved",
  });
  const onchange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPatient = () => {
    if (!patientDetails.patient.trim()) return;
    setClaimsData((prev) => [
      ...prev,
      { ...patientDetails, id: crypto.randomUUID() },
    ]);
    setPatientDetails({
      id: "",
      patient: "",
      type: "Dental",
      status: "Approved",
    });
  };

  const handleRemovePatient = (selectedId) => {
    const filterList = data.filter((item) => item.id !== selectedId);
    setClaimsData(filterList);
  };

  return (
    <div>
      <form className="mb-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="">Patient Name:</label>
          <input
            className="border"
            onChange={onchange}
            type="text"
            name="patient"
            value={patientDetails.patient}
          />
          <button onClick={handleAddPatient} className="p-2 bg-amber-200">
            Add Claim
          </button>
        </div>
      </form>
      <PatientList data={data} onClose={handleRemovePatient} />
    </div>
  );
};

export default AddPatient;
