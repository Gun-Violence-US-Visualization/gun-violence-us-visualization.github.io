import React from 'react';
import Map from './Map';
import Events from './Events';
import SelectBar from './SelectBar';
import Mouse from './Mouse'
import * as d3 from "d3"
// import DataProcess from './MapCharts';

function App() {
  const [data1, setData1] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  const [data4, setData4] = React.useState([]);
  const [select, setSelect] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [scaleData, setScaleData] = React.useState(1200);
  // const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const res1 = await fetch('./colorTest1.json')
      const data1 = await res1.json();
      setData1(data1);
      // console.log(data1);

      const res2 = await fetch('./colorTest2.json')
      const data2 = await res2.json();
      setData2(data2);

      const res3 = await fetch('./colorTest3.json')
      const data3 = await res3.json();
      setData3(data3);

      const res4 = await fetch('./colorTest4.json')
      const data4 = await res4.json();
      setData4(data4);

      setSelect([1,1,1,1])

      setLoading(false);

      setScaleData(1200)
    })();
  }, []);

  const scaleChange = event => {

      let scale = 1200+(event.target.value-50)*15;
      setScaleData(scale);
    console.log(scaleData)

  }

  return (
    <div className="App">
      <header className="App-header">

      <Mouse>
      {({ x, y }) => (
        <div  className="Map-container">
        <div
        style={{
          position: 'absolute',
          top: y/15,
          left: x/15
        }}>
        {loading && <div>loading</div>}
        {!loading && <Map 
        data1={data1}
        data2={data2}
        data3={data3}
        data4={data4}
        className="Map"
        scaleSend={scaleData}
          />}
        {/* {select[2] && <Events 
        scaleSend={scaleData}
        />} */}
        <SelectBar />
        </div>
        </div>
      )}
      </Mouse>

      <div>
        <button 
        className="button"
        onClick={()=>{
          if (select[0]==0){
            select[0]=1
            setSelect(select)

          }else{
            select[0]=0
            setSelect(select)

          }
        }}
        />
        <button 
        className="button"
        onClick={()=>{
          console.log(select)
          if (select[1]==0){
            select[1]=1
            setSelect(select)

          }else{
            select[1]=0
            setSelect(select)
            
          }
        }}
        />
        <button 
        className="button"
        onClick={()=>{
          if (select[2]==0){
            select[2]=1
            setSelect(select)
          }else{
            select[2]=0
            setSelect(select)
          }
        }}
        />
        <button 
        className="button"
        onClick={()=>{
          if (select[3]==0){
            select[3]=1
          }else{
            select[3]=0
          }
        }}
        />
      </div>

      <div>
        <input type="range" className="" onChange={scaleChange} />
      </div>

      </header>
    </div>
  );
}
    
export default App;