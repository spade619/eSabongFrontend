// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";

// ** React
import { useEffect, useState } from "react";

// ** Style
import "./index.css";

// ** Components
import CashoutRequestTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { allCashoutRequest } from "../../../../../redux/slices/cashout";

const CashoutRequestTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** Redux States
  const storeCashout = useSelector((state) => state.cashout);

  // ** React States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  const filterByAdmin =
    auth.user.role.type === "superadmin" || auth.user.role.type === "csr"
      ? ""
      : `&user_id.referrer=${auth.user.id}`;

  useEffect(() => {
    dispatch(
      allCashoutRequest(
        `?_start=${
          (currentPage - 1) * itemsPerPage
        }&_limit=${itemsPerPage}&_status=Pending${filterByAdmin}`
      )
    );
  }, [currentPage, itemsPerPage, storeCashout.reset.length]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <MDBCol className="px-3">
      <Toaster />
      <MDBContainer
        fluid
        className="px-0 mb-3 d-flex align-items-center justify-content-center"
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
          disabled={storeCashout.allCashoutRequest.length < itemsPerPage}
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>
      <MDBContainer fluid className="px-0 coreq-table-container h-100">
        <div className="table-responsive">
          <table className="coreq-table h-100">
            <thead>
              <tr className="coreq-line">
                <th scope="col" className="text-truncate">
                  UID
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  USER
                </th>
                <th scope="col" className="text-truncate">
                  AMOUNT
                </th>
                <th scope="col" className="text-truncate">
                  DETAILS
                </th>
                <th scope="col" className="text-truncate">
                  PROCESSED BY
                </th>
                <th scope="col" className="text-truncate">
                  DATE
                </th>
                <th scope="col" className="text-truncate">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {storeCashout.isLoading ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : storeCashout.allCashoutRequest.length ? (
                storeCashout.allCashoutRequest.map((_, i) => (
                  <CashoutRequestTableRow
                    data={_}
                    key={`tr-${i}`}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
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
    </MDBCol>
  );
};

export default CashoutRequestTable;
