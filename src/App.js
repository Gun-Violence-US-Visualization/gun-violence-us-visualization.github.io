import React from 'react';
import Map from './Map';
import Mouse from './Mouse'
import Title from './Title'
import ControlBar from './ControlBar'
import SubPage from './SubPage'
import HelloMessage from './SearchBar';
import ChartExample from './ChartExample'


function App() {

  const [data1, setData1] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  const [data4, setData4] = React.useState([]);
  const [data5, setData5] = React.useState([]);

  const [searchData, setSearchData] = React.useState(null);

  // const [select, setSelect] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [scaleData, setScaleData] = React.useState(900);
  const [pace, setPace] = React.useState(12);
  const [offset, setOffset] = React.useState([]);

  const [selectCases, setSelectCases] = React.useState(true);
  const [selectPolicy, setSelectPolicy] = React.useState(true);
  const [selectGunRate, setSelectGunRate] = React.useState(false);
  const [selectVote, setSelectVote] = React.useState(false);

  const [selectCity, setSelectCity] = React.useState(true);
  const [selectUni, setSelectUni] = React.useState(true);


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

      const res5 = await fetch('./univercity.json')
      const data5Combine = await res5.json();
      const data5 = data5Combine.features;
      setData5(data5);

      setSelectCases(true)
      setSelectPolicy(true)
      setSelectGunRate(false)
      setSelectVote(false)

      setSelectCity(true)
      setSelectUni(true)

      setLoading(false);

      setScaleData(900);

      setPace(12);

      setOffset([50, 50])

      setSearchData(null)

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
      if (setSelectPolicy) {
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
      if (selectGunRate) {
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

  const selectChangeCity = () => {
    if (selectCity) {
      setSelectCity(false)
    } else {
      setSelectCity(true)
    }
  }

  const selectChangeUni = () => {
    if (selectUni) {
      setSelectUni(false)
    } else {
      setSelectUni(true)
    }
  }

  //计算两点（经纬度坐标）相隔距离，返回距离单位为公里（KM）
  function GetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS
    s = Math.round(s * 10000) / 10000;
    return s;
  }


  const findnear = (u) => {
    // var u="University of Tulsa"
    var result = new Array();
    var find = false;
    var findi = 0;
    for(var i=0;i<data5.length;i++){
      if(data5[i].properties.name == u){
        find=true;
        findi=i;
      }
    }
    if(find == false){
      return false;
    }else{
      for(var j=0;j<data3.length;j++){
        if(GetDistance(data5[findi].geometry.coordinates[1],data5[findi].geometry.coordinates[0],data3[j].geometry.coordinates[1],data3[j].geometry.coordinates[0])<500){
          result.push([[data5[findi].geometry.coordinates[0], data5[findi].geometry.coordinates[1]], [data3[j].geometry.coordinates[0], data3[j].geometry.coordinates[1]]])
        }
      }
      setSearchData(result)
      return result;
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
                    data5={data5}
                    scaleSend={scaleData}
                    selectCases={selectCases}
                    selectPolicy={selectPolicy}
                    selectGunRate={selectGunRate}
                    selectVote={selectVote}
                    selectCity={selectCity}
                    selectUni={selectUni}
                    searchData={searchData}
                    findnear={findnear}
                    className="Map"
                  />}
                </div>
              </div>
            )}
          </Mouse>
        </div>
        <HelloMessage
          data5={data5}
          findnear={findnear}
        />
        <ControlBar
          selectCases={selectCases}
          selectPolicy={selectPolicy}
          selectGunRate={selectGunRate}
          selectVote={selectVote}
          selectCity={selectCity}
          selectUni={selectUni}
          clickEventsCases={selectChangeCases}
          clickEventsPolicy={selectChangePolicy}
          clickEventsGunRate={selectChangeGunRate}
          clickEventsVote={selectChangeVote}
          clickEventsCity={selectChangeCity}
          clickEventsUni={selectChangeUni}
          // scaleChange={scaleChange}
          scaleBig={scaleBig}
          scaleSmall={scaleSmall}
          scaleOrigin={scaleOrigin}
          data5={data5}
          findnear={findnear}
        />

        {/* <Statistics/> */}
        {/* <Profile /> */}



        <SubPage
          selectCases={selectCases}
          selectPolicy={selectPolicy}
          selectGunRate={selectGunRate}
          selectVote={selectVote}
        />
        {/* </div> */}

        <ChartExample
          selectCases={selectCases}
          selectPolicy={selectPolicy}
          selectGunRate={selectGunRate}
          selectVote={selectVote}
        />
      </header>
    </div>
  );
}

export default App;