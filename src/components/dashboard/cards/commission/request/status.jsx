// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { myCommissionRequests } from "../../../../../redux/slices/commissionRequest";

const AgentCashoutStatus = () => {
  const dispatch = useDispatch();
  const storeCommissionRequest = useSelector(
    (state) => state.commissionRequest
  );

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  // ** React States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  useEffect(() => {
    dispatch(
      myCommissionRequests(
        `?_start=${
          (currentPage - 1) * itemsPerPage
        }&_limit=${itemsPerPage}&_user_id=${auth.user.id}`
      )
    );
  }, [currentPage, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <MDBCol>
      <MDBContainer
        fluid
        className="comms-req-status-header d-flex align-items-center justify-content-between py-2 p-"
      >
        <div className="comms-req-status-title mt-2">
          <span className="title">
            <MDBIcon fas icon="check-circle" />
            &nbsp;&nbsp;COMMISSION STATUS
          </span>
          <br />
          <span className="sub">MY COMMISSION REQUESTS</span>
        </div>
        {/* <div className="text-end comms-req-status-filter">
          <MDBIcon
            fas
            icon="redo-alt"
            size="xl"
            className="text-white"
            role="button"
          />
        </div> */}
      </MDBContainer>
      <MDBContainer
        fluid
        className="comms-req-status-body d-flex align-items-center justify-content-between px-2 pb-2"
      >
        <MDBContainer
          fluid
          className="px-0 comms-req-status-table-container h-100"
        >
          <div className="table-responsive">
            <table className="comms-req-status-table h-100">
              <thead>
                <tr className="comms-req-status-line">
                  <th scope="col" className="text-truncate">
                    UID
                  </th>
                  <th scope="col" className="text-truncate">
                    STATUS
                  </th>
                  <th scope="col" className="text-truncate">
                    AMOUNT
                  </th>
                  {/* <th scope="col" className="text-truncate">
                    TO WALLET
                  </th> */}
                  {/* <th scope="col" className="text-truncate">
                    CARE OF
                  </th> */}
                  <th scope="col" className="text-truncate">
                    REQUEST DATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {storeCommissionRequest.isLoading ? (
                  <tr>
                    <td colSpan="12" className="text-center">
                      <div className="spinner-border text-center" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : storeCommissionRequest.myCommissionRequests.length ? (
                  storeCommissionRequest.myCommissionRequests?.map(
                    (item, i) => (
                      <tr className="text-center" key={i}>
                        <td className="text-truncate">
                          <div className="mal-sid">{item.id}</div>
                        </td>
                        <td className="text-truncate">
                          <div
                            className={`comms-req-status-${item.status}-button d-flex align-items-center justify-content-center`}
                          >
                            &nbsp;{" "}
                            <span className="comms-req-status-status-text">
                              {" "}
                              {item.status}
                            </span>
                          </div>
                        </td>
                        <td className="text-truncate">{item.amount}</td>
                        {/* <td className="text-truncate">Regular Wallet</td> */}
                        {/* <td className="text-truncate">
                      {item.user_id.referrer || "Unassigned"}
                    </td> */}
                        <td className="text-truncate">{item.createdAt}</td>
                      </tr>
                    )
                  )
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
          <MDBContainer
            fluid
            className="px-0 mt-3 d-flex align-items-center justify-content-center"
          >
            <button
              className="tc-pager"
              role="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <MDBIcon fas icon="angle-double-left" />
            </button>
            <div className="tc-page">{currentPage}</div>
            <button
              className="tc-pager"
              role="button"
              onClick={handleNextPage}
              disabled={
                storeCommissionRequest.myCommissionRequests.length <
                itemsPerPage
              }
            >
              <MDBIcon fas icon="angle-double-right" />
            </button>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentCashoutStatus;
