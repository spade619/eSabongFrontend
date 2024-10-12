import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** React
import { useState, useEffect } from "react";

// ** Redux
import { useSelector } from "react-redux";

// ** Components
import TransferPointsRow from "./row";

// ** Redux
import { useDispatch } from "react-redux";
import { allHistory } from "../../../../../redux/slices/transferPoints";

const TransferPointsLogsTable = () => {
  const dispatch = useDispatch();
  const storeTransferPoints = useSelector((state) => state.transferPoints);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    dispatch(
      allHistory(
        `?_start=${
          (currentPage - 1) * itemsPerPage
        }&_limit=${itemsPerPage}&credited_at=superadmin`
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
    <MDBCol className="tpf-wrapper p-2">
      <MDBContainer fluid className="px-0 py-4 tpf-container">
        <MDBContainer fluid className="px-3 tpf-header-noline pb-3">
          <span>
            <MDBIcon fas icon="exchange-alt" />
            &nbsp;&nbsp;TRANSFER POINTS FORM
          </span>
        </MDBContainer>
        <MDBContainer
          fluid
          className="px-0 mb-3 d-flex align-items-center justify-content-center"
        >
          <button
            className="tp-pager"
            role="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1 || storeTransferPoints.isLoading}
          >
            <MDBIcon fas icon="angle-double-left" />
          </button>
          <div className="tp-page">{currentPage}</div>
          <button
            className="tp-pager"
            role="button"
            onClick={handleNextPage}
            disabled={
              storeTransferPoints.allHistory.length < itemsPerPage ||
              storeTransferPoints.isLoading
            }
          >
            <MDBIcon fas icon="angle-double-right" />
          </button>
        </MDBContainer>
        <MDBContainer fluid className="tpf-body">
          <div className="table-responsive">
            <table className="tpf-table h-100">
              <thead>
                <tr className="tpf-line">
                  <th scope="col" className="text-truncate">
                    ID
                  </th>
                  <th scope="col" className="text-truncate">
                    ACTION
                  </th>
                  <th scope="col" className="text-truncate">
                    BY
                  </th>
                  <th scope="col" className="text-truncate">
                    SENDER
                  </th>
                  <th scope="col" className="text-truncate">
                    TO
                  </th>
                  <th scope="col" className="text-truncate">
                    RECEIVER
                  </th>
                  <th scope="col" className="text-truncate">
                    AMOUNT
                  </th>

                  <th scope="col" className="text-truncate">
                    CREDITED AT
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
                ) : storeTransferPoints?.allHistory.length ? (
                  storeTransferPoints?.allHistory.map((item, i) => (
                    <TransferPointsRow data={item} key={`tr-${i}`} />
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

export default TransferPointsLogsTable;
