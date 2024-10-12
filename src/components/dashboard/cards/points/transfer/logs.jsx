// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Redux
import { useSelector } from "react-redux";

const AgentTransferPointsLogs = () => {
  const storeTransferPoints = useSelector((state) => state.transferPoints);

  console.log(storeTransferPoints);

  return (
    <MDBCol className="atp-wrapper p-2">
      <MDBContainer fluid className="px-0 atp-container">
        <MDBContainer
          fluid
          className="atp-header py-2 d-flex align-items-center justify-content-between"
        >
          <span>
            <MDBIcon fas icon="list-alt" />
            &nbsp;&nbsp;RECENT TRANSFERS
          </span>
          <MDBIcon
            fas
            icon="chevron-circle-right"
            size="2x"
            className="text-warning"
          />
        </MDBContainer>
        <MDBContainer fluid className="px-0 atp-body">
          <div className="table-responsive">
            <table className="acs-table h-100">
              <thead>
                <tr className="acs-line">
                  <th scope="col" className="text-truncate">
                    UID
                  </th>
                  <th scope="col" className="text-truncate">
                    AMOUNT
                  </th>
                  <th scope="col" className="text-truncate">
                    SENDER
                  </th>
                  <th scope="col" className="text-truncate">
                    RECEIVER
                  </th>
                  <th scope="col" className="text-truncate">
                    TRANSFERRED DATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {storeTransferPoints.isLoading ? (
                  <tr>
                    <td colSpan="12" className="text-center">
                      <div className="spinner-border text-center" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : storeTransferPoints.myHistory.length ? (
                  storeTransferPoints.myHistory?.map((item, i) => (
                    <tr className="text-center" key={i}>
                      <td className="text-truncate">
                        <div className="mal-sid">{item.id}</div>
                      </td>
                      <td className="text-truncate">{Number(item.amount)}</td>
                      <td className="text-truncate">
                        {item.sender_id?.username}
                      </td>
                      <td className="text-truncate">
                        {item.receiver_id?.username}
                      </td>
                      <td className="text-truncate">
                        {" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center">
                      No Result Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentTransferPointsLogs;
