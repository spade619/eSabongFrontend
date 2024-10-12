// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import toast from "react-hot-toast";
import {
  MDBModalContent,
  MDBModalBody,
  MDBBtn,
  MDBModalDialog,
  MDBModal,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

// ** Utils
import { sumArray } from "../../../utility/utils";
import socketClient from "../../../configs/socketClient";
import { dataAdded } from "../../../redux/slices/socket";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  myCurrentBet,
  setCurrentRoundLoader,
  setBetAmount,
} from "../../../redux/slices/currentRoundBets";

// ** Components
import AnimatedNumber from "../components/AnimatedNumber";

const SidePanelPayoutMobile = ({data}) => {
     
   // Bet Meron Modal
  //  const [centredModalBetMeron , setCentredModalBetMeron ] = useState(false);
  //  const toggleShowBetMeron = () => {
  //      setCentredModalBetMeron (!centredModalBetMeron )
  // }

//   // Bet Wala Modal
//   const [centredModalBetWala , setCentredModalBetWala ] = useState(false);
//   const toggleShowBetWala = () => {
//       setCentredModalBetWala (!centredModalBetWala )
//  }


  // ** Vars
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const arena_id = urlParams.get("arena_id");

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  // ** React States
  const [centredModal, setCentredModal] = useState(false);
  const [teamChoosen, setTeamChoosen] = useState(false);
  const [currentBetState, setCurrentBetState] = useState(0)
  const [allbetData, setallBetData] = useState(0)
  const [fakeBetMeron, setFakeBetMeron] = useState(0)
  const [fakeBetWala, setFakeBetWala] = useState(0)
  const [totalBetLoader, setTotalBetLoader] =useState(true)
  // const [betAmount, setBetAmount] = useState("");
  const [allbuttonDisabler, setAllButtonDisabler] = useState(false)
 
    // // ** Vars
 
  // // ** Redux States

  const [payoutOverallValues, setPayoutOverallValues] = useState('0')
  const [totaBet, setTotalBet] = useState(0)
  const [betValues, setBetValues] = useState();

  // ** Redux States
  const storeUsers = useSelector((state) => state.users);
  const storeCurrentRoundBets = useSelector((state) => state.currentRoundBets);
  const storeRoundStatus = useSelector((state) => state.roundStatus);

  const currentBet = storeCurrentRoundBets.myCurrentBet;
  const currentBetAmount = Number(currentBet.betAmount);
 console.log('currentBetis', currentBet.betAmount )
  // ** useEffects
  useEffect(() => {
    dispatch(myCurrentBet({ arena_id, user_id: auth.user.id }));
    // setTotalBetLoader(false)
    
  }, []);

  

  useEffect(() => {
    
    // if( storeRoundStatus.roundStatus.status === 'standby' ){    
    //   setBetAmount("");
    // }else if(storeRoundStatus.roundStatus.status === 'open'){
    //   setAllButtonDisabler(false)
    // }   
  if( storeRoundStatus.roundStatus.status === 'open' ){ 
    setAllButtonDisabler(false)
  }
   }, [storeRoundStatus.roundStatus.status])

   useEffect(() => {
    if(currentBet?.betAmount !== ''){
      if(currentBet.betAmount > 0){
        // setBetAmount(currentBet.betAmount)
        setAllButtonDisabler(true)
      }
    }

  }, [currentBet])

  

  const toggleShow = (team) => {
  
    
    if (storeCurrentRoundBets.betAmount && team) {
      setTeamChoosen(team);
      setCentredModal(!centredModal);
    } else {
      toast.error("Please enter your betting amount");
    }
  };




  const handleBetting = (team) => {
    setTotalBetLoader(true)
  
    if (storeCurrentRoundBets.betAmount) {
      if (storeUsers.me?.points > storeCurrentRoundBets.betAmount) {
        const data = {
          arena_id,
          user_id: auth.user.id,
          team,
          amount: storeCurrentRoundBets.betAmount,
        };
        setBetValues(data.arena_id)

         dispatch(setCurrentRoundLoader());

         socketClient.emit("betting", data);

         setCentredModal(false);

         socketClient.on("my_current_bet_response", (res) => {
                
          socketClient.emit("get_current_round_bets", { arena_id });
          dispatch(myCurrentBet({ arena_id, user_id: auth.user.id }));
          
          dispatch(
            dataAdded({
              amount: res.amount,
              response: res.response 
            })) 
            // setTotalBetLoader(false)   
            // if(typeof betValues === 'string' && betValues !== ''){}
              
           
           
            // updateOverallBets()
        });
     
       
        // await dispatch(setBetAmount(""));
        
      } else {
        toast.error("Insufficient balance");
        setTotalBetLoader(false)   
      }
    } else {
      toast.error("Please enter your betting amount");
      setTotalBetLoader(false)   
    }
  };


  //refresh total bet when player successfully makes his bet
  const updateOverallBets = () => {
    console.log('looptester')
    
    //  socketClient.emit("get_user_info", auth.user.id);   
    if(typeof betValues === 'string' && betValues !== ''){
     socketClient.emit('getArenaOverallBets', betValues)     
    }   
  }
// ----------------------------------------------------------------------------------


 
  // -----------------------------------TOTAL BET-------------------------------------------

  // const [totalBetLoader, setTotalBetLoader] =useState(false)

  useEffect(() => {
    
  
    
    socketClient.emit('getArenaOverallBetsInitalLoad', arena_id)    

  }, [])



  

  useEffect(() => {
    
    // socketClient.on('self_recieve_all_bets', (respo) => {
    //         console.log('res', respo)
    //   // setallBetData(respo)
    // })    

    socketClient.on("recieve_all_bets", (betData) => {   
    
      setTotalBetLoader(false)
      setallBetData(betData)
      console.log('loopUseEffect',betData)
    })  


  }, [socketClient])

  

  useEffect(() => {

  
socketClient.on('refresh_player_balance', (recieved) => { 

  socketClient.emit('getArenaOverallBets', arena_id)
 })
    
    socketClient.on('refreshDrawBalance', (recieved) => {   
     socketClient.emit('getArenaOverallBets', arena_id)
    })  

    
  }, [socketClient])

  
  // -----------------------------------------------------ROUND PAYOUT COMPONENT--------------------------------------------


  

 

  useEffect(() => {
    if(currentBet?.betAmount !== '' && totaBet?.totalMeron !== '' && totaBet?.totalWala !== '' ){
      calculateRoundPayout(totaBet.totalMeron, 
        totaBet.totalWala, 
        storeRoundStatus.roundStatus.plasadaRate, 
        currentBet.betAmount,
        currentBet.team)
    }
    
    
  }, [currentBet, totaBet])
  
    
  const calculateRoundPayout = (
    meronOverall,
    walaOverall,
    plasada, 
    playerCurrentBet,
    playerCurrentTeam) => {

   
    const  jsonData = {
      team: playerCurrentTeam,
      totalPayout: 0,
    }

    const overallBetSum =  meronOverall + walaOverall
    const totalWinnings = playerCurrentTeam === 'meron' ? ((overallBetSum / meronOverall)  * playerCurrentBet) :
      ((overallBetSum / walaOverall) * playerCurrentBet)
    const  tongAmount = totalWinnings * (plasada / 100)        
    const FinalWinning = totalWinnings  - tongAmount                       
    jsonData.totalPayout = FinalWinning                        
    setPayoutOverallValues(jsonData)
    
  }

  socketClient.emit('fakebetInitial', arena_id) 
  useEffect(() => {
    socketClient.on('recieve_all_bets', (betData) => {   
      const jsonData = {
        totalMeron: betData.totalMeron,
        totalWala: betData.totalWala
      }  
      setTotalBet(jsonData)
  })


  // ------------------------------------------

  socketClient.on('betfake', (newData) => {  
    console.log('this is from the new', newData) 
        // setFakeBet()
    if(newData.totalMeron !==0){
      setFakeBetMeron(newData.totalMeron)
    }else if(newData.totalWala !== 0){
        setFakeBetWala(newData.totalWala)
    }
  

  })

// 000000000000000000000000000000000000000000000000000000000000
  socketClient.on('fakeBetInitialLoad', (initalData)=> {

    //fakebet for meron
const filteredMeronAmount = [];
let allMeronsum = 0;
initalData.filter((meronNumberData) => {
// Filter condition
return meronNumberData.team  === 'meron';
}).forEach((filteredNumber) => {
// Push filtered numbers to a new array
filteredMeronAmount.push(parseInt(filteredNumber.amount));
});

filteredMeronAmount.forEach((number) => {
allMeronsum += number;
});
console.log('this is added fakebet', allMeronsum)
setFakeBetMeron(allMeronsum *5)

// --------------------------------------------------------------

const filteredWalaAmount = [];
let allWalasum = 0;
initalData.filter((walaNumberData) => {
// Filter condition
return walaNumberData.team  === 'wala';
}).forEach((filteredNumber) => {
// Push filtered numbers to a new array
filteredWalaAmount.push(parseInt(filteredNumber.amount));
});

filteredWalaAmount.forEach((number) => {
allWalasum += number;
});
console.log('this is added fakebet wala', allWalasum)
setFakeBetWala(allWalasum *5)
    
})
  }, [socketClient])

  return (
    <MDBCol>
      {/* Confimation Modal */}
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="sm">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBModalBody>
              <p className="text-white text-center mb-4">
                Are you sure to place your bet on {teamChoosen}?
              </p>
              <div className="d-flex justify-content-center">
                <MDBBtn
                  color="secondary"
                  className="mx-3"
                  size="sm"
                  onClick={() => setCentredModal(false)}
                >
                  Cancel
                </MDBBtn>
                <MDBBtn
                  size="sm"
                  color={teamChoosen === "meron" ? "danger" : "primary"}
                  onClick={() => handleBetting(teamChoosen)}
                >
                  Place Bet {teamChoosen}
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBContainer fluid className="p-3 sppayout-container position-relative">
        <MDBRow>
          <MDBCol size={6} sm={6} md={12} className="p-0 px-2">
            <MDBContainer fluid className="p-0">
              <MDBContainer
                fluid
                role="button"
                className={`px-0 py-1 sppayout-btn sppayout-btn-meron`}
              >
                <MDBTypography tag="h4" className="text-center m-0">
                  MERON
                </MDBTypography>
              </MDBContainer>
              <MDBContainer fluid className="p-0 sppayout-btn-content">
                <MDBRow className="d-flex align-items-center flex-column">
                  <MDBCol>
                    <h6
                      style={{ color: "#d6ff17", fontWeight: "bolder" }}
                      className="my-1 text-center"
                    >
                      {/* <AnimatedNumber
                        value={storeCurrentRoundBets.totalMeron}
                      /> */}

                        <AnimatedNumber
                     
                      // value={allbetData ? (Number(allbetData.totalMeron)):(0)}
                      value={allbetData ? (Number(allbetData.totalMeron+fakeBetMeron)):(0)}
                    />
                    
                    </h6>
                  </MDBCol>
                  <MDBCol>
                    <div className="sppayout-bets  text-center">
                      {totalBetLoader ? ( updateOverallBets(),
                        <div className="d-flex justify-content-center">
                          <MDBSpinner
                            role="status"
                            size="sm"
                            color="light"
                            grow
                          >
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>
                        </div>
                      ) : ( 
                        <span className="text-white fw-bolder">
                          PAYOUT:{" "}
                          {/* {currentBetState?.team === "meron"
                            ? (
                                Math.round(
                                  (currentBetState?.totalPayout || 0) * 100
                                ) / 100
                              ).toFixed(2)
                            : 0} */}
                            <AnimatedNumber                
                    value={
                      payoutOverallValues ? (payoutOverallValues?.team === "meron" ? payoutOverallValues?.totalPayout : 0) : (0)
                    }
                  />
                        </span>
                      )}
                    </div>
                  </MDBCol>
                  {/* <MDBCol>
                    <p
                      style={{ color: "#72ff00", fontWeight: "bolder" }}
                      className="text-center m-0"
                    >
                      01
                    </p>
                  </MDBCol> */}
                  {/* <MDBCol>
                    <p
                      style={{ color: "#3f51db", fontWeight: "bolder" }}
                      className="text-center m-0"
                    >
                      {totalBetLoader ? (
                        <div className="d-flex justify-content-center">
                          <MDBSpinner
                            role="status"
                            size="sm"
                            color="light"
                            grow
                          >
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>
                        </div>
                      ) : currentBetState?.team === "meron" ? (
                        (Math.round(currentBetAmount * 100) / 100).toFixed(2)
                      ) : (
                        0
                      )}
                      
                    </p>
                  </MDBCol> */}
                  <MDBCol center className="text-center">
                    {storeCurrentRoundBets.currentRoundLoader ? 
                      ( <div className="d-flex justify-content-center">
                      <MDBSpinner role="status" color="light" grow>
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                     ) : (  
                    <button
                      className="spbets-btn-container p-2 my-2"
                      role="button"
                      disabled={
                        // storeRoundStatus.roundStatus.status === "close" ? true : false
                        storeRoundStatus.roundStatus.status === "close" || storeRoundStatus.roundStatus.status === "standby" || allbuttonDisabler === true ? true : false 
                      }
                      onClick={() => toggleShow("meron")}
                      // onClick={toggleShowBetMeron}
                       
                    >
                      <div className="spbets-btn-meron">
                        <MDBTypography tag="h4" className="m-0" >
                          "BET MERON"
                        </MDBTypography>
                      </div>
                    </button>
                       ) }

                       
                    {/* meron cofirmation modal */}
       {/* <MDBModal tabIndex='-1' show={centredModalBetMeron} setShow={setCentredModalBetMeron}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle> <MDBIcon fas icon="cogs" className="pe-3"/> Are you sure you want to bet on MERON?</MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={toggleShowBetMeron}></MDBBtn>
            </MDBModalHeader>
            
            <MDBModalFooter className="justify-content-center text-center pe-5">
              <MDBBtn className='pe-5 ps-5 me-4' onClick={() => toggleShow("meron")}>
                Yes
              </MDBBtn>
              <MDBBtn className='pe-5 ps-5 ms-4' onClick={toggleShowBetMeron}>No</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> */}

      {/* ------------------------------------------------------------------------------------- */}

                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBContainer>
          </MDBCol>
          <MDBCol size={6} sm={6} md={12} className="p-0 px-2">
            <MDBContainer fluid className="p-0">
              <MDBContainer
                fluid
                role="button"
                className="px-0 py-1 sppayout-btn sppayout-btn-wala"
              >
                <MDBTypography tag="h4" className="text-center m-0">
                  WALA
                </MDBTypography>
              </MDBContainer>

              <MDBContainer fluid className="p-0 sppayout-btn-content">
                <MDBRow className="d-flex align-items-center flex-column">
                  <MDBCol className="p-0">
                    <h6
                      style={{ color: "#d6ff17", fontWeight: "bolder" }}
                      className="my-1 text-center"
                    >
                      {/* <AnimatedNumber value={storeCurrentRoundBets.totalWala} /> */}

                      <AnimatedNumber
                      
                      // value={allbetData ? (Number(allbetData.totalWala)):(0)}
                      value={allbetData ? (Number(allbetData.totalWala+fakeBetWala)):(0)}
                    />
                    </h6>
                  </MDBCol>
                  <MDBCol>
                    <div className={`sppayout-bets text-center`}>
                      {totalBetLoader ? (
                        <div className="d-flex justify-content-center">
                          <MDBSpinner
                            role="status"
                            size="sm"
                            color="light"
                            grow
                          >
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>
                        </div>
                      ) : (
                        <span className="text-white fw-bolder">
                          PAYOUT:{" "}
                          {/* {currentBet?.team === "wala"
                            ? (
                                Math.round(
                                  (currentBet?.totalPayout || 0) * 100
                                ) / 100
                              ).toFixed(2)
                            : 0} */}

                  <AnimatedNumber
                      value={
                        payoutOverallValues ? (payoutOverallValues?.team === "wala" ? payoutOverallValues?.totalPayout : 0) : (0)
                    }
                  />
                
                        </span>
                      )}
                    </div>
                  </MDBCol>
                  {/* <MDBCol>
                    <p
                      style={{ color: "#72ff00", fontWeight: "bolder" }}
                      className="text-center m-0"
                    >
                      01
                    </p>
                  </MDBCol> */}
                  {/* <MDBCol>
                    <p
                      style={{ color: "#3f51db", fontWeight: "bolder" }}
                      className="text-center m-0"
                    >
                      {totalBetLoader ? (
                        <div className="d-flex justify-content-center">
                          <MDBSpinner
                            role="status"
                            size="sm"
                            color="light"
                            grow
                          >
                            <span className="visually-hidden">Loading...</span>
                          </MDBSpinner>
                        </div>
                      ) : currentBet?.team === "wala" ? (
                        (Math.round(currentBetAmount * 100) / 100).toFixed(2)
                      ) : (
                        0
                      )}
                      
                    </p>
                  </MDBCol> */}
                  <MDBCol center className="text-center">


                  {storeCurrentRoundBets.currentRoundLoader ? 
                      ( <div className="d-flex justify-content-center">
                      <MDBSpinner role="status" color="light" grow>
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                     ) : (  
                    <button
                      className="spbets-btn-container p-2 my-2"
                      role="button"
                      disabled={
                        // storeRoundStatus.roundStatus.status === "close"
                        //   ? true
                        //   : false
                          storeRoundStatus.roundStatus.status === "close" || storeRoundStatus.roundStatus.status === "standby" || allbuttonDisabler === true ? true : false 
                      }
                      onClick={() => toggleShow("wala")}
                      // onClick={toggleShowBetWala}
                         
                    >
                      <div className="spbets-btn-wala">
                        <MDBTypography tag="h4" className="m-0" >
                          "BET WALA"
                        </MDBTypography>
                      </div>
                    </button>
                          )}

                    {/* wala cofirmation modal */}
       {/* <MDBModal tabIndex='-1' show={centredModalBetWala} setShow={setCentredModalBetWala}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle> <MDBIcon fas icon="cogs" className="pe-3"/> Are you sure you want to bet on WALA? </MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={toggleShowBetWala}></MDBBtn>
            </MDBModalHeader>
            
            <MDBModalFooter className="justify-content-center text-center pe-5">
              <MDBBtn className='pe-5 ps-5 me-4' onClick={() => toggleShow("wala")}>
                Yes
              </MDBBtn>
              <MDBBtn className='pe-5 ps-5 ms-4' onClick={toggleShowBetWala}>No</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal> */}

      {/* ------------------------------------------------------------------------------------- */}
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCol>
  );
};

export default SidePanelPayoutMobile;
