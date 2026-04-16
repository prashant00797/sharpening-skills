import { useState } from "react";
import ClaimEditor from "./day1-7/component/DayEightNine";
import { claimsData } from "./day1-7/data/config";
import FormDetails from "./day1-7/component/DayTen";
const AppLogic = () => {
  // const [updated, setUpdated] = useState("");
  // const onSave = (e, data) => {
  //   e.preventDefault();
  //   JSON.stringify(claimsData[0]) === JSON.stringify(data)
  //     ? setUpdated("Nothing to update Data not modified")
  //     : setUpdated(data);
  // };
  return (
    <main>
      <FormDetails />
    </main>
  );
};

export default AppLogic;
