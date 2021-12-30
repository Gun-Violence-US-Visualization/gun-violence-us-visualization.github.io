import React, { useState, useEffect, useLayoutEffect } from "react"

function ControlBar(props) {
    return (
        <div className="control-bar">
            {/* <div className="block">
                <input type="text"/>
            </div> */}
            <div className="block">
                <div>
                    <input type="checkbox" id="cases" checked={props.selectCases} />
                    <label htmlFor="cases">
                        <div
                            className={"title-button"}
                            onClick={props.clickEventsCases}
                        >
                            <p>CASES</p>
                        </div>
                    </label>
                </div>
                <div>
                </div>
            </div>
            <div className="block">
                <div>

                    <input type="checkbox" id="policy" checked={props.selectPolicy}/>
                    <label htmlFor="policy">
                        <div
                            className={"title-button"}
                            onClick={props.clickEventsPolicy}
                        >
                            <p>POLICY</p>
                        </div>
                    </label>
                </div>
                <div>
                </div>
            </div>
            <div className="block">
                <div>
                    <input type="checkbox" id="gunRate"  checked={props.selectGunRate}/>
                    <label htmlFor="gunRate">
                        <div
                            className={"title-button"}
                            onClick={props.clickEventsGunRate}
                        >
                            <p>GUN RATE</p>
                        </div>
                    </label>
                </div>
                <div>
                </div>
            </div>
            <div className="block">
                <div>
                    <input type="checkbox" id="vote" checked={props.selectVote} />
                    <label htmlFor="vote">
                        <div
                            className={"title-button"}
                            onClick={props.clickEventsVote}
                        >
                            <p>VOTE</p>
                        </div>
                    </label>
                </div>
                <div>
                </div>
            </div>
            <div className="block">
                <div>
                    <input type="checkbox" id="find" />
                    <label htmlFor="find">
                        <div
                            className={"title-button"}
                            onClick={props.findnear}
                        >
                            <p>FIND</p >
                        </div>
                    </label>
                </div>
                <div>
                </div>
            </div>
            <div className="block">
                <div className="range">
                    {/* <input type="range" className="" onChange={props.scaleChange} /> */}
                    <button className="scaleSmall scale" onClick={props.scaleSmall}>-</button>
                    <button className="scaleOrigin scale" onClick={props.scaleOrigin}>O</button>
                    <button className="scaleBig scale" onClick={props.scaleBig}>+</button>
                </div>
            </div>

        </div>
    )
}


export default ControlBar