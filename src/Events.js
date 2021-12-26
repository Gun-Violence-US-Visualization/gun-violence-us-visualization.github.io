import React, { useState, useEffect } from "react"
import { geoAlbers, geoPath,geoAlbersUsa } from "d3-geo"
import { useD3 } from './hooks/useD3';
import * as d3 from "d3"
import { feature } from "topojson-client"

function Events(data) {

  const ref = React.useRef(null);

  const [eventsData, setEventsData] = useState([]);
//   const { list } = props;
//   const data = props

  useEffect(() => {
    (async () => {
      const res = await fetch('./cases.geojson')
      const eventsDataCombine = await res.json();
      const eventsData = eventsDataCombine.features;
      setEventsData(eventsData);

      const projection = geoAlbersUsa()
      .scale(data.scaleSend)
      // .scale(1200)
      .translate([ 960 / 2, 600 / 2 ])
      
    const chartEl = d3.select(ref.current);
    chartEl.selectAll("*").remove();

    const chart = chartEl.append("g")

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
      },[eventsData.length]
  )
  
  return (
     <svg viewBox="0 0 960 600" className="Events Map" ref={ref}></svg>
  )
}

export default Events