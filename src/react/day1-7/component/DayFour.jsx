import { claimsData } from "../data/config";

const SummaryCard = () => {
  const totalAmount = claimsData.reduce((acc, cuur) => acc + cuur.amount, 0);
  const statusCount = claimsData.reduce((acc, curr) => {
    if (acc[curr.status]) {
      acc[curr.status] += 1;
    } else {
      acc[curr.status] = 1;
    }
    return acc;
  }, {});
  const typeCount = claimsData.reduce((acc, curr) => {
    if (acc[curr.type]) {
      acc[curr.type] += 1;
    } else {
      acc[curr.type] = 1;
    }
    return acc;
  }, {});

  const divStyles = `border border-red-200 flex items-center justify-center text-xl font-bold`;
  return (
    <div className="p-2 grid grid-cols-2 gap-10 h-screen">
      <div id="total-claims" className={`${divStyles}`}>
        <div>{`${claimsData.length} total claims`}</div>
      </div>
      <div className={`${divStyles}`} id="total-amount">
        <div>{`${totalAmount} amount`}</div>
      </div>
      <div className={`${divStyles}`} id="count-status">
        {Object.entries(statusCount).map(([status, count]) => (
          <div key={status}>{`${status}:${count}`}</div>
        ))}
      </div>
      <div className={`${divStyles}`} id="count-type">
        {Object.entries(typeCount).map(([type, count]) => (
          <div key={type}>{`${type}:${count}`}</div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;
