import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const PlayerDeactivatedTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>

      <td className="text-truncate">{item.data.username}</td>
      <td className="text-truncate">{item.data.role.name}</td>
      <td className="text-truncate">
        {new Date(item.data.createdAt).toLocaleString()}
      </td>
      <td className="text-truncate">
        <div className="d-flex align-items-center justify-content-center">
          <MDBBtn className="text-success pdtr-btn-2 shadow-0 me-2">
            <MDBIcon fas icon="user-check" size="xl" />
          </MDBBtn>
          <MDBBtn color="danger" className="pdtr-btn me-2">
            <MDBIcon far icon="times-circle" />
            &nbsp;&nbsp;REJECT
          </MDBBtn>
        </div>
      </td>
    </tr>
  );
};

export default PlayerDeactivatedTableRow;
