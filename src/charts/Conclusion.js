import React, { useState, useEffect } from "react"
import * as d3 from "d3"

function Conclusion(props) {

    return (
        <div className="down-chart-container">
            <div className="chart-title">CONCLUSION</div>
            <p>{props.details}</p>
        </div>   //渲染了这个东西出来
    )

}

export default Conclusion