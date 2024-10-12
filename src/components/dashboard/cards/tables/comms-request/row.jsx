import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

import CashoutRequestModal from "./modal";

const CommissionRequestTableRow = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="comreq-ref">{data.id}</div>
      </td>
      <td className="text-truncate">
        {/* <div className="comreq-status-approved d-flex align-items-center justify-content-center">
          <MDBIcon fas icon="check" className="text-white" />
          &nbsp;<span>APPROVED</span>
        </div> */}
        <div
          className={`comreq-status-${data.status} d-flex align-items-center justify-content-center`}
        >
          <div className="comreq-status-icon d-flex align-items-center justify-content-center">
            !
          </div>
          &nbsp; <span>{data.status}</span>
        </div>
      </td>
      <td className="text-truncate">{data.user_id?.username}</td>
      <td className="text-truncate">{data.amount}</td>
      <td className="text-truncate">
        <div className="comreq-details">
          Agent {data.user_id?.username} requested to withdraw {data.amount}{" "}
          points from its available commission earnings.
        </div>
      </td>
      <td className="text-truncate">
        <div className="comreq-date">
          {" "}
          {new Date(data.createdAt).toLocaleString()}
        </div>
      </td>
      <td className="">
        <CashoutRequestModal
          data={data}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </td>
    </tr>
  );
};

export default CommissionRequestTableRow;
