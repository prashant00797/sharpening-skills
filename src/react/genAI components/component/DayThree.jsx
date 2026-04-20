import { useState } from "react";
import { claimsData } from "../data/config";

const ClaimSelection = () => {
  const [claimId, setClaimId] = useState("");

  let patientDetails = claimsData.find((item) => item.id === claimId);

  return (
    <div className="h-screen overflow-hidden flex border">
      <div className="h-full overflow-y-auto w-60 border-r">
        {claimsData.map((item) => (
          <div
            className={`cursor-pointer p-2 hover:bg-violet-50 ${item.id === claimId && "bg-violet-100"}`}
            onClick={() => setClaimId(item.id)}
            key={item.id}
          >
            {item.patient}
          </div>
        ))}
        {claimId && <div>{`${claimId} = selected`}</div>}
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto w-60">
        <div className="flex flex-1 overflow-y-auto">
          {claimId ? (
            <div className="flex flex-col">
              <div>Claims Details</div>
              <div>Patient: {patientDetails.patient}</div>
              <div>Type: {patientDetails.type}</div>
              <div>Amount: {patientDetails.amount.toLocaleString()}</div>
              <div>Status: {patientDetails.status}</div>
              <div>Date: {patientDetails.date}</div>
            </div>
          ) : (
            <div>No claim selected. Click name to change</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ClaimSelection;
