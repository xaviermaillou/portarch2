import React, {useState} from "react";
import "./App.css";
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";
import Logo from "./components/Logo";

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

    //Removes the search results from main stream
    const handleClickClose = () => {
        let containers = document.getElementsByClassName("tendencyCover");
        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.remove("selected");
        }
        setSearch();
    }

    return(
        <div className="App">
            {search !== undefined && <div className="searchResultsHeader"><h1><button onClick={() => handleClickClose()}>x </button>{search.title}</h1></div>}
            <Logo />
            {/*Default stream*/}
            <div id="carouselsContainer" className={(search !== undefined ? "closed" : "") + " " + (dark ? "darkened" : "")}>
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
            <div id="searchResultsContainer" className={(search !== undefined ? "open" : "") + " " + (dark ? "darkened" : "")}>
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
            <Menu setSearch={setSearch} setDark={setDark} />
        </div>
    );
}

export default App;