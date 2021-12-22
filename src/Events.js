import React, { useState, useEffect } from "react"
import { geoAlbers, geoPath,geoAlbersUsa } from "d3-geo"
import { useD3 } from './hooks/useD3';
import * as d3 from "d3"
import { feature } from "topojson-client"

const projection = geoAlbersUsa()
//   .scale(1250)
  .translate([ 960 / 2, 600 / 2 ])



function Events(data) {
  const [eventsData, setEventsData] = useState([]);
  // console.log(data)

  useEffect(() => {
    (async () => {
      const res = await fetch('./mass_shooting_events_stanford_msa_release.geojson')
      const eventsDataCombine = await res.json();
      const eventsData = eventsDataCombine.features
      setEventsData(eventsData);
    })();
  }, []);

  console.log(eventsData)
//   console.log(eventsData.features)

  const ref = useD3(
    (svg) => { 
      svg
        .selectAll(".points")
        .data(eventsData).enter()
        .append("circle")
        .attr("class", "event")
        .attr("r", 
            function (d) { 
                return 3
            })
        // .style(
        //     "fill","red"
        // )
        .attr("transform", 
        
            function(d) { 
            // setInterval(() =>
                console.log(d)
                 
            // ,300)
            return "translate(" + projection(d.geometry.coordinates) + ")"
        })
      },[eventsData.length]
  )
  
  return (
     <svg viewBox="0 0 960 600" className="Events Map" ref={ref}></svg>
  )
}

export default Events