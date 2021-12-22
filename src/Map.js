import React, { useState, useEffect } from "react"
// import { geoEqualEarth, geoPath } from "d3-geo"
import { geoAlbers, geoPath,geoAlbersUsa } from "d3-geo"
import { useD3 } from './hooks/useD3';
import * as d3 from "d3"
import { feature } from "topojson-client"

// const projection = geoEqualEarth()
//   .scale(160)
//   .translate([ 800 / 2, 450 / 2 ])
const projection = geoAlbersUsa()
  // .scale(960)
  .translate([ 960 / 2, 600 / 2 ])


function Map(data) {
  const [statesData, setStatesData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  // console.log(data)

  useEffect(() => {
    (async () => {
      const res = await fetch('./gz_2010_us_040_00_500k.json')
      const statesDataCombine = await res.json();
      const statesData = statesDataCombine.features
      setStatesData(statesData);
      const res1 = await fetch('./mass_shooting_events_stanford_msa_release.geojson')
      const eventsDataCombine = await res1.json();
      const eventsData = eventsDataCombine.features
      setEventsData(eventsData);
    })();
  }, []);

  const ref = useD3(
    (svg) => {
      var path = d3.geoPath()
							 .projection(projection);

      svg.selectAll("path")
        .data(statesData)
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("id", function(d){
          // console.log(d)
          return d.properties.NAME
        })
        .attr("d", path)
        // .style("fill", "steelblue");
        .style(
            "opacity", 
            function(d){
              for (let i = 0; i < data.data1.length ; i++){
                if (data.data1[i].name == d.properties.NAME) {
                  // console.log(data1.data1[i].num)
                  return data.data1[i].num + 0.05
                }
              } 
            })
        .style(
            "fill", 
            function(d){
              for (let i = 0; i < data.data2.length ; i++){
                if (data.data2[i].name == d.properties.NAME) {
                  // console.log(data2.data2[i].num)
                  if (data.data2[i].num>=0.5){
                    console.log(d)
                    return "#9865ff"
                    // return "#171edc"
                  }else{
                    return "#f9ff66"
                    // return "#f8e426"
                  }
                }
              } 
            })

      // svg
      //   .selectAll("path")
      //   .data(statesData)
      //   .enter()
      //   .append("path")
      //   .attr("class", "state")
      //   .attr("id", function(d){return d.id})
      //   .attr("d", function(d){return d.shape})
      //   .style(
      //   "opacity", 
      //   function(d){
      //     for (let i = 0; i < data.data1.length ; i++){
      //       if (data.data1[i].id == d.id) {
      //         // console.log(data1.data1[i].num)
      //         return data.data1[i].num + 0.05
      //       }
      //     } 
      //   })
      //   .style(
      //   "fill", 
      //   function(d){
      //     for (let i = 0; i < data.data2.length ; i++){
      //       if (data.data2[i].id == d.id) {
      //         // console.log(data2.data2[i].num)
      //         if (data.data2[i].num>=0.5){
      //           return "#9865ff"
      //           // return "#171edc"
      //         }else{
      //           return "#f9ff66"
      //           // return "#f8e426"
      //         }
      //       }
      //     } 
      //   })
      // console.log(statesData[0])

      // svg
      //   .selectAll(".points")
      //   .data(eventsData).enter()
      //   .append("circle")
      //   .attr("r", 
      //       function (d) { 
      //           return 3
      //       })
      //   .style(
      //       "fill","red"
      //   )
      //   .attr("transform", 
      //       function(d) { 
      //           console.log(d)
      //           return "translate(" + projection(d.geometry.coordinates) + ")" 

      //       })
      
      },[statesData.length]
  )
  
  return (
     <svg viewBox="0 0 960 600" className="usMap Map" ref={ref}></svg>
  )
}

export default Map