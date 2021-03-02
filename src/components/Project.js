import React from "react";

const Project = (props) => {
    return(
        <div className="projectContainer" style={{backgroundColor: `${props.color}`}}>
            <h2>{props.title}</h2>
        </div>
    );
}

export default Project;