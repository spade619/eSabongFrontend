import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import "./index.css";
import PlayerActiveTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { FIND as USERS } from "../../../../../../redux/slices/users";

const PlayerActiveTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector((state) => state.users);

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  // ** Filtered Users
  const getPlayers = storeUsers.users?.filter(
    (x) => x.role?.name == "Player" && x.status == "active" || x.role?.name == "Player" && x.status == "deactivated"
  );

  useEffect(() => {
    dispatch(USERS(`?referrer=${auth.user.id}`));
  }, []);

  return (
    <MDBCol className="px-3">
      <MDBContainer fluid className="px-0 pat2-table-container h-100">
        <div className="table-responsive">
          <table className="pat2-table h-100">
            <thead>
              <tr className="pat2-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  CREDIT BALANCE
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  LAST BET
                </th>
                <th scope="col" className="text-truncate">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {storeUsers.tableLoader ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : getPlayers.length ? (
                getPlayers.map((item, i) => (
                  <PlayerActiveTableRow data={item} key={`tr-${i}`} />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
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

export default PlayerActiveTable;
