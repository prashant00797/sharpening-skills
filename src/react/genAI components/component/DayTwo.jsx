import { useState } from "react";
import { claimsData } from "../data/config";

/*YOUR TASK 
Add 4 filter buttons above your ClaimsList: All, Pending, 
Approved, Denied. Clicking a button shows only claims 
with that status. Use useState to track which filter is active. 
Active button should look visually different (bold is fine).

 */
const statusLabel = [
  {
    header: "All",
    key: "All",
  },
  {
    header: "Approved",
    key: "Approved",
  },
  {
    header: "Pending",
    key: "Pending",
  },
  {
    header: "Denied",
    key: "Denied",
  },
];

const FilterClaimsList = () => {
  const [selected, setSelected] = useState("All");
  const updateList =
    selected === "All"
      ? claimsData
      : claimsData.filter((item) => item.status === selected);
  return (
    <div className="mb-20 flex flex-col items-center gap-4">
      <div id="labels" className="flex items-center gap-5">
        {statusLabel.map((stats) => (
          <button
            onClick={() => setSelected(stats.key)}
            key={stats.key}
            className={`${stats.key === selected && "font-extrabold"} cursor-pointer`}
          >
            {stats.header}
          </button>
        ))}
      </div>
      <div>
        <h3>Filtered List {`(${selected}:Selected)`}</h3>
        <div className="w-100 border border-gray-300">
          {updateList.map((item) => (
            <div className="flex justify-between">
              <span>{item.patient}</span>
              <span>{item.type}</span>
              <span>₹{item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <p>{`${updateList.length} results shown (${claimsData.length - updateList.length} hidden)`}</p>
      </div>
    </div>
  );
};

export default FilterClaimsList;
