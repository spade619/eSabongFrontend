import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

import ViewProfileModal from "./modal";

const TopCommissionsTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      <td className="text-truncate">
        <div className="tc-username">
          <MDBIcon fas icon="user-alt" /> &nbsp;{item.data.username}
        </div>
      </td>
      <td className="text-truncate">
        <div className="tc-wallet-balance">{item.data.commision}</div>
      </td>
      <td className="text-truncate">
        {" "}
        {new Date(item.data.createdAt).toLocaleString()}
      </td>
      <td className="text-truncate">
        <ViewProfileModal data={item.data} />
      </td>
    </tr>
  );
};

export default TopCommissionsTableRow;
