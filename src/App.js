import React, {useState, useEffect} from "react";
import "./App.css";
import getRandomColor from "./helpers/getRandomColor";
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";
import Logo from "./components/Logo";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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


    const [projects] = useState([
        {
            title: "Casa copada",
            color: getRandomColor(),
            author: {
                displayName: "Pablo Gutierrez",
                job: "architect",
                location: "Valencia",
                country: "ES",
            },
            detailPics: [
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
            ],
        },
        {
            title: "Puente peligroso",
            color: getRandomColor(),
            author: {
                displayName: "laura Mendez",
                job: "engineer",
                location: "Córdoba",
                country: "AR",
            },
            detailPics: [
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
            ],
        },
        {
            title: "Torre pretensiosa",
            color: getRandomColor(),
            author: {
                displayName: "Esteban fernández",
                job: "engineer",
                location: "Caracas",
                country: "VE",
            },
            detailPics: [
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
            ],
        },
    ]);

    useEffect(() => {
        
    },[]);

    return(
        <div className="App">
            <Logo />
            <div id="carouselsContainer">
                {projects.map((project, i) => (
                    <Carousel key={i} index={i} project={project} />
                ))}
            </div>
            <Menu />
        </div>
    );
}

export default App;