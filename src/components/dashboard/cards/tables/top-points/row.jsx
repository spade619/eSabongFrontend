import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

import ViewProfileModal from "./modal";

const TopPointsTableRow = (item) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      <td className="text-truncate">
        <div className="tp-username">
          <MDBIcon fas icon="user-alt" /> &nbsp;{item.data.username}
        </div>
      </td>
      <td className="text-truncate">
        <div className="tp-wallet-balance">{item.data.points}</div>
      </td>
      <td className="text-truncate">
        {new Date(item.data.createdAt).toLocaleString()}
      </td>
      <td className="text-truncate">
        <ViewProfileModal data={item.data} />
      </td>
    </tr>
  );
};

export default TopPointsTableRow;
