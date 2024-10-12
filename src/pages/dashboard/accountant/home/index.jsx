// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

// ** Utils
import { sumArray } from "../../../../utility/utils";

// ** Components
import AvailablePoints from "../../../../components/dashboard/cards/available-points";
import StatusCardMedium from "../../../../components/dashboard/cards/status/medium";
import StatusCardSmall from "../../../../components/dashboard/cards/status/small";
import DatedStatusTable from "../../../../components/dashboard/cards/tables/dated-status";
import OtherStatusTable from "../../../../components/dashboard/cards/tables/other-status";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { FIND as USERS } from "../../../../redux/slices/users";
import { allConvertedComms } from "../../../../redux/slices/convertCommision";
import { ME } from "../../../../redux/slices/users";
import { cashoutLogs } from "../../../../redux/slices/cashout";
import { allCashIn } from "../../../../redux/slices/cashin";

const AccountantDashboard = () => {
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector((state) => state.users);
  const storeConvertCommision = useSelector((state) => state.convertCommision);
  const storeCashout = useSelector((state) => state.cashout);
  const storeCashin = useSelector((state) => state.cashin);


  const [allsersData, setUsersData] = useState(null)
  const [convertedCommissionsState, setConvertedCommissionsState] = useState(null)
  const [superAdmin, setSuperAdmin] = useState(0)
  
  const [companyCommissionFromTheStart, setCompanyCommissionFromTheStart] = useState(0)
  const [drawCommissionFromTheStart, setDrawCommissionFromTheStart] = useState()

   //----------------------------------States For Today's Commission---------------------------------------------
   const [commissionsRecieved, setCommissionsRecieved] = useState(0)
   const [companyCommissionForToday, setCompanyCommissionForToday]= useState(0)
   const [commissionsToday, setCommissionsToday] = useState(0)
   const [drawCommissionForToday, setDrawCommissionForToday] = useState(0)
   
 
   //---------------------------------States For Statistics Component-------------------------
   const [commissionsForThisMonth, setCommissionsForThisMonth] = useState(0)  
   const [adminCommissionForThisMonth, setAdminCommissionForThisMonth] = useState(0) 
   const [agentsCommissionForThisMonth, setAgentsCommissionForThisMonth] = useState(0)
   const [drawCommissionForThisMonth, setDrawCommissionForThisMonth] = useState(0)
   const [drawCommissionForLastMonth, setDrawCommissionForLastMonth] = useState(0)
   const [adminCommissionForLastMonth, setAdminCommissionForLastMonth] = useState(0)
   const [commissionsForLastMonth,  setCommissionsForLastMonth] = useState(0)
   const [agentsCommissionForLastMonth, setAgentsCommissionForLastMonth] = useState(0)
   

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  const user = JSON.parse(localStorage.getItem('auth'))


 

  // -------------------FETCH ALL DATA REQUIRED FOR THIS PAGE-------------------------------
   useEffect(() => {
 //-------------------------FETCH ALL USERS DATA----------------------------------------
   const fetchAllUsersData = async(user) => {
     const allUsers = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "users", {
    
       headers: {'Authorization': `Bearer ${user.jwt}`}, 
         })
 
     const allUsersjson = await allUsers.json() 
 
     if(allUsers.ok) {
      
       const filterSuperAdmin =  allUsersjson.filter((Superadmin) => {
         return Superadmin.role.description === "superadmin" 
        })
       
        setSuperAdmin(...filterSuperAdmin)
        setUsersData(allUsersjson )
       
     }
 }
 
 
 
 
   //-------------------------FETCH ALL CONVERT COMMISSIONS DATA----------------------------------------
 const fetchConvertHistories = async(user) => {
   const allConvertedCommissions = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "convert-commission-histories?_sort=createdAt:DESC", {
    
     headers: {'Authorization': `Bearer ${user.jwt}`}, 
       })
     const allConvertedCommissionsResponse = await allConvertedCommissions.json() 
      
     if(allConvertedCommissions.ok) {
      setConvertedCommissionsState(allConvertedCommissionsResponse)
     
     }
 }
 
 
 
 
 
 
  //-------------------------FETCH ALL COMMISSION HISTORIES----------------------------------------
  const limit = 100;
 let offset = 0; // starting index of the first object to retrieve
 let objects = [{}]; // array to hold all the retrieved objects
 
       
  const fetchCommissionHistories = async(user) => {
   
  
   const allCommissionHistory = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `commission-histories?_sort=createdAt:DESC&_limit=${limit}&_start=${offset}`, {
    
     headers: {'Authorization': `Bearer ${user.jwt}`}, 
       })
     const allCommissionHistoryResponse = await allCommissionHistory.json() 
         
     if(allCommissionHistory.ok) {
       objects = objects.concat(allCommissionHistoryResponse)
       offset += limit 
       if(allCommissionHistoryResponse.length === limit){
         const users = JSON.parse(localStorage.getItem('auth'))
         await fetchCommissionHistories(users) //fetch the next page recursively if objects are more than 100
       }
 
   
     }
 }
 
 
 fetchCommissionHistories(user)
 .then(() => {
// calculation and filtering is done here
setCommissionsRecieved(objects)

// ---------------------------------------------------------------------------

    //--------------------------------------------------FILTERED COMMISSION FOR THIS MONTH------------------------------------------

    const filteredCommisionForThisMonth = objects.filter(item => {

      const monthNow = new Date();
      const commissionDatas = new Date(item.createdAt)
  
        return commissionDatas.getMonth() == monthNow.getMonth()  &&  commissionDatas.getFullYear() == monthNow.getFullYear()  
     }); 
  
  
      //--------------------------------------------------FILTERED COMMISSION FOR THE PREVIOUS MONTH------------------------------------------
     const filteredCommisionForLastMonth = objects.filter(item => {
  
      const lastMonth = new Date();
      const commissionDatasLastMonth = new Date(item.createdAt)
        return commissionDatasLastMonth.getMonth() == lastMonth.getMonth()-1  &&  commissionDatasLastMonth.getFullYear() == lastMonth.getFullYear()  
     }); 
  
     const filteredCommissionsFromTheStart = objects.filter(item => {
      return item.commision
  })
  
  // -------------------------------------FILTER COMMISSIONS FOR DRAW OUTCOME FROM THE START-----------------------------------------------------
  const filteredCommisionForDrawOutcome = filteredCommissionsFromTheStart.filter(item => item.game_history_id.outcome === 'draw') 
  const arenaCommissionSumForDrawOutcome =  filteredCommisionForDrawOutcome.map(item => item.commision).reduce((total, current) => total + current, 0)  
  const arenaCalculatedCommissionSumForDrawOutcome = arenaCommissionSumForDrawOutcome * 10/100
  setDrawCommissionFromTheStart(arenaCalculatedCommissionSumForDrawOutcome.toFixed(2))
  
  
  
  // -------------------------------------FILTER COMMISSIONS FOR DRAW OUTCOME FOR TODAY-----------------------------------------------------
  const filteredCommisionForDrawOutcomeToday = filteredCommissionsFromTheStart.filter(item => item.game_history_id.outcome === 'draw' && new Date(item.createdAt).toLocaleDateString()  == new Date().toLocaleDateString()) 
  const arenaCommissionSumForDrawOutcomeToday =  filteredCommisionForDrawOutcomeToday.map(item => item.commision).reduce((total, current) => total + current, 0)  
  const arenaCalculatedCommissionSumForDrawOutcomeToday = arenaCommissionSumForDrawOutcomeToday * 10/100
  setDrawCommissionForToday(arenaCalculatedCommissionSumForDrawOutcomeToday.toFixed(2))
  
  
  
  // -----------------------------------FILTER COMMISSION FOR DRAW OUTCOME THIS MONTH----------------------------------------------------------
  
  const filteredCommisionForDrawOutcomeThisMonth = filteredCommisionForThisMonth.filter(item => {
    const monthNow = new Date();
  const drawCommissionDatas = new Date(item.createdAt)
  
    return item.game_history_id.outcome === 'draw' && (drawCommissionDatas.getMonth()  == monthNow.getMonth() && drawCommissionDatas.getFullYear() == monthNow.getFullYear())
  }) 
  
  const arenaCommissionSumForDrawOutcomeThisMonth =  filteredCommisionForDrawOutcomeThisMonth.map(item => item.commision).reduce((total, current) => total + current, 0)  
  const arenaCalculatedCommissionSumForDrawOutcomeThisMonth = arenaCommissionSumForDrawOutcomeThisMonth * 10/100
  setDrawCommissionForThisMonth(arenaCalculatedCommissionSumForDrawOutcomeThisMonth.toFixed(2))
  
  
  // ---------------------------------- FILTER COMMISSION FOR DRAW OUTCOME LAST MONTH ---------------------------------------------------------------
  const filteredCommisionForDrawOutcomeLastMonth = filteredCommisionForThisMonth.filter(item => {
    const monthNow = new Date();
  const drawCommissionDatas = new Date(item.createdAt)
  
    return item.game_history_id.outcome === 'draw' && (drawCommissionDatas.getMonth() == monthNow.getMonth()-1 && drawCommissionDatas.getFullYear() == monthNow.getFullYear())
  }) 
  
  const arenaCommissionSumForDrawOutcomeLastMonth =  filteredCommisionForDrawOutcomeLastMonth.map(item => item.commision).reduce((total, current) => total + current, 0)  
  const arenaCalculatedCommissionSumForDrawOutcomeLastMonth = arenaCommissionSumForDrawOutcomeLastMonth * 10/100
  
  setDrawCommissionForLastMonth(arenaCalculatedCommissionSumForDrawOutcomeLastMonth.toFixed(2))
  // console.log('drawOutcomeLastMonthval', drawCommissionForLastMonth)
  
  
  
  
  
  
     // ---------------------FILTER COMMISSIONS FOR TODAY AND ADD ALL COMMISSIONS FOR TODAY-----------------------------------------
    
     const filteredCommisionForToday = filteredCommissionsFromTheStart.filter(item => new Date(item.createdAt).toLocaleDateString()  == new Date().toLocaleDateString()) 
     const arenaCommissionSumForToday =  filteredCommisionForToday.map(item => item.commision).reduce((total, current) => total + current, 0)
   
     const allAgentsCommissionToday = arenaCommissionSumForToday * 90 / 100
     const companyCommissionValue = arenaCommissionSumForToday  * 10 / 100
  
     
  
     
  
     setCompanyCommissionForToday(companyCommissionValue)
     setCommissionsToday(allAgentsCommissionToday)
  
  //--------------------------------------Company Earnings From the Start-------------------------------------
  
     const companyEarningsFromTheStart = filteredCommissionsFromTheStart.map(item => item.commision).reduce((total, current) => total + current, 0)
        console.log('fromthestart',companyEarningsFromTheStart)
        setCompanyCommissionFromTheStart(companyEarningsFromTheStart.toFixed(2))
  
  
     // ---------------------FILTER COMMISSIONS FOR THIS MONTH AND ADD ALL COMMISSIONS FOR THIS MONTH-----------------------------------------
     
  
     const overallCommissionsOfTheMonth = filteredCommisionForThisMonth.map(item => item.commision).reduce((total, current) => total + current, 0);
    //  const companyCommissionOfTheMonth =  overallCommissionsOfTheMonth+ (overallCommissionsOfTheMonth * 10 / 100);
     const adminEarningThisMonth = overallCommissionsOfTheMonth - (overallCommissionsOfTheMonth * 90 / 100)
     const agentsEarningThisMonth = overallCommissionsOfTheMonth * 90 / 100
     setCommissionsForThisMonth(overallCommissionsOfTheMonth.toFixed(2))
    setAdminCommissionForThisMonth(adminEarningThisMonth.toFixed(2))
    setAgentsCommissionForThisMonth(agentsEarningThisMonth.toFixed(2))
   // ---------------------FILTER COMMISSIONS LAST MONTH AND ADD ALL COMMISSIONS FOR THIS MONTH-----------------------------------------
     const overallCommissionsForLastMonth = filteredCommisionForLastMonth.map(item => item.commision).reduce((total, current) => total + current, 0);
    //  const companyCommissionForLastMonth =  overallCommissionsForLastMonth+ (overallCommissionsForLastMonth * 10 / 100);
     const adminEarningLastMonth = overallCommissionsForLastMonth - (overallCommissionsForLastMonth * 90 / 100)
     const agentsEarningLastMonth = overallCommissionsForLastMonth * 90 / 100
     setCommissionsForLastMonth(overallCommissionsForLastMonth.toFixed(2))
     setAdminCommissionForLastMonth(adminEarningLastMonth.toFixed(2))
     setAgentsCommissionForLastMonth(agentsEarningLastMonth.toFixed(2))
    
   
    console.log('Total Commission Objects', objects); // array containing all the retrieved objects from the start
  


 })
.catch((error) => {
  console.error('wtf', error);
});

    //REQUEST TRIGGER
    fetchAllUsersData(user)
    fetchConvertHistories(user) 

   
   
  }, [])


   
 

  // ** Filtered Users
  const getPlayers = storeUsers.users?.filter((x) => x.role?.name == "Player");
  const totalCashOut = storeCashout.cashoutLogs?.filter(
    (x) => x.status == "Approved"
  );

  const getDeactivatedPlayers = storeUsers.users?.filter(
    (x) => x.status == "deactivated"
  );
  const getAgents = storeUsers.users?.filter(
    (x) =>
      x.role?.name == "Master" ||
      x.role?.name == "Sub" ||
      x.role?.name == "Gold" ||
      x.role?.name == "Financer"
  );

  // ** Counts
  const allPointsTotal = storeUsers.users?.map((e) => Number(e.points));
  const playersPointsTotal = getPlayers.map((e) => Number(e.points));
  const agentsPointsTotal = getAgents.map((e) => Number(e.points));
  const agentsCommisionTotal = getAgents.map((e) => Number(e.commision));
  const agentsConvertedCommision = storeConvertCommision.allConvertedComms.map(
    (e) => Number(e.amount)
  );

 
 

  
 
 
  const totalCashOutAmount = totalCashOut?.map((e) => Number(e.amount));
  const totalCashinAmount = storeCashin?.allCashIn?.map((e) =>
    Number(e.amount)
  );

  useEffect(() => {
    dispatch(cashoutLogs());
    dispatch(USERS());
    dispatch(allConvertedComms());
    dispatch(ME(auth.user.id));
    dispatch(allCashIn());
  }, []);

  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="DASHBOARD" />
      <MDBContainer fluid className="px-0 su-first-row">
        <MDBContainer>
          <MDBRow className="mx-0">
            {/* <AvailablePoints
              value={(
                Math.round((storeUsers.me?.points || 0) * 100) / 100
              ).toFixed(2)}
            /> */}

            <StatusCardSmall
              title="Company Commissions"
              // value={(
              //   Math.round((storeUsers.me?.commision || 0) * 100) / 100
              // ).toFixed(2)}
              value={companyCommissionFromTheStart}
            />
            <StatusCardSmall
              title="Agent Available Commissions"
              value={(
                Math.round(sumArray(agentsCommisionTotal) * 100) / 100
              ).toFixed(2)}
            />
            <StatusCardSmall
              title="Total Agent Points"
              value={(
                Math.round(sumArray(agentsPointsTotal) * 100) / 100
              ).toFixed(2)}
            />

            <StatusCardSmall
              title="Agents Converted Commissions"
              value={(
                Math.round(sumArray(agentsConvertedCommision) * 100) / 100
              ).toFixed(2)}
            />
            <StatusCardSmall
              title="Total Players Points"
              value={(
                Math.round(sumArray(playersPointsTotal) * 100) / 100
              ).toFixed(2)}
            />
            <StatusCardSmall title="Draw Earnings" value={drawCommissionFromTheStart ? drawCommissionFromTheStart : 0}/> 
          </MDBRow>
        </MDBContainer> 
      </MDBContainer> 
      <MDBContainer fluid className="px-0 my-3">
        <MDBContainer className="px-0 py-4">
          <MDBRow className="mx-0">
          <StatusCardMedium title="Draw Earnings" value= {drawCommissionForToday} />
            <StatusCardMedium  title="Company Daily Commission"  value={(companyCommissionForToday.toFixed(2))}/>
            <StatusCardMedium title="Agent Daily Commissions" value={(commissionsToday.toFixed(2))} />
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
      <MDBContainer fluid className="px-0 su-third-row">
        <MDBContainer className="px-0">
          <MDBRow className="mx-0 h-100">
            {/* <DatedStatusTable /> */}
            <DatedStatusTable
              regularCommsCurrent={commissionsForThisMonth}
              regularCommsLast={commissionsForLastMonth}
              drawCommsCurrent={drawCommissionForThisMonth}
              drawCommsLast={drawCommissionForLastMonth}
              agentCommsCurrent={agentsCommissionForThisMonth}
              agentCommsLast={agentsCommissionForLastMonth}
              companyCommsCurrent={adminCommissionForThisMonth}
              companyCommsLast={adminCommissionForLastMonth}
            />
            <OtherStatusTable
              systemPoints={(
                Math.round(sumArray(allPointsTotal) * 100) / 100
              ).toFixed(2)}
              activePlayers={getPlayers.length}
              activeAgents={getAgents.length}
              cashIns={(
                Math.round(sumArray(totalCashinAmount) * 100) / 100
              ).toFixed(2)}
              cashOut={(
                Math.round(sumArray(totalCashOutAmount) * 100) / 100
              ).toFixed(2)}
              blockedUsers={getDeactivatedPlayers.length}
            />
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
};

export default AccountantDashboard;
