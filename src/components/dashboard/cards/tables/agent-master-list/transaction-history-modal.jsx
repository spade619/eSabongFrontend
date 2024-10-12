import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBContainer,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState } from "react";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { userTransferHistory } from "../../../../../redux/slices/transferPoints";

const AgentTransactionHistory = (item) => {
  // ** Vars
  const dispatch = useDispatch();
  const storeTransferPoints = useSelector((state) => state.transferPoints);

  // ** States
  const [centredModal, setCentredModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleShow = () => {
    if (!centredModal) {
      dispatch(
        userTransferHistory(
          `?_start=${
            (currentPage - 1) * itemsPerPage
          }&_limit=${itemsPerPage}&_or[0][sender_id]=${
            item.data.id
          }&_or[1][receiver_id]=${item.data.id}`
        )
      );
    }
    setCentredModal(!centredModal);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      const prev = prevPage - 1;
      dispatch(
        userTransferHistory(
          `?_start=${
            (prev - 1) * itemsPerPage
          }&_limit=${itemsPerPage}&_or[0][sender_id]=${
            item.data.id
          }&_or[1][receiver_id]=${item.data.id}`
        )
      );
      return prev;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const prev = prevPage + 1;

      dispatch(
        userTransferHistory(
          `?_start=${
            (prev - 1) * itemsPerPage
          }&_limit=${itemsPerPage}&_or[0][sender_id]=${
            item.data.id
          }&_or[1][receiver_id]=${item.data.id}`
        )
      );
      return prev;
    });
  };

  return (
    <>
      <MDBBtn className="afl-btn afl-btn-2" onClick={toggleShow} role="button">
        $ TRANSACT
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="xl">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              USER TRANSACTIONS
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer
                fluid
                className="px-0 mb-3 d-flex align-items-center justify-content-center"
              >
                <button
                  className="tc-pager"
                  role="button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || storeTransferPoints.isLoading}
                >
                  <MDBIcon fas icon="angle-double-left" />
                </button>
                <div className="tc-page">{currentPage}</div>
                <button
                  className="tc-pager"
                  role="button"
                  onClick={handleNextPage}
                  disabled={
                    storeTransferPoints.userTransferHistory.length <
                      itemsPerPage || storeTransferPoints.isLoading
                  }
                >
                  <MDBIcon fas icon="angle-double-right" />
                </button>
              </MDBContainer>
              <MDBContainer fluid className="px-0 mal-table-container h-100">
                <div className="table-responsive">
                  <table className="mal-table h-100">
                    <thead>
                      <tr className="mal-line">
                        <th scope="col" className="text-truncate">
                          UID
                        </th>
                        <th scope="col" className="text-truncate">
                          RECEIVER
                        </th>
                        <th scope="col" className="text-truncate">
                          SENDER
                        </th>
                        <th scope="col" className="text-truncate">
                          AMOUNT
                        </th>
                        <th scope="col" className="text-truncate">
                          CREDITED AT
                        </th>
                        <th scope="col" className="text-truncate">
                          CREATED AT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {storeTransferPoints.isLoading ? (
                        <tr>
                          <td colSpan="12" className="text-center">
                            <div
                              className="spinner-border text-center"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : storeTransferPoints.userTransferHistory.length ? (
                        storeTransferPoints.userTransferHistory.map((_, i) => (
                          <tr className="text-center">
                            <td className="text-truncate">
                              <div className="mal-sid">{_.id}</div>
                            </td>
                            <td className="text-truncate">
                              {_.receiver_id.username}
                            </td>
                            <td className="text-truncate">
                              {_.sender_id.username}
                            </td>
                            <td className="text-truncate">{_.amount}</td>
                            <td className="text-truncate">{_.credited_at}</td>
                            <td className="text-truncate">
                              <div className="mal-date">
                                {" "}
                                {new Date(_.createdAt).toLocaleString()}
                              </div>
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
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default AgentTransactionHistory;
