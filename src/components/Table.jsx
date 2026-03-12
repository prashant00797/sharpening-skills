import { current } from "@reduxjs/toolkit";

const Table = ({
  componentData,
  tableHeads,
  start,
  end,
  totalPages,
  handlePagination,
  currentPage,
}) => {
  const statusStyles = {
    approved: "bg-green-100 text-green-500",
    pending: "bg-yellow-100 text-yellow-500",
    denied: "bg-red-100 text-red-500",
    "In-network": "bg-green-100 text-green-500",
    "Out-network": "bg-red-100 text-red-500",
  };
  return (
    <>
      <div className="mt-10 shadow-2xl rounded-sm border border-gray-200">
        <div className="overflow-x-auto overflow-y-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200 text-gray-500 text-[32px] sticky top-0 tracking-wide">
              <tr>
                {tableHeads.map((col) => {
                  return (
                    <th
                      key={col.key}
                      className="px-4 py-2 font-semibold whitespace-nowrap"
                    >
                      {col.header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {componentData.slice(start, end).map((row) => {
                return (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {tableHeads.map((col) => {
                      return (
                        <td
                          key={col.key}
                          className="px-4 py-4 font-regular whitespace-nowrap"
                        >
                          {col.key === "claimStatus" ||
                          col.key === "providerStatus" ? (
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[row[col.key]]}`}
                            >
                              {row[col.key]}
                            </span>
                          ) : (
                            row[col.key]
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          {currentPage + 1} of {totalPages}
        </div>
        <button
          className="px-2 py-4 bg-amber-400 rounded-sm"
          disabled={currentPage === 0}
          onClick={() => handlePagination(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="px-2 py-4 bg-amber-400 rounded-sm"
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Table;
