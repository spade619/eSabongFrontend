// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
import TopCommissionsTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { topCommissions } from "../../../../../redux/slices/users";

const TopCommissionsTable = () => {
  const dispatch = useDispatch();

  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const storeUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(
      topCommissions(
        `&_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
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
      {storeUsers.tableLoader ? (
        <div className="d-flex justify-content-center p-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
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
            {/* <span className="tc-page-dot">...</span>
        <div className="tc-page">3091</div> */}
            <button
              className="tc-pager"
              role="button"
              onClick={handleNextPage}
              disabled={storeUsers.topCommissions.length < itemsPerPage}
            >
              <MDBIcon fas icon="angle-double-right" />
            </button>
          </MDBContainer>
          <MDBContainer fluid className="px-0 tc-table-container h-100">
            <div className="table-responsive">
              <table className="tc-table h-100">
                <thead>
                  <tr className="tc-line">
                    <th scope="col" className="text-truncate">
                      USER ID
                    </th>
                    <th scope="col" className="text-truncate">
                      USERNAME
                    </th>
                    <th scope="col" className="text-truncate">
                      COMMISSION WALLET BALANCE
                    </th>
                    <th scope="col" className="text-truncate">
                      REGISTRATION DATE
                    </th>
                    <th scope="col" className="text-truncate">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {storeUsers.topCommissions?.map((_, i) => (
                    <TopCommissionsTableRow data={_} key={`tr-${i}`} />
                  ))}
                </tbody>
              </table>
            </div>
          </MDBContainer>
        </>
      )}
    </MDBCol>
  );
};

export default TopCommissionsTable;
