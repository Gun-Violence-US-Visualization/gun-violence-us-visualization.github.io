import React from 'react';

function Title(props) {
    return (
        <div className="Big-title"
            //  style={`opacity:${props.bigTitleIsShow}`}
            style={{ opacity: props.bigTitleIsShow }}
        >
            <div>
                <h1 className="Big-title-text">GUN VIOLENCE IN US</h1>
                <button 
                className="reset-button"
                onClick={props.reset}
                >
                    <img src="./media/reset.svg" width="100%"/>
                </button>
            </div>
            <p>{"基于地理坐标与枪击案件的美国高校安全性可视化平台"}</p>
        </div>

    )
}

export default Title;