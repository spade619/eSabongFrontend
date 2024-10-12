import React from "react";

const TransferPointsRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      <td className="text-truncate">Transfer</td>
      <td className="text-truncate">System</td>
      <td className="text-truncate">{item.data.sender_id.username}</td>
      <td className="text-truncate">{">"}</td>
      <td className="text-truncate">{item.data.receiver_id.username}</td>
      <td className="text-truncate">{item.data.amount}</td>
      <td className="text-truncate">{item.data.credited_at}</td>
    </tr>
  );
};

export default TransferPointsRow;
