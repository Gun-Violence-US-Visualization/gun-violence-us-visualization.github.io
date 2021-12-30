import React from 'react';
import Map from './Map';
import Mouse from './Mouse'
import Title from './Title'
import ControlBar from './ControlBar'
import SubPage from './SubPage'
// import Statistics from './Statistics'
import Profile from './Profile'

function App() {

  const [data1, setData1] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  const [data4, setData4] = React.useState([]);

  // const [select, setSelect] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [scaleData, setScaleData] = React.useState(900);
  const [pace, setPace] = React.useState(12);
  const [offset, setOffset] = React.useState([]);

  const [selectCases, setSelectCases] = React.useState(true);
  const [selectPolicy, setSelectPolicy] = React.useState(true);
  const [selectGunRate, setSelectGunRate] = React.useState(false);
  const [selectVote, setSelectVote] = React.useState(false);


  React.useEffect(() => {
    (async () => {
      const res1 = await fetch('./policy.json')
      const data1 = await res1.json();
      setData1(data1);
      console.log(data1.total);

      const res2 = await fetch('./policy.json')
      const data2 = await res2.json();
      setData2(data2);

      const res3 = await fetch('./cases.geojson')
      const data3Combine = await res3.json();
      const data3 = data3Combine.features;
      setData3(data3);

      // const res4 = await fetch('./colorTest4.json')
      // const data4 = await res4.json();
      // setData4(data4);

      // setSelect([true, true, true, true])

      setSelectCases(true)
      setSelectPolicy(true)
      setSelectGunRate(false)
      setSelectVote(false)

      setLoading(false);

      setScaleData(900);

      setPace(12);

      setOffset([50, 50])
    })();
  }, []);

  const scaleBig = () => {

    // let scale = 900+(event.target.value-50)*15;
    setScaleData(1300);
    setPace(1.5);
    console.log(scaleData)
    setOffset([250, 350])

  }

  const scaleSmall = () => {

    // let scale = 900+(event.target.value-50)*15;
    setScaleData(600);
    setPace(15.0);
    console.log(scaleData)
    setOffset([50, 100])

  }

  const scaleOrigin = () => {

    // let scale = 900;
    setScaleData(900);
    setPace(12.0);
    console.log(scaleData)
    setOffset([0, 0])

  }

  const selectChangeGunRate = () => {
    if (selectGunRate) {
      setSelectGunRate(false)
      // setSelectPolicy(true)
    } else {
      setSelectGunRate(true)
      if(setSelectPolicy){
        setSelectPolicy(false)
      }
    }
  }

  const selectChangePolicy = () => {
    if (selectPolicy) {
      setSelectPolicy(false)
      // setSelectGunRate(true)
    } else {
      setSelectPolicy(true)
      if (selectGunRate){
      setSelectGunRate(false)
      }
    }
  }

  const selectChangeCases = () => {
    if (selectCases) {
      setSelectCases(false)
    } else {
      setSelectCases(true)
    }
  }

  const selectChangeVote = () => {
    if (selectVote) {
      setSelectVote(false)
    } else {
      setSelectVote(true)
    }
  }

  console.log(`AppTrigger`)
  // console.log(select[0])

  return (
    <div className="App">
      <header className="App-header" id="App-header">
        <Title />
        <div className="HideOverFlow">
          <Mouse>
            {({ x, y }) => (
              <div className="Map-container">
                <div
                  style={{
                    position: 'absolute',
                    top: -y / pace + offset[0],
                    left: -x / pace + offset[1]
                  }}>
                  {loading && <div>loading</div>}
                  {!loading && <Map
                    data1={data1}
                    data2={data2}
                    data3={data3}
                    // data4={data4}
                    scaleSend={scaleData}
                    selectCases={selectCases}
                    selectPolicy={selectPolicy}
                    selectGunRate={selectGunRate}
                    selectVote={selectVote}
                    className="Map"
                  />}
                </div>
              </div>
            )}
          </Mouse>
        </div>
        <ControlBar
          selectCases={selectCases}
          selectPolicy={selectPolicy}
          selectGunRate={selectGunRate}
          selectVote={selectVote}
          clickEventsCases={selectChangeCases}
          clickEventsPolicy={selectChangePolicy}
          clickEventsGunRate={selectChangeGunRate}
          clickEventsVote={selectChangeVote}
          // scaleChange={scaleChange}
          scaleBig={scaleBig}
          scaleSmall={scaleSmall}
          scaleOrigin={scaleOrigin}
        />

        {/* <Statistics/> */}
        <Profile />
        

        
          {selectCases && !selectPolicy && !selectGunRate && !selectVote && <SubPage />}
        {/* </div> */}


      </header>
    </div>
  );
}

export default App;