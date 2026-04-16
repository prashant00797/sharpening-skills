import React, { useState } from "react";
const formConfig = [
  {
    id: "1",
    name: "patient",
    inputType: "text",
    label: "Patient",
    errorMessage: "Patient can't be empty",
  },
  {
    id: "2",
    name: "amount",
    inputType: "number",
    label: "Amount",
    errorMessage: "Amount can't be less than equal to zero",
  },
  {
    id: "3",
    name: "type",
    inputType: "select",
    options: [
      {
        name: "Medical",
        value: "Medical",
      },
      {
        name: "Dental",
        value: "Dental",
      },
      {
        name: "Vision",
        value: "Vision",
      },
    ],
    label: "Type",
  },
  {
    id: "4",
    name: "date",
    inputType: "date",
    label: "Date",
    errorMessage: "Date can't be zero",
  },
];
const FormDetails = () => {
  const [formData, setFormData] = useState({
    patient: "",
    amount: 0,
    type: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (data) => {
    const { patient, amount, type, date } = data;
    if (patient.trim() === "") {
      return "patient";
    } else if (amount <= 0) {
      return "amount";
    } else if (date.trim() === "") {
      return "date";
    }
    return;
  };
  const handleSubmit = () => {
    const errorMessageRecieved = validate(formData);
    

    if (errorMessageRecieved) {
      setError(errorMessageRecieved);
    } else {
      setSuccess(true);
      setFormData((prev) => ({
        ...prev,
        patient: "",
        type: "",
        amount: "",
        date: "",
      }));
    }
  };
  return (
    <div>
      <form
        className="flex flex-col gap-3 max-w-2xl mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        {formConfig.map((field) => (
          <React.Fragment key={field.id}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.inputType === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={onChange}
              >
                {field.options.map((option) => (
                  <option key={option.name} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={formData[field.name]}
                // placeholder={field.errorMessage}
                onChange={onChange}
                className="px-2 py-3 bg-amber-50"
              />
            )}
            {error === field.name && (
              <span className="text-red-400">{field.errorMessage}</span>
            )}
          </React.Fragment>
        ))}
        <button
          onClick={handleSubmit}
          className="px-2 py-4 bg-blue-100 rounded-sm cursor-pointer"
        >
          Submit Claim
        </button>
      </form>
      {success && <p>Data set Successfully</p>}
    </div>
  );
};

export default FormDetails;
