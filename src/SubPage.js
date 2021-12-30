import React, { useState, useEffect } from "react"
import ScrollToButton from "./components/ScrollToButton";
import Section from "./components/Section";
import Statistics from './Statistics'
import Profile from './Profile'
import Correlation from './Correlation'

function SubPage(props) {
    const [show, setShow] = useState(null);

    useEffect(() => {

        if (props.selectCases && !props.selectPolicy && !props.selectVote && !props.selectGunRate){
            setShow(1)
        }else if(props.selectCases && props.selectVote &&(props.selectPolicy || props.selectGunRate )) {
            setShow(2)
        // }else if(props.selectCases && !props.selectPolicy && !props.selectVote && !props.selectGunRate) {
        //     setShow(3)
        }else(
            setShow(null)
        )

    }, [props.selectCases, props.selectPolicy, props.selectVote, props.selectGunRate])



    return (
        <div>
            {show && <div className="SubPageContainer" id="Detail">

                {/* <div className="learn-more"> */}
                <ScrollToButton buttonClass="learn-more" toId="Detail">LEARN MORE</ScrollToButton>
                {/* </div> */}
                <div>
                    {/* <Statistics/> */}
                    {show==1 && <div><Profile /> <Statistics /></div>}
                    {show==2 && <Correlation />}
                    {/* {show==3 && <Profile />} */}
                </div>
                <div className="spacer"></div>
                <ScrollToButton buttonClass="back-to-top" toId="App-header">Back To TOP</ScrollToButton>
            </div>
            
            }
        </div>
    )
}

export default SubPage