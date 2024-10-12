import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { useEffect } from "react";
import "./index.css";
import PlayerDeactivatedTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { FIND as USERS } from "../../../../../../redux/slices/users";

const PlayerDeactivatedTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector((state) => state.users);

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  // ** Filtered Users
  const getDeactivedPlayers = storeUsers.users?.filter(
    (x) => x.status == "deactivated"
  );

  useEffect(() => {
    dispatch(USERS(`?referrer=${auth.user.id}`));
  }, []);

  return (
    <MDBCol className="px-3">
      <MDBContainer fluid className="px-0 pdt-table-container h-100">
        <div className="table-responsive">
          <table className="pdt-table h-100">
            <thead>
              <tr className="pdt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  ROLE
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
              {storeUsers.tableLoader ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : getDeactivedPlayers.length ? (
                getDeactivedPlayers.map((item, i) => (
                  <PlayerDeactivatedTableRow data={item} key={`tr-${i}`} />
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

export default PlayerDeactivatedTable;
