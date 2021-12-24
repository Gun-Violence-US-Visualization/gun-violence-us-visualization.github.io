import React, { useState, useEffect, useLayoutEffect } from "react"
// import { geoEqualEarth, geoPath } from "d3-geo"
import { geoAlbers, geoPath,geoAlbersUsa } from "d3-geo"
import { useD3 } from './hooks/useD3';
import * as d3 from "d3"
import { feature } from "topojson-client"

// const projection = geoEqualEarth()
//   .scale(160)
//   .translate([ 800 / 2, 450 / 2 ])

function Map(props) {

  const ref = React.useRef(null);
  const [statesData, setStatesData] = useState([]);
  const [scaleData, setScaleData] = useState(props.scaleSend);
  const [eventsData, setEventsData] = useState([]);


  // let projection = geoAlbersUsa()
  // .scale(scaleData)
  // .translate([ 960 / 2, 600 / 2 ])

  // console.log(`OUT${scaleData}`)

useEffect(() => {
  
  (async () => {
    const res = await fetch('./gz_2010_us_040_00_500k.json')
    const statesDataCombine = await res.json();
    const statesData = statesDataCombine.features
    setStatesData(statesData);
    setScaleData(props.scaleSend);

    const res1 = await fetch('./cases.geojson')
    const eventsDataCombine = await res1.json();
    const eventsData = eventsDataCombine.features;
    setEventsData(eventsData);



    const projection = geoAlbersUsa()
    .scale(scaleData)
    .translate([ 960 / 2, 600 / 2 ])
    // setProjection(projection)
  
    // console.log(`HHH${scaleData}`)

    const chartEl = d3.select(ref.current);
    chartEl.selectAll("*").remove();

    const chart = chartEl.append("g")

    // console.log(`IN${scaleData}`)

    const path = d3.geoPath()
    .projection(projection);

      console.log(scaleData);
      const myColor = d3.scaleLinear().domain([0.0,1.0]).range(["white", "red"])

      chart.selectAll("path")
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
              for (let i = 0; i < props.data1.length ; i++){
                if (props.data1[i].name == d.properties.NAME) {
                  // console.log(data1.data1[i].num)
                  return props.data1[i].num + 0.05
                }
              } 
            })
        .style(
            "fill", 
            function(d){
              for (let i = 0; i < props.data2.length ; i++){
                if (props.data2[i].name == d.properties.NAME) {

                  return myColor(d)
                }
              } 
            })

          chart
            .selectAll(".points")
            .data(eventsData).enter()
            .append("circle")
            .attr("class", "event")
            .attr("r", 
                function (d) { 
                    console.log(d)
                        return 4.0
                    // }
                })
            .attr("transform", 
            
                function(d) { 
                  console.log(d)
                return "translate(" + projection(d.geometry.coordinates) + ")"
            })



          })();
      
      },[statesData.length]
  )

  
  return (
      
     <svg viewBox="0 0 960 600" className="usMap Map" ref={ref}></svg>
  )
}

export default Map