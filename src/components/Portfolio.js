import React from "react";
import Carousel from "./Carousel";
import Profile from "./Profile";
import {useUser, useAuthorData, useAuthorProjects, useFavorites} from "../contexts/UserContext";

const Portfolio = (props) => {

    const user = useUser();
    const favorites = useFavorites(user.state ? user.state.id : 0);

    const authorData = useAuthorData(props.author !== undefined ? props.author : 0);
    const projects = useAuthorProjects(props.author !== undefined ? props.author : 0);

    const handleScroll = (e) => {
        if(e.target.getBoundingClientRect().left > 50) {
            return;
        }
        const portfolio = e.target;
        const pill = e.target.children[1];
        const container = e.target.children[2];
        if(container.getBoundingClientRect().top <= 1) {
            portfolio.classList.add("locked");
            pill.classList.add("opened");
            container.classList.add("opened");
        } else {
            portfolio.classList.remove("locked");
            pill.classList.remove("opened");
            container.classList.remove("opened");
        }
    }

    const handleBack = (e) => {
        e.target.parentElement.parentElement.scrollTop = 0;
    }

    return(
        <div onScroll={(e) => handleScroll(e)} className="panelContainer portfolioContainer">
            <Profile author={authorData[0]} />
            <div className="pill">
                    <div onClick={(e) => handleBack(e)} className="arrow-up"></div>
                    <h1>{authorData[0] !== undefined && authorData[0].displayName}'s projects</h1>
                </div>
            <div className="ownProjectsContainer">
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
        </div>
    );
}

export default Portfolio;