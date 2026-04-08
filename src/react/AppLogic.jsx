import { useState } from "react";
import ClaimEditor from "./day1-7/component/DayEightNine";
import { claimsData } from "./day1-7/data/config";
const AppLogic = () => {
  const [updated, setUpdated] = useState("");
  const onSave = (e, data) => {
    e.preventDefault();
    JSON.stringify(claimsData[0]) === JSON.stringify(data)
      ? setUpdated("Nothing to update Data not modified")
      : setUpdated(data);
  };
  return (
    <main>
      <ClaimEditor claimsData={claimsData} onSave={onSave} />
      {updated && JSON.stringify(updated)}
    </main>
  );
};

export default AppLogic;
