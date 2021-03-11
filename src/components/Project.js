import React from "react";

const Project = (props) => {
    return(
        <div className="projectContainer" style={{background: `url(${props.picture})`}}>
            <h2>{props.title}</h2>
        </div>
    );
}

export default Project;