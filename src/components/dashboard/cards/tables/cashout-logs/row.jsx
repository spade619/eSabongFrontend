import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const CashoutLogsTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      {/* <td className="text-truncate">
        <div className="clt-ref">P20727U127007</div>
      </td> */}
      <td className="text-truncate text-info">{item.data.user_id.username}</td>
      <td className="text-truncate">
        <div className="clt-assigned">
          <MDBIcon fas icon="user-alt" /> {item.data.assign_to.username}
        </div>
      </td>
      <td className="text-truncate text-primary">{item.data.amount}</td>
      {/* <td className="text-truncate text-primary"></td> */}
      <td
        className={`text-truncate ${
          item.data.details.includes("approve") ? "text-success" : "text-danger"
        }`}
      >
        <small>{item.data.details}</small>
      </td>
      <td className="text-truncate">
        <div className="clt-date">
          {" "}
          {new Date(item.data.createdAt).toLocaleString()}
        </div>
      </td>
    </tr>
  );
};

export default CashoutLogsTableRow;
