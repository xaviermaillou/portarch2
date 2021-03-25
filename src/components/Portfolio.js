import React from "react";
import Carousel from "./Carousel";
import Profile from "./Profile";
import {useUser, useAuthorData, useAuthorProjects, useFavorites} from "../contexts/UserContext";

const Portfolio = (props) => {

    const user = useUser();
    const favorites = useFavorites(user.state ? user.state.id : 0);

    const authorData = useAuthorData(props.author !== undefined ? props.author : 0);
    const projects = useAuthorProjects(props.author !== undefined ? props.author : 0);

    return(
        <div className="panelContainer portfolioContainer">
            <Profile author={authorData[0]} />
            {projects.map((project, i) => (
                <Carousel 
                    key={i} 
                    index={i} 
                    project={project} 
                    noAuthor={true}  
                    favorite={favorites.includes(project.id)} 
                />
            ))}
        </div>
    );
}

export default Portfolio;