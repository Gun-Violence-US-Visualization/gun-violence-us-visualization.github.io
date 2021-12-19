import React from 'react';
import Map from './Map';
import SelectBar from './SelectBar';
import * as d3 from "d3"
// import DataProcess from './MapCharts';

function App() {
  const [data1, setData1] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  const [data4, setData4] = React.useState([]);
  const [select, setSelect] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const res1 = await fetch('./colorTest1.json')
      const data1 = await res1.json();
      setData1(data1);

      const res2 = await fetch('./colorTest2.json')
      const data2 = await res2.json();
      setData2(data2);

      const res3 = await fetch('./colorTest3.json')
      const data3 = await res3.json();
      setData3(data3);

      const res4 = await fetch('./colorTest4.json')
      const data4 = await res4.json();
      setData4(data4);

      setSelect([1,1,0,0])

      setLoading(false);
    })();
  }, []);
  // console.log("111")
  // console.log(data2)

  return (
    <div className="App">
      <header className="App-header">
        {loading && <div>loading</div>}
        {!loading && <Map 
        data1={data1}
        data2={data2}
        data3={data3}
        data4={data4}
          />}
        <SelectBar />
      </header>
    </div>
  );
}
    
export default App;