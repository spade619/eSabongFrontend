// ** Third Party Components
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

// ** React
import { useEffect, useState } from "react";

// ** Utils
import { sumArray } from "../../../../../utility/utils";

// ** Components
import CommsByDateCard from "../../../../../components/dashboard/cards/comms-by-date";
import CommsByDateHeader from "../../../../../components/dashboard/cards/comms-by-date-header";
import CommsByDateTable from "../../../../../components/dashboard/cards/tables/comms-by-date";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  agentCommission,
  regularCommission,
  grossCommision,
  companyCommissions,
  drawCommission,
} from "../../../../../redux/slices/commissionHistory";

const AcctCommissionsByDate = () => {
  const dispatch = useDispatch();

  // ** States
  const storeCommissionHistory = useSelector(
    (state) => state.commissionHistory
  );



  const [allsersData, setUsersData] = useState(null)
  const [convertedCommissionsState, setConvertedCommissionsState] = useState(null)
  const [superAdmin, setSuperAdmin] = useState(0)
  
  const [companyCommissionFromTheStart, setCompanyCommissionFromTheStart] = useState(0)
  const [drawCommissionFromTheStart, setDrawCommissionFromTheStart] = useState(0)
  const [grossCommisions, setGrossCommisions] = useState(0)

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
  
 
  
useEffect(() => {
 // --------------------------------------------------------GROSS COMMISSIONS------------------------------------------
 const companyAndDrawCommssionFromStart = ((companyCommissionFromTheStart*100)/100) + ((drawCommissionFromTheStart*100)/100)
  setGrossCommisions(companyAndDrawCommssionFromStart.toFixed(2))
  console.log('this is the grossComnmisisossionStart', grossCommisions)
}, [grossCommisions, companyCommissionFromTheStart, drawCommissionFromTheStart])


   
  // ** Counts
  const agentComms = storeCommissionHistory?.agentCommission?.map((e) =>
    Number(e.commision)
  );

  const regularComms = storeCommissionHistory?.regularCommission?.map((e) =>
    Number(e.commision)
  );

  const grossComms = storeCommissionHistory?.grossCommision?.map((e) =>
    Number(e.commision)
  );

  const drawComms = storeCommissionHistory?.drawCommission?.map((e) =>
    Number(e.commision)
  );

  useEffect(() => {
    dispatch(agentCommission());
    dispatch(regularCommission());
    dispatch(grossCommision());
    dispatch(companyCommissions());
    dispatch(drawCommission());
  }, []);

  return (
    <MDBContainer fluid className="px-0 pb-3 dashboard-bg">
      <DashboardTopNavigation title="COMMISSIONS / Commission By Date" />
      <MDBRow className="mx-0">
        <CommsByDateCard
          xxl={6}
          xl={6}
          lg={8}
          md={8}
          sm={12}
          size={12}
          title="Company Commissions"
          sub="Net Company Commission"
          icon="building"
          // value={(
          //   Math.round(
          //     (storeCommissionHistory.companyCommissions?.commision || 0) * 100
          //   ) / 100
          // ).toFixed(2)}
          value={companyCommissionFromTheStart}
        />

        <CommsByDateCard
          title="Regular Commissions"
          sub="This is the Commission Earned from Meron / Wala Bets"
          icon="box"
          // value={(Math.round(sumArray(regularComms) * 100) / 100).toFixed(2)}
            value={companyCommissionFromTheStart}
        />
        <CommsByDateCard
          title="Draw Commissions"
          sub="This is Commission Earned from Draw Bets"
          icon="box-open"
          // value={(Math.round(sumArray(drawComms) * 100) / 100).toFixed(2)}
          value={drawCommissionFromTheStart ? drawCommissionFromTheStart : 0}
        />
        <CommsByDateCard
          title="Gross Commissions"
          sub="This is the sum of Regular and Draw Commission"
          icon="gem"
          // value={(Math.round(sumArray(grossComms) * 100) / 100).toFixed(2)}
         
           value={grossCommisions}
        />

        <CommsByDateCard
          title="Agent Commissions"
          sub="Agent Commission from Player Bets"
          icon="user-tie"
          value={(Math.round(sumArray(agentComms) * 100) / 100).toFixed(2)}
        />
      </MDBRow>
      <CommsByDateHeader />
      <CommsByDateTable />
    </MDBContainer>
  );
};

export default AcctCommissionsByDate;
