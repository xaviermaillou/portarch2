import React from "react";
import Carousel from "./Carousel";
import Profile from "./Profile";
import {useUser, useAuthorData, useAuthorProjects, useFavorites} from "../contexts/UserContext";
import { useParams } from "react-router";

const Portfolio = (props) => {
    //console.log("Portfolio loaded");

    const user = useUser();
    const favorites = useFavorites(user.state ? user.state.id : 0);

    const { urlID } = useParams();

    const authorData = useAuthorData(props.author !== undefined ? props.author : urlID);
    const projects = useAuthorProjects(props.author !== undefined ? props.author : urlID);

    const handleScroll = (e) => {
        if(urlID !== undefined) {
            return;
        }
        let pills = document.getElementsByClassName("pill opened");
        if(e.target.getBoundingClientRect().left > 50) {
            return;
        }
        const portfolio = e.target;
        const pill = e.target.children[1];
        const container = e.target.children[2];
        if((((window.innerHeight / window.innerWidth) < 1) && (container.getBoundingClientRect().top <= 1)) || (((window.innerHeight / window.innerWidth) >= 1) && (container.getBoundingClientRect().top <= (window.innerHeight / 3)))) {
            portfolio.classList.add("locked");
            pill.classList.add("opened");
            container.classList.add("opened");
            if(pills.length > 1) {
                pills[0].style.display = "none";
            }
        } else {
            portfolio.classList.remove("locked");
            pill.classList.remove("opened");
            container.classList.remove("opened");
            if(pills.length > 0) {
                pills[0].style.display = "flex";
            }
        }
    }

    const handleBackToTop = (e) => {
        e.target.parentElement.parentElement.scrollTop = 0;
    }

    return(
        <div onScroll={(e) => handleScroll(e)} className="panelContainer portfolioContainer">
            <Profile author={authorData[0]} />
            <div className="pill">
                    <div onClick={(e) => handleBackToTop(e)} className="arrow-up"></div>
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
                        initialIndex={props.index + 1}
                    />
                ))}
            </div>
        </div>
    );
}

export default Portfolio;