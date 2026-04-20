/**
 * 
 *  YOUR TASK 
    Build a ClaimsList component using the claims data below. 
    Render each claim as a row showing: patient name, claim 
    type, amount (formatted with ₹), and a status label. Do not 
    add any CSS — structure only. 
 * 
 * 
 */

import { claimsData } from "../data/config";

const tableHeaders = [
  {
    header: "Patient",
    key: "patient",
  },
  {
    header: "Claim Type",
    key: "type",
  },
  {
    header: "Amount",
    key: "amount",
  },
  {
    header: "Status",
    key: "status",
  },
];

const ClaimsList = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((row) => (
              <th key={row.key}>{row.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {claimsData.map((row) => (
            <tr key={row.id}>
              {tableHeaders.map((col) => (
                <td key={col.key}>
                  {col.key === "amount"
                    ? `₹${row[col.key].toLocaleString()}`
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsList;
