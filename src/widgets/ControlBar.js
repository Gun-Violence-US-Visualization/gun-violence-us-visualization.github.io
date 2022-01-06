import React, { useState, useEffect, useLayoutEffect } from "react"

function ControlBar(props) {
    return (
        <div className="control-bar">
            {/* <div className="block">
                <input type="text"/>
            </div> */}
            {/* <div className="block">
                <div>
                    <input id="name" type="text" onChange={props.findnear} />
                </div>
                <div>
                </div>
            </div> */}
            <div className="block">
                <div>
                    <input type="checkbox" id="cases" value={props.value} checked={props.selectCases} />
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

                    <input type="checkbox" id="policy" checked={props.selectPolicy} />
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
                    <input type="checkbox" id="gunRate" checked={props.selectGunRate} />
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

            </div>

            <div className="block tiny-button-container">
                <div>
                    <input type="checkbox" id="city" checked={props.selectCity} />
                    <label htmlFor="city">
                        <div
                            id="citylabel"
                            className={"tiny-button"}
                            onClick={props.clickEventsCity}
                        >
                            <p>CITY</p>
                        </div>
                    </label>
                    <input type="checkbox" id="Uni" checked={props.selectUni} />
                    <label htmlFor="Uni">
                        <div
                            id="Unilabel"
                            className={"tiny-button"}
                            onClick={props.clickEventsUni}
                        >
                            <p>COLLEGE</p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="block">
                <div className="range">
                    {/* <input type="range" className="" onChange={props.scaleChange} /> */}
                    <button className="scaleSmall scale" onClick={props.scaleSmall}><img src="./media/small.svg" width="60%"/></button>
                    <button className="scaleOrigin scale" onClick={props.scaleOrigin}><img src="./media/origin.svg" width="60%"/></button>
                    <button className="scaleBig scale" onClick={props.scaleBig}><img src="./media/large.svg" width="60%"/></button>
                </div>
            </div>

        </div>
    )
}


export default ControlBar