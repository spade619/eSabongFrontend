import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./index.css";
import Slider from "react-slick";
import meron from "../../../assets/images/landing/overview/meron.png";
import wala from "../../../assets/images/landing/overview/wala.png";
import intro from "../../../assets/images/landing/overview/intro.mp4";
import avatar from "../../../assets/images/landing/overview/avatar.png";
import { useNavigate } from "react-router-dom";

const LandingOverview = () => {
  const [slidesCounts, setSlidesCount] = useState(1);
  const [liveArenas, setLiveArenas] = useState([])
  const [liveArenaFirstIdx, setLiveArenaFirstIdx] = useState({})
  const [gameHistoriesRecieved, setGameHistoriesRecieved] = useState([])
  const [allMeronOutcome, setAllMeronOutcome] = useState(0)
  const [updatedMeronOutcome, setUpdatedMeronOutcome] = useState(0)
  const [allWalaOutcome, setAllWalaOutcome] = useState(0)
  const [updatedWalaOutcome, setUpdatedWalaOutcome] = useState(0)
  const [durationTimeline, setDurationTimeline] = useState({})
  const [updatedDurationTimeline, setUpdatedDurationTimeline] = useState({})
  const [betHistoriesRecieved, setBetHistoriesRecieved] = useState([])
  const [arenaTotalEarning, setArenaTotalEarning] = useState(0)
  const [updatedGameReportArena, setUpdatedGameReportArena] = useState({})
  const [updateEnabler, setUpdateEnabler] = useState(false)
  const [arenaTotalEarningUpdate, setArenaTotalEarningUpdate] = useState(0)
  const [gamesFinishDownload, setGamesFinishDownload] = useState(false)
  const [betsFinishDownload, setBetsFinishDownload] = useState(false)
  const [downloadFinish, setDownloadFinish] = useState(false)

  const navigate = useNavigate();

  // console.log('firstArena', liveArenaFirstIdx)
  // console.log('livearenalegnth',liveArenas.length)
  // console.log('allGameHistory', gameHistoriesRecieved)
  console.log('this is the bet history', betHistoriesRecieved)
  console.log('this is the game history', gameHistoriesRecieved)
  console.log('this is the arenas', liveArenas)

  useEffect(() => {
    if(gamesFinishDownload && betsFinishDownload){
      setDownloadFinish(true)
    }
  
  
  }, [gamesFinishDownload,betsFinishDownload])
  

  // get game history for meron and wala outcomes
  const limit = 100;
  let offset = 0; // starting index of the first object to retrieve
  let objects = []; // array to hold all the retrieved objects
  

  const fetchGameHistory = async(arenaid) => {
       
 const fetchGameHistories = async() => {
  
 
  const allGameHistory = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `game-histories?_sort=createdAt:DESC&_limit=${limit}&_start=${offset}`, {
   
    // headers: {'Authorization': `Bearer ${user.jwt}`}, 
      })
    const allGameHistoryResponse = await allGameHistory.json() 
        
    if(allGameHistory.ok) {
      objects = objects.concat(allGameHistoryResponse)
      offset += limit 
      if(allGameHistoryResponse.length === limit){
     //   const users = JSON.parse(localStorage.getItem('auth'))
        await fetchGameHistories() //fetch the next page recursively if objects are more than 100
      }

  
    }
}


fetchGameHistories()
.then(() => {
 
  setGameHistoriesRecieved(objects)

  const filteredArenaForReport = objects.filter((arenaOutcome) => {
    return arenaOutcome.arena_id.id === arenaid
  
 })

 const filteredMeronForReport = filteredArenaForReport.filter((MeronOutcome) => {
  return MeronOutcome.outcome === 'meron'

})

const filteredWalaForReport = filteredArenaForReport.filter((WalaOutcome) => {
  return WalaOutcome.outcome === 'wala'

})
      console.log('walafortesting', filteredWalaForReport)
  setAllMeronOutcome(filteredMeronForReport.length)
  setAllWalaOutcome(filteredWalaForReport.length)

 console.log('this is the given arena', filteredArenaForReport)
  setGamesFinishDownload(true)
})
.catch((error) => {
  console.error('wtf', error);
});
  
 
}


// ------------------------------------------------------------------------------------------------------------------------------------------

// get betting logs to see overall bets on meron and wala


const betlimit = 100;
let betoffset = 0; // starting index of the first object to retrieve
let betobjects = []; // array to hold all the retrieved objects

const fetchBetHistory = async(betarenaid) => {
     
const fetchBetHistories = async() => {


const allBetHistory = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `betting-logs?_sort=createdAt:DESC&_limit=${betlimit}&_start=${betoffset}`, {
 
  // headers: {'Authorization': `Bearer ${user.jwt}`}, 
    })
  const allBetHistoryResponse = await allBetHistory.json() 
      
  if(allBetHistory.ok) {
  
    betobjects = betobjects.concat(allBetHistoryResponse)
    betoffset += betlimit 
    if(allBetHistoryResponse.length === betlimit){
   //   const users = JSON.parse(localStorage.getItem('auth'))

      await fetchBetHistories() //fetch the next page recursively if objects are more than 100
   
    }
    


  }
}


fetchBetHistories()
.then(() => {

setBetHistoriesRecieved(betobjects)


const filteredBetsForReport = betobjects.filter((arenaBets) => {
  return arenaBets.arena_id.id === betarenaid

})


const numbersArray = [];
filteredBetsForReport.map(function(number) {
  numbersArray.push(number.betAmount);
});

console.log('this is all the amount of bet', numbersArray)
function addStringedNumbers(arr) {
  return arr.reduce(function(total, current) {
    const num = parseInt(current);
    if (!isNaN(num)) {
      return total + num;
    } else {
      console.log(`Ignoring non-numeric value: ${current}`);
      return total;
    }
  }, 0);
}

const result = addStringedNumbers(numbersArray);

setArenaTotalEarning(result)

setBetsFinishDownload(true)


})
.catch((error) => {
console.error('wtf', error);
});


}


useEffect(() => {
  
  if(liveArenas.length > 0){
     fetchGameHistory(liveArenaFirstIdx.id)
    fetchBetHistory(liveArenaFirstIdx.id)  
  }
  
}, [liveArenas])

  


  useEffect(() => {
    
    const fetchArenas = async() => {
  
      const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `arenas`, {
     
  
        
    })
  
      const json = await response.json()
        
       
    
  
        if(response.ok) {
         // console.log('arenas', json)
       //   setArenas(json)
       const filteredArenas = json.filter((arena) => {
         return arena.isDeleted === false
       
      })
      console.log('filteredArena', filteredArenas)
      if(filteredArenas.length == 1){
        setSlidesCount(1)
      }else if(filteredArenas.length == 2){
        setSlidesCount(2)
      }else{
        setSlidesCount(3)
      }
      setLiveArenas(filteredArenas)
      setLiveArenaFirstIdx(filteredArenas[0])

      
    //  calculate the duration of days from the start of the arena creation
  const givenDate = new Date(filteredArenas[0].createdAt); 
  const today = new Date();
  

  const timeDifferenceInMs = today - givenDate;
  const duration = {
    days: Math.floor(timeDifferenceInMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifferenceInMs / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeDifferenceInMs / (1000 * 60)) % 60),
    seconds: Math.floor((timeDifferenceInMs / 1000) % 60)
  };

  setDurationTimeline(duration)


        }
  
    }
    
    fetchArenas()
  


  }, [])
  

  useEffect(() => {
    const size = window.innerWidth;
    if (size < 992) {
      setSlidesCount(1);
    } else if (size < 1200) {
      setSlidesCount(2);
    }
  }, [window.innerWidth]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesCounts,
    slidesToScroll: 1,
    arrows: false,
  };





const handleArena=(arenaId) =>{
  setUpdateEnabler(true)
  console.log('this is the arena id', arenaId)
  const filteredUpdatedArena = liveArenas.filter((arena) => {
    return arena.id === arenaId
  
  })

  const filteredUpdatedGame = gameHistoriesRecieved.filter((games) => {
    return games.arena_id.id === arenaId
  
  })

  const filteredMeronForUpdate = filteredUpdatedGame.filter((MeronOutcome) => {
    return MeronOutcome.outcome === 'meron'
  
  })
  
  const filteredWalaForUpdate = filteredUpdatedGame.filter((WalaOutcome) => {
    return WalaOutcome.outcome === 'wala'
  
  })


  const givenDate = new Date(filteredUpdatedArena[0].createdAt); 
  const today = new Date();
  

  const timeDifferenceInMs = today - givenDate;
  const duration = {
    days: Math.floor(timeDifferenceInMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifferenceInMs / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeDifferenceInMs / (1000 * 60)) % 60),
    seconds: Math.floor((timeDifferenceInMs / 1000) % 60)
  };





  const filteredBetsForUpdate = betHistoriesRecieved.filter((arenaBets) => {
    return arenaBets.arena_id.id === arenaId
  
  })
  
  
  const numbersArray = [];
  filteredBetsForUpdate.map(function(number) {
    numbersArray.push(number.betAmount);
  });
  
  console.log('this is all the amount of bet', numbersArray)
  function addStringedNumbers(arr) {
    return arr.reduce(function(total, current) {
      const num = parseInt(current);
      if (!isNaN(num)) {
        return total + num;
      } else {
        console.log(`Ignoring non-numeric value: ${current}`);
        return total;
      }
    }, 0);
  }
  
  const result = addStringedNumbers(numbersArray);
  


  console.log('clicked arena', filteredUpdatedArena)
  setArenaTotalEarningUpdate(result)
  setUpdatedDurationTimeline(duration)
  setUpdatedGameReportArena(...filteredUpdatedArena)
  setUpdatedMeronOutcome(filteredMeronForUpdate.length)
  setUpdatedWalaOutcome(filteredWalaForUpdate.length)
  console.log('clicked arena again', updatedGameReportArena)
  console.log('clicked arena bets', filteredUpdatedGame)
}


  return (
    <MDBContainer
      id="reports"
      fluid
      className="px-0 section-size-2 d-flex align-items-center"
    >
      <MDBContainer className="">
        <MDBContainer fluid className="px-0 lo-panel mt-3">
          <MDBRow className="mx-0">
            <MDBCol
              xxl={6}
              xl={6}
              lg={5}
              md={3}
              className="d-flex align-items-center"
            >
              <MDBTypography
                tag="h4"
                className="m-0 px-2 px-lg-4 px-xl-5 py-3 lo-draw-earnings"
              > 
               Arena Earnings:        {downloadFinish?(updateEnabler?arenaTotalEarningUpdate:arenaTotalEarning):
               <div className="spinner-border text-center" role="status">
               <span className="visually-hidden">Loading...</span>
             </div>}
             
              </MDBTypography>
            </MDBCol>
            <MDBCol xxl={6} xl={6} lg={7} md={9}>
              <MDBContainer
                fluid
                className="px-0 lo-timer-panel d-flex align-items-center"
              >
                <div className="lo-timer lo-timer-days">
                  <MDBTypography tag="h6" className="m-0">
                    {updateEnabler?updatedDurationTimeline.days:durationTimeline.days}
                  </MDBTypography>
                  <span>Days</span>
                </div>
                <div className="lo-timer lo-timer-hrs">
                  <MDBTypography tag="h6" className="m-0">
                    {updateEnabler?updatedDurationTimeline.hours:durationTimeline.hours}
                  </MDBTypography>
                  <span>Hours</span>
                </div>
                <div className="lo-timer lo-timer-mins">
                  <MDBTypography tag="h6" className="m-0">
                  {updateEnabler?updatedDurationTimeline.minutes:durationTimeline.minutes}
                  </MDBTypography>
                  <span>Minutes</span>
                </div>
                <div className="lo-timer lo-timer-secs">
                  <MDBTypography tag="h6" className="m-0">
                  {updateEnabler?updatedDurationTimeline.seconds:durationTimeline.seconds}
                  </MDBTypography>
                  <span>Seconds</span>
                </div>
                <div className="">
                  <MDBBtn className="lo-timer-btn shadow-0 "  onClick={() => navigate("/login")}>Bet Now</MDBBtn>
                </div>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer fluid className="px-0 lo-report-container my-5">
          <MDBRow className="mx-0 px-0">
            <MDBCol xxl={6} xl={6} lg={6}>
              <MDBContainer fluid className="px-0">
                <MDBTypography tag="h3" className="lo-report-title">
                  GAME REPORT
                </MDBTypography>
                <div className="lo-result-container py-3 py-lg-5 px-0">
                  <MDBContainer
                    fluid
                    className="px-0 text-center mb-2 lo-result-date"
                  >
                    <h4>{updateEnabler ? updatedGameReportArena.eventName:liveArenaFirstIdx.eventName}</h4>
                    <span>{updateEnabler? new Date(updatedGameReportArena.createdAt).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }):
                    new Date(liveArenaFirstIdx.createdAt).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                  </MDBContainer>
                  <MDBRow className="mx-0 my-4 h-100">
                    <MDBCol size={6}>
                      <MDBContainer
                        fluid
                        className="px-0 d-flex align-items-center justify-content-center"
                      >
                        <img
                          src={meron}
                          alt="alt"
                          className="img-fluid me-lg-4 me-1"
                        />
                        <div className="text-center">
                          <MDBTypography
                            tag="h1"
                            className="lo-result-score m-0 pt-2 lo-result-win"
                          >
                            {downloadFinish?(updateEnabler?updatedMeronOutcome:allMeronOutcome):
                            (<div className="spinner-border text-center" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>)}
                          </MDBTypography>
                          <div className="lo-result-score-label">Meron</div>
                        </div>
                      </MDBContainer>
                    </MDBCol>
                    <MDBCol size={6}>
                      <MDBContainer
                        fluid
                        className="px-0 d-flex align-items-center justify-content-center"
                      >
                        <div className="text-center">
                          <MDBTypography
                            tag="h1"
                            className="lo-result-score m-0 pt-2"
                          >
                            {downloadFinish?(updateEnabler?updatedWalaOutcome:allWalaOutcome)
                            
                            :
                            
                          ( <div className="spinner-border text-center" role="status">
                          <span className="visually-hidden">Loading...</span>
                          </div>)}
                          </MDBTypography>
                          <div className="lo-result-score-label">Wala</div>
                        </div>

                        <img
                          src={wala}
                          alt="alt"
                          className="img-fluid ms-lg-4 ms-1"
                        />
                      </MDBContainer>
                    </MDBCol>
                  </MDBRow>
                  <MDBContainer fluid className="px-0 text-center mt-3">
                    <MDBBtn className="lo-btn-readmore shadow-0">
                      Draws
                    </MDBBtn>
                  </MDBContainer>
                </div>
              </MDBContainer>
            </MDBCol>
            <MDBCol xxl={6} xl={6} lg={6}>
              <div className="lo-report-vid-container p-2 d-flex align-items-center h-100">
                <video width="100%" height="100%" controls autoPlay={false}>
                  <source src={intro} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer fluid className="px-0 pb-5 mt-5">
          <Slider {...settings}>
            {liveArenas.map((arena, i) => (
              <MDBCol className="px-3 mx-0" key={`overview-card-${i}`} onClick={() => handleArena(arena.id)}>
                <div className="overview-card py-3 d-flex align-items-center justify-content-center">
                  <div className="overview-card-img me-3">
                    <img src={avatar} alt="avatar" className="img-fluid" />
                  </div>
                  <div className="overview-card-details">
                    
                    <div className="overview-card-title">
                      ARENA {i + 1}
                    </div>
                    <div className="overview-card-sub">{arena.eventName}</div>
                    <div className="overview-card-date">{new Date(arena.createdAt).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                  </div>
                </div>
              </MDBCol>
            ))}
          </Slider>
          {/* <Slider {...settings}>
            {dummyArr.map((arena, i) => (
              <MDBCol className="px-3 mx-0" key={`overview-card-${i}`}>
                <div className="overview-card py-3 d-flex align-items-center justify-content-center">
                  <div className="overview-card-img me-3">
                    <img src={avatar} alt="avatar" className="img-fluid" />
                  </div>
                  <div className="overview-card-details">
                    <div className="overview-card-sub">testArenaTitle</div>
                    <div className="overview-card-title">
                      ARENA {i + 1}
                    </div>
                    <div className="overview-card-date">April 17, 2018</div>
                  </div>
                </div>
              </MDBCol>
            ))}
          </Slider> */}
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
};

export default LandingOverview;
