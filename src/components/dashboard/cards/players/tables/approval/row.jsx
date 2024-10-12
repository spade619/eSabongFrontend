import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

// ** Components
import ApproveAndDeactModal from "./approveAndDeactModal";
import PlayerApproveAndDeactivate from "./playerApproveAndDeact"

const PlayerApprovalTableRow = (item) => {
  console.log('forPlayerApproval',item.data.role.description)
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>

      <td className="text-truncate">{item.data.username}</td>

      <td className="text-truncate">
        {" "}
        {new Date(item.data.createdAt).toLocaleString()}
      </td>
      <td className="text-truncate">
        {/* <MDBBtn color="success" className="pat3r-btn me-2">
          <MDBIcon far icon="check-circle" />
          &nbsp;&nbsp;APPROVE
        </MDBBtn>
        <MDBBtn color="danger" className="pat3r-btn me-2">
          <MDBIcon far icon="times-circle" />
          &nbsp;&nbsp;REJECT
        </MDBBtn> */}

       { item.data.role.description !== "player" ? <ApproveAndDeactModal data={item.data} /> : <PlayerApproveAndDeactivate data={item.data} />}
      </td>
    </tr>
  );
};

export default PlayerApprovalTableRow;
