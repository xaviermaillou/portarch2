import React from "react";

const Tendency = (props) => {
    return(
        <div className="tendencyContainer" style={{backgroundColor: `${props.color}`}}>
            <div className="tendencyCover">
                <h2>{props.title}</h2>
            </div>
        </div>
    );
}

export default Tendency;