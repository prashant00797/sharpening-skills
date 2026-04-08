import { useState } from "react";

const ClaimEditor = ({ claimsData, onSave }) => {
  const [claims, setClaims] = useState(claimsData[0]);

  const types = [...new Set(claimsData.map((item) => item.type))];
  const status = [...new Set(claimsData.map((item) => item.status))];
  const style = "flex gap-3";

  const onchange = (e) => {
    const { name, value } = e.target;
    setClaims((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-10 max-w-3xl border border-amber-300 flex flex-col mx-auto">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={style}>
          <span>{`Patient: ${claims.patient}`}</span>
          <input
            onChange={onchange}
            className="border p-1"
            type="text"
            name="patient"
            id="patient"
            value={claims.patient}
            // required
          />
        </div>
        <div className={style}>
          <span>{`Type: ${claims.type}`}</span>
          <select name="type" id="type" value={claims.type} onChange={onchange}>
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={style}>
          <span>{`Amount: ${claims.amount}`}</span>
          <input
            className="border p-1"
            type="text"
            name="amount"
            id="amount"
            value={claims.amount}
            onChange={onchange}
            // required
          />
        </div>
        <div className={style}>
          <span>{`Status: ${claims.status}`}</span>
          <select
            name="status"
            id="status"
            value={claims.status}
            onChange={onchange}
          >
            {status.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={(e) =>
            claims.patient.trim() &&
            claims.amount.toString().trim() &&
            onSave(e, claims)
          }
          className="px-4 py-2 bg-blue-100 w-[50%] mx-auto mt-10 cursor-pointer"
        >
          Save Changes
        </button>
        {(!claims.patient.trim() || !claims.amount.toString().trim()) && (
          <h1>⚠️ Fields cant be empty</h1>
        )}
      </form>
    </div>
  );
};

export default ClaimEditor;
