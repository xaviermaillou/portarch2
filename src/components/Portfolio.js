import React from "react";
import Carousel from "./Carousel";
import Profile from "./Profile";
import {useAuthorData, useAuthorProjects} from "../contexts/UserContext";

const Portfolio = (props) => {

    const authorData = useAuthorData(props.author);

    const projects = useAuthorProjects(props.author);

    return(
        <div className="panelContainer portfolioContainer">
            <Profile author={authorData[0]} />
            {projects.map((project, i) => (
                <Carousel key={i} project={project} noAuthor={true} />
            ))}
        </div>
    );
}

export default Portfolio;