import React from "react";
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {

    const user = useUser();
    const projects = useProjects();
    const favorites = useFavorites(user.state ? user.state.id : 0);

    return(
        <div className="App">
            <Logo />
            <div id="carouselsContainer">
                {projects && projects.map((project, i) => (
                    <Carousel key={i} index={i} project={project} favorite={favorites.includes(project.id)} />
                ))}
            </div>
            <Menu />
        </div>
    );
}

export default App;