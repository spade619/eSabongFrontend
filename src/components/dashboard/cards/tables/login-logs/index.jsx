// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
import LoginLogsTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { loginLogs } from "../../../../../redux/slices/users";

const LoginLogsTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(
      loginLogs(
        `?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
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
    <MDBCol className="px-3">
      <MDBContainer
        fluid
        className="px-0 mb-3 d-flex align-items-center justify-content-center"
      >
        <button
          className="tp-pager"
          role="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || storeUsers.isLoading}
        >
          <MDBIcon fas icon="angle-double-left" />
        </button>
        <div className="tp-page">{currentPage}</div>
        <button
          className="tp-pager"
          role="button"
          onClick={handleNextPage}
          disabled={
            storeUsers.loginLogs.length < itemsPerPage || storeUsers.isLoading
          }
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>
      <MDBContainer fluid className="px-0 llt-table-container h-100">
        <div className="table-responsive">
          <table className="llt-table h-100">
            <thead>
              <tr className="llt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  EVENT
                </th>
                <th scope="col" className="text-truncate">
                  COUNTRY
                </th>
                <th scope="col" className="text-truncate">
                  IP ADDRESS
                </th>
                <th scope="col" className="text-truncate">
                  Login Status
                </th>
                <th scope="col" className="text-truncate">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {storeUsers.isLoading ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : storeUsers.loginLogs.length ? (
                storeUsers.loginLogs.map((item, i) => (
                  <LoginLogsTableRow data={item} key={`tr-${i}`} />
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

export default LoginLogsTable;
