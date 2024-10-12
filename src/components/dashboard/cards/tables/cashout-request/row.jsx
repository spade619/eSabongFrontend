import React from "react";
import CashoutRequestModal from "./modal";
import RequestDetailsModal from "./request-modal";

const CashoutRequestTableRow = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="coreq-pid">{data.id}</div>
      </td>
      <td className="text-truncate">
        <div
          className={`coreq-${data.status} d-flex align-items-center justify-content-center`}
        >
          <div className="coreq-new-icon d-flex align-items-center justify-content-center">
            !
          </div>
          &nbsp; <span>{data.status}</span>
        </div>
      </td>
      <td className="text-truncate">{data.user_id?.username}</td>
      <td className="text-truncate">{data.amount}</td>
      <td className="text-truncate">
        {/* <div className="coreq-view" role="button">
          <MDBIcon fas icon="eye" className="text-white" />{" "}
          <span className="text-dark">VIEW</span>
        </div> */}
        <RequestDetailsModal data={data} />
      </td>
      <td className="text-truncate">
        {data?.user_id?.referrer || "Unassigned"}
      </td>
      <td className="text-truncate">
        <div className="coreq-date">
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

export default CashoutRequestTableRow;
