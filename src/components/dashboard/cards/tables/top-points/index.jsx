// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
import TopPointsTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { topPoints } from "../../../../../redux/slices/users";

const TopPointsTable = () => {
  const dispatch = useDispatch();

  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const storeUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(
      topPoints(
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
              className="tp-pager"
              role="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <MDBIcon fas icon="angle-double-left" />
            </button>
            <div className="tp-page">{currentPage}</div>
            {/* <span className="tp-page-dot">...</span> */}
            {/* <div className="tp-page">3091</div> */}
            <button
              className="tp-pager"
              role="button"
              onClick={handleNextPage}
              disabled={storeUsers.topPoints.length < itemsPerPage}
            >
              <MDBIcon fas icon="angle-double-right" />
            </button>
          </MDBContainer>
          <MDBContainer fluid className="px-0 tp-table-container h-100">
            <div className="table-responsive">
              <table className="tp-table h-100">
                <thead>
                  <tr className="tp-line">
                    <th scope="col" className="text-truncate">
                      USER ID
                    </th>
                    <th scope="col" className="text-truncate">
                      USERNAME
                    </th>
                    <th scope="col" className="text-truncate">
                      WALLET BALANCE
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
                  {storeUsers.topPoints?.map((_, i) => (
                    <TopPointsTableRow data={_} key={`tr-${i}`} />
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

export default TopPointsTable;
