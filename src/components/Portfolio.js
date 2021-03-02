import React from "react";
import Profile from "./Profile";

const Portfolio = (props) => {
    return(
        <div className="panelContainer portfolioContainer">
            <Profile author={props.author} />
        </div>
    );
}

export default Portfolio;