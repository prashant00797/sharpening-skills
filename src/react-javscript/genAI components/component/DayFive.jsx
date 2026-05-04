import { useState } from "react";
import { claimsData } from "../data/config";

const SortColumns = () => {
  const [coloumnConfig, setColoumnConfig] = useState({
    column: "",
    sort: "",
  });
  const tableConfig = [
    {
      header: "Patient",
      key: "patient",
    },
    {
      header: "Amount",
      key: "amount",
    },
    {
      header: "Date",
      key: "date",
    },
    {
      header: "Status",
      key: "status",
    },
  ];

  const handleSorting = (columnHead) => {
    if (columnHead === "status") return;
    if (coloumnConfig.column === columnHead) {
      setColoumnConfig((prev) => ({
        ...prev,
        sort: prev.sort === "asc" ? "desc" : "asc",
      }));
    } else {
      setColoumnConfig({ column: columnHead, sort: "asc" });
    }
  };
  let sortedData = [...claimsData];
  const sortAsc = coloumnConfig.sort === "asc";
  const sortDesc = coloumnConfig.sort === "desc";
  const arrow = coloumnConfig.sort === "asc" ? "⬆️" : "⬇️";
  if (coloumnConfig.column === "patient") {
    if (sortAsc) {
      sortedData.sort((a, b) => a.patient.localeCompare(b.patient));
    } else if (sortDesc) {
      sortedData.sort((a, b) => b.patient.localeCompare(a.patient));
    }
  } else if (coloumnConfig.column === "amount") {
    if (sortAsc) {
      sortedData.sort((a, b) => a.amount - b.amount);
    } else if (sortDesc) {
      sortedData.sort((a, b) => b.amount - a.amount);
    }
  } else if (coloumnConfig.column === "date") {
    if (sortAsc) {
      sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortDesc) {
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableConfig.map((row) => (
              <th className="px-4" key={row.key}>
                <span
                  onClick={() => handleSorting(row.key)}
                  className={`cursor-pointer ${coloumnConfig.column === row.key && coloumnConfig.column !== "status" && "font-extrabold text-cyan-500"}`}
                >
                  {coloumnConfig.column === row.key &&
                    coloumnConfig.column !== "status" &&
                    arrow}
                  {row.header}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              {tableConfig.map((col) => (
                <td className="px-2" key={col.key}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortColumns;
