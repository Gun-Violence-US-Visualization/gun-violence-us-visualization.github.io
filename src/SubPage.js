import React from 'react';
import ScrollToButton from "./components/ScrollToButton";
import Section from "./components/Section";

function SubPage() {

    return (
        <div className="SubPageContainer" id="SBtest">
            
            <div className="learn-more">
            <ScrollToButton toId="SBtest">Scroll To Contact!</ScrollToButton>
            </div>
            <div>
                HIHIHIHIHIHI
            </div>
            <ScrollToButton toId="App-header">Back To TOP!</ScrollToButton>
        </div>
    )

}

export default SubPage