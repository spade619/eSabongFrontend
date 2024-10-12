import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const TransactionLogsTableRow = (item) => {
 
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      {/* <td className="text-truncate"> */}
      {/* <div className="tlt-action-withdraw">
          <MDBIcon fas icon="location-arrow" /> withdraw
        </div> */}
      {/* <div className="tlt-action-receive">
          <MDBIcon fas icon="location-arrow" /> receive
        </div>
        <div className="tlt-action-send">
          <MDBIcon fas icon="location-arrow" /> send
        </div> */}
      {/* </td> */}
      {/* <td className="text-truncate">System</td> */}
      <td className="text-truncate">{item.data.sender_id?.username}</td>
      <td className="text-truncate">
        <MDBIcon fas icon="arrow-right" />
      </td>
      <td className="text-truncate">{item.data.receiver_id?.username}</td>
      <td className="text-truncate text-warning">{item.data.amount}</td>
      {/* <td className="text-truncate">CO</td> */}
      {/* <td className="text-truncate">PAID</td>
      <td className="text-truncate">CASH</td>
      <td className="text-truncate"></td> */}
      <td className="text-truncate">
        <div className="tlt-date">
          {new Date(item.data.createdAt).toLocaleString()}
        </div>
      </td>
    </tr>
  );
};

export default TransactionLogsTableRow;
