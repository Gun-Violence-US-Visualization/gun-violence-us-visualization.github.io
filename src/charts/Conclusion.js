import React, { useState, useEffect } from "react"
import * as d3 from "d3"

function Conclusion(props) {

    return (
        <div className="down-chart-container">
            <div className="chart-title">CONCLUSION</div>
            <li>{props.details1}</li>
            {props.details2 && <li>{props.details2}</li>}
            {props.details3 && <li>{props.details3}</li>}
            {props.details4 && <li>{props.details4}</li>}
            {props.details5 && <li>{props.details5}</li>}
            {props.details6 && <li>{props.details6}</li>}
        </div>   //渲染了这个东西出来
    )

}
export default Conclusion