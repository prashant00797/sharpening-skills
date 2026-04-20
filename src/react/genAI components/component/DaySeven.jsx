import { useState } from "react";

const ClaimsBatch = ({ claimsData }) => {
  const [patient, setPatient] = useState({
    patientName: "",
    exists: null,
  });

  const allApproved = claimsData.every((item) => item.status === "Approved");
  const checkPending = claimsData.some((item) => item.status === "Pending");
  const checkAmountZero = claimsData.some((item) => item.amount === 0);

  const onchange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkPatient = () => {
    const check = claimsData.some(
      (item) =>
        item.patient.toLowerCase() === patient.patientName.toLowerCase(),
    );

    setPatient((prev) => ({
      ...prev,
      exists: check,
    }));

    setTimeout(() => {
      setPatient((prev) => ({
        ...prev,
        patientName: "",
        exists: null,
      }));
    }, 2000);
  };

  return (
    <div className="border border-gray-300 max-w-3xl mx-auto flex flex-col gap-4">
      <div className="flex flex-col">
        {allApproved && <span>✅ All approved</span>}
        {checkPending && (
          <span>{`⚠️ ${claimsData.filter((item) => item.status === "Pending").length} pending`}</span>
        )}
      </div>

      <button
        disabled={checkAmountZero}
        className="p-1 bg-blue-200 disabled:bg-gray-200 w-[50%]"
      >
        Sumbit All
      </button>
      {checkAmountZero && (
        <p>{`Can't submit: Claims ${claimsData.filter((item) => item.amount === 0).map((item) => `#${item.id} has no amount set`)} `}</p>
      )}
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
        <label htmlFor="Add a patient">Add Patient:</label>
        <input
          value={patient.patientName}
          onChange={onchange}
          type="text"
          name="patientName"
          className="p-1 border"
        />
        <button
          className="px-2 bg-purple-100 cursor-pointer"
          onClick={() => checkPatient()}
        >
          Add Patient
        </button>
      </form>
      {patient.exists && <p>{`⚠️ ${patient.patientName} already exists !`}</p>}
    </div>
  );
};

export default ClaimsBatch;
