import React from 'react';
import Map from './charts/Map';
import Mouse from './components/Mouse'
import Title from './widgets/Title'
import ControlBar from './widgets/ControlBar'
import SubPage from './widgets/SubPage'
import SearchBar from './widgets/SearchBar';
import ChartExample from './widgets/ChartExample'
import UniTipBar from './widgets/UniTipBar'


function App() {

  const [data1, setData1] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  const [data4, setData4] = React.useState([]);
  const [data5, setData5] = React.useState([]);

  const [uniData,setUniData] = React.useState([]);

  const [searchData, setSearchData] = React.useState([]);

  // const [select, setSelect] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [scaleData, setScaleData] = React.useState(900);
  const [pace, setPace] = React.useState(12);
  const [offset, setOffset] = React.useState([]);

  const [selectCases, setSelectCases] = React.useState(true);
  const [selectPolicy, setSelectPolicy] = React.useState(true);
  const [selectGunRate, setSelectGunRate] = React.useState(false);
  const [selectVote, setSelectVote] = React.useState(false);

  const [selectCity, setSelectCity] = React.useState(false);
  const [selectUni, setSelectUni] = React.useState(true);

  const [bigTitleIsShow, setBigTitleIsShow] = React.useState(1.0)

  const [searchRange, setSearchRange] = React.useState(500.0)

  const [selectSerious, setSelectSerious] = React.useState(false)
  const [selectLowerRange, setSelectLowerRange] = React.useState(false)

  const [searchInput, setSearchInput] = React.useState("")
  // const [setIsChange,setSetIsChange]=React.useState(false)
  const [searchState,setSearchState]=React.useState([false,false,""])
  const [callUniTip,setCallUniTip] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      const res1 = await fetch('./data/policy.json')
      const data1 = await res1.json();
      setData1(data1);
      console.log(data1.total);

      const res2 = await fetch('./data/policy.json')
      const data2 = await res2.json();
      setData2(data2);

      const res3 = await fetch('./data/cases.geojson')
      const data3Combine = await res3.json();
      const data3 = data3Combine.features;
      setData3(data3);

      // const res4 = await fetch('./colorTest4.json')
      // const data4 = await res4.json();
      // setData4(data4);

      // setSelect([true, true, true, true])

      const res5 = await fetch('./data/univercity.json')
      const data5Combine = await res5.json();
      const data5 = data5Combine.features;
      setData5(data5);

      setSelectCases(true)
      setSelectPolicy(true)
      setSelectGunRate(false)
      setSelectVote(false)

      setSelectCity(false)
      setSelectUni(true)

      setSelectLowerRange(false)
      setSelectSerious(false)

      setLoading(false);

      setScaleData(900);

      setPace(12);

      setOffset([50, 50])

      setSearchData([])

      setBigTitleIsShow(1.0)

      setSearchRange(500.0)

      setSearchInput("")

      setSearchState([false,false,""])
      setCallUniTip(false)

      setUniData([])

    })();
  }, []);

  const scaleBig = () => {

    // let scale = 900+(event.target.value-50)*15;
    setScaleData(1400);
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
    setOffset([50, 50])

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
    // setAnimation(true)
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
    // setAnimation(true)
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

  const selectChangeLowerRange = () => {
    setSearchData([])

    if (selectLowerRange) {
      setSelectLowerRange(false)
      setSearchRange(500.0)
    } else {
      setSelectLowerRange(true)
      setSearchRange(200.0)
      if (selectSerious) {
        setSelectSerious(false)
      }
    }
    // findnear(searchInput)
  }

  const selectChangeSerious = () => {
    setSearchData([])
    if (selectSerious) {
      setSelectSerious(false)

    } else {
      setSelectSerious(true)
      if (selectLowerRange) {
        setSelectLowerRange(false)
        setSearchRange(500.0)
      }
    }
    // findnear(searchInput)
    // console.log("second")

  }

  const reset = () => {
    setSelectCases(true)
    setSelectPolicy(true)
    setSelectGunRate(false)
    setSelectVote(false)

    setSelectCity(false)
    setSelectUni(true)

    setSelectLowerRange(false)
    setSelectSerious(false)

    setLoading(false);

    setScaleData(900);

    setPace(12);

    setOffset([50, 50])

    setSearchData(null)

    setBigTitleIsShow(1.0)

    setSearchRange(500.0)
    setSearchInput("")

    setSearchState([false,false,""])
    setCallUniTip(false)

    setUniData([])
    
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
    // console.log(`FuncTrigger`)

    var result = new Array();
    var resultList = [0,0,0,0];
    var find = false;
    var findi = 0;
    for (var i = 0; i < data5.length; i++) {
      if (data5[i].properties.name == u) {
        find = true;
        findi = i;
      }
    }
    // console.log(`${searchRange}+${selectSerious}+${selectLowerRange}`)
    if (find == false) {
      return [];
    } else {
      if ((searchState[2])!=u){
      setSearchInput(u)
      setCallUniTip(true)
      console.log(`input=${u}`)
        // setSearchState([searchState[0],searchState[1],u])
      }
      console.log(`IfTrigger`)
      for (var j = 0; j < data3.length; j++) {
        if (GetDistance(data5[findi].geometry.coordinates[1], data5[findi].geometry.coordinates[0], data3[j].geometry.coordinates[1], data3[j].geometry.coordinates[0]) < searchRange) {
          // resultList.push(data3[j])

          if (parseInt(data3[j].properties.killed) + parseInt(data3[j].properties.injured) <5) {
            resultList[0]+=1
          }else if(parseInt(data3[j].properties.killed) + parseInt(data3[j].properties.injured) <10){
            resultList[1]+=1
          }else if(parseInt(data3[j].properties.killed) + parseInt(data3[j].properties.injured) <20){
            resultList[2]+=1
          }else{
            resultList[3]+=1
          }

          if (selectSerious) {
            // console.log(parseInt(data3[j].killed)+parseInt(data3[j].injured))
            
            if (parseInt(data3[j].properties.killed) + parseInt(data3[j].properties.injured) >= 20) {
              result.push([[data5[findi].geometry.coordinates[0], data5[findi].geometry.coordinates[1]], [data3[j].geometry.coordinates[0], data3[j].geometry.coordinates[1]]])
              
            }
          } else {
            result.push([[data5[findi].geometry.coordinates[0], data5[findi].geometry.coordinates[1]], [data3[j].geometry.coordinates[0], data3[j].geometry.coordinates[1]]])
          }
        }
      }
      if (searchState[3] != result){
        setSearchData(result) 
        setUniData(resultList)
        console.log("resultSet")
        return result;
      }
    }
  }

  // console.log(`AppTrigger`)
  // console.log(select[0])

  return (
    <div className="App">
      <header className="App-header" id="App-header">
        <Title
          bigTitleIsShow={bigTitleIsShow}
          reset={reset}
        />
        <div className="HideOverFlow">
          <Mouse>
            {({ x, y }) => (
              <div className="Map-container">
                <div
                  className="MouseControl"
                  style={{
                    position: 'absolute',
                    top: -y / pace + offset[0],
                    left: -x / pace + offset[1]
                  }}>
                  {loading && <div>loading</div>}
                  {!loading &&

                    <Map
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
                      selectSerious={selectSerious}
                      selectLowerRange={selectLowerRange}
                      searchData={searchData}
                      findnear={findnear}
                      searchInput={searchInput}
                      searchState={searchState}
                      setSearchState={setSearchState}
                    // setIsChange={setIsChange}
                    // className="Map"
                    />

                  }
                </div>
              </div>
            )}
          </Mouse>
        </div>
        <SearchBar
          data5={data5}
          findnear={findnear}
          selectSerious={selectSerious}
          selectLowerRange={selectLowerRange}
          clickEventsLower={selectChangeLowerRange}
          clickEventsSerious={selectChangeSerious}
        // setSearchInput={setSearchInput}
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

        <UniTipBar
          data5={data5}
          searchInput={searchInput}
          callUniTip={callUniTip}
          searchData={searchData}

          selectSerious={selectSerious}
          selectLowerRange={selectLowerRange}
          uniData={uniData}
        />

        {/* <Statistics/> */}
        {/* <Profile /> */}

          <SubPage
            selectCases={selectCases}
            selectPolicy={selectPolicy}
            selectGunRate={selectGunRate}
            selectVote={selectVote}
            setSelectCases={setSelectCases}
            setSelectGunRate={setSelectGunRate}
            setSelectPolicy={setSelectPolicy}
            setSelectVote={setSelectVote}

          // setBigTitleIsShow={setBigTitleIsShow}
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