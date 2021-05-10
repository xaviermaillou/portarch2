import React from "react";

const Indications = (props) => {

    return(
        <div className="indicationsContainer">
            <div className="swipeUpToDiscover" style={{opacity: `${props.introOpacity - 0.5}`}}>
                Swipe up to start
            </div>
        </div>
    );
}

export default Indications;