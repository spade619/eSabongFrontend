// ** Third Party Components
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

// ** React
import React from "react";

// ** Modals
import PlayerProfileModal from "./profile-modal";
import PlayerProfileEdit from "./edit-profile-modal";
import PlayerTransactionHistory from "./transaction-history-modal";

const ModAcctListTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="mal-sid">{item.data.id}</div>
      </td>
      <td className="text-truncate">{item.data.username}</td>
      <td className="text-truncate">{item.data.points}</td>
      <td className="text-truncate">{item.data.role.name}</td>
      {/* <td className="text-truncate">Regular</td> */}
      <td className="text-truncate">{item.data.email}</td>
      <td className="text-truncate">{item.data.phoneNumber}</td>
      <td className="text-truncate">
        <div className="mal-status-active">
          <MDBIcon fas icon="check-circle" />
          &nbsp;&nbsp;Active
        </div>
        {/* <div className="mal-status-blocked">
          <MDBIcon fas icon="minus-circle" />
          &nbsp;&nbsp;Blocked
        </div> */}
      </td>
      {/* <td className="text-truncate">
        <div className="mal-verification-verified">
          <MDBIcon fas icon="check" />
          &nbsp;&nbsp;Verified
        </div>
        <div className="mal-verification-unverified">
          <MDBIcon fas icon="times" />
          &nbsp;&nbsp;Unverified
        </div>
      </td> */}
      <td className="text-truncate">
        <div className="mal-date">
          {" "}
          {new Date(item.data.createdAt).toLocaleString()}
        </div>
      </td>
      <td className="text-truncate">
        <PlayerProfileModal data={item.data} />
        <PlayerTransactionHistory data={item.data} />
        <PlayerProfileEdit data={item.data} />
      </td>
    </tr>
  );
};

export default ModAcctListTableRow;
