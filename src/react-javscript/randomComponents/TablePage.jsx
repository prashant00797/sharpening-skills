import Table from "./Table";
import { data } from "../data/componentData";
import { tableHeads } from "../data/tableHeads";
import { PAGE_LIMIT } from "../data/constant";
import { useState } from "react";

const TablePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalDataLength = data?.length;
  const totalPages = Math.ceil(totalDataLength / PAGE_LIMIT);
  const start = currentPage * PAGE_LIMIT;
  const end = start + totalPages;

  const handlePagination = (n) => {
    setCurrentPage(n);
  };
  /**
   *  totalDataLength 50
   *  totalPages = 50/5 = 10
   *  i) start = 0 * 5 = 0
   *   end = 0 + 10 = 10
   *
   *    setCurrenpage(0+1) = currentPage = 1
   *  ii) start = 1 * 5 = 5
   *      end = 5 + 10 = 15
   *      setCurrenpage(1+1) = currentPage = 2
   *  iii) start = 2 * 5 = 10
   *      end = 10 + 10 = 20
   *   setCurrenpage(2+1) = currentPage = 3
   *   iv) start = 3*5 = 15
   *      end = 15 + 10 = 25
   *
   *
   *
   *
   */
  return (
    <div>
      <Table
        componentData={data}
        tableHeads={tableHeads}
        start={start}
        end={end}
        totalPages={totalPages}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TablePage;
