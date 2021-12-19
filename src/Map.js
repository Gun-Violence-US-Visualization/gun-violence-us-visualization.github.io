import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { useD3 } from './hooks/useD3';
import * as d3 from "d3"
import { feature } from "topojson-client"

const projection = geoEqualEarth()
  .scale(160)
  .translate([ 800 / 2, 450 / 2 ])


function Map(data) {
  const [statesData, setStatesData] = useState([]);
  // console.log(data)

  useEffect(() => {
    (async () => {
      const res = await fetch('./us.json')
      const statesData = await res.json();
      setStatesData(statesData);
    })();
  }, []);

  const ref = useD3(
    (svg) => { 
      svg
        .selectAll("path")
        .data(statesData)
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("id", function(d){return d.id})
        .attr("d", function(d){return d.shape})
        .style(
        "opacity", 
        function(d){
          for (let i = 0; i < data.data1.length ; i++){
            if (data.data1[i].id == d.id) {
              // console.log(data1.data1[i].num)
              return data.data1[i].num + 0.05
            }
          } 
        })
        .style(
        "fill", 
        function(d){
          for (let i = 0; i < data.data2.length ; i++){
            if (data.data2[i].id == d.id) {
              // console.log(data2.data2[i].num)
              if (data.data2[i].num>=0.5){
                return "#9865ff"
                // return "#171edc"
              }else{
                return "#f9ff66"
                // return "#f8e426"
              }
            }
          } 
        })
      },[statesData.length]
  )
  
  return (
     <svg viewBox="0 0 960 600" className="usMap" ref={ref}></svg>
  )
}

export default Map