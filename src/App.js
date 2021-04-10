import React, {useEffect, useState} from "react";
import "./App.css";
import "./Dark.css"
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import Indications from "./components/Indications";

import firebase from "firebase/app";
import "firebase/auth";

import {useUser, useProjects, useFavorites} from "./contexts/UserContext";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDaT1cYZvk2-YGNjgQxJMI5jAwu2-kyE6c",
    authDomain: "portarch-9bfa9.firebaseapp.com",
    projectId: "portarch-9bfa9",
    storageBucket: "portarch-9bfa9.appspot.com",
    messagingSenderId: "653239294431",
    appId: "1:653239294431:web:aacaceb68c3aba85c00c6a"
};
// Initializes Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {

    const user = useUser();
    const projects = useProjects();
    const favorites = useFavorites(user.state ? user.state.id : 0);


    const [search, setSearch] = useState();

    const [dark, setDark] = useState(false);
    const [intro, setIntro] = useState(true);
    const [introOpacity, setIntroOpacity] = useState(1);

    const padding = (window.innerHeight / window.innerWidth) >= 1 ? ((window.innerHeight - window.innerWidth) / 2) : 0;

    //Removes the search results from main stream
    const handleClickClose = () => {
        let containers = document.getElementsByClassName("tendencyCover");
        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.remove("selected");
        }
        setSearch();
    }

    useEffect(() => {
        document.onload = setTimeout(() => {
            document.getElementById("carouselsContainer").classList.remove("preIntro");
            document.getElementById("carouselsContainer").classList.add("intro");
        }, 3000);
    }, []);

    const handleScroll = () => {
        setIntroOpacity(document.getElementById("carouselsContainer").getBoundingClientRect().top / (0.75 * window.innerHeight));
        if(document.getElementById("carouselsContainer").getBoundingClientRect().top <= 0) {
            setIntro(false);
            document.getElementById("carouselsContainer").classList.remove("intro");
        }
    }

    return(
        <div className="App" onScroll={() => handleScroll()}>
            {intro &&
                <div id="introductionContainer">
                    <h5 style={{opacity: `${introOpacity - 0.2}`}}>
                        welcome
                    </h5>
                    <div style={{opacity: `${introOpacity - 0.4}`}}>
                        <div className="introLogo"></div>
                        <p>
                            Share your professional or university architecture projects, build your portfolio and discover others' projects in the PortArch network!
                        </p>
                    </div>
                </div>
            }
            {search !== undefined && <div className="pill opened"><h1><div className="arrow-left" onClick={() => handleClickClose()}></div>{search.title}</h1></div>}
            <Logo intro={intro} />
            {/*Default stream*/}
            <div 
                id="carouselsContainer" 
                className={(search !== undefined ? "closed" : "") + " " + (dark ? "darkened" : "") + (intro ? "preIntro" : "")}
                style={{padding: `${padding}px 0`}}
            >
                {(projects) && projects.map((project, i) => (
                    <Carousel 
                        key={i} 
                        index={i} 
                        project={project} 
                        favorite={favorites.includes(project.id)} 
                        isSearchResult={false} 
                    />
                ))}
            </div>
            {/*Results stream*/}
            <div 
                id="searchResultsContainer" 
                className={(search !== undefined ? "open" : "") + " " + (dark ? "darkened" : "")}
                style={{padding: `${padding}px 0`}}
            >
                {search !== undefined && search.projects.map((project, i) => (
                    <Carousel 
                        key={i} 
                        index={i} 
                        project={project} 
                        favorite={favorites.includes(project.id)} 
                        isSearchResult={true} 
                        isSearchSet={search} 
                    />
                ))}
            </div>
            <Menu setSearch={setSearch} setDark={setDark} intro={intro} />
            <Indications />
        </div>
    );
}

export default App;