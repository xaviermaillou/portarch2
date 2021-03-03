import React, {useState, useEffect} from "react";
import "./App.css";
import getRandomColor from "./helpers/getRandomColor";
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";
import Logo from "./components/Logo";

import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBtctlFklyaETF31TFot-UevHhsr5RGFQY",
    authDomain: "portarch-a9e42.firebaseapp.com",
    projectId: "portarch-a9e42",
    storageBucket: "portarch-a9e42.appspot.com",
    messagingSenderId: "297460194995",
    appId: "1:297460194995:web:08a01445bf37ac2afe1ac6"
};
firebase.initializeApp(firebaseConfig);

const App = () => {

    const [user, setUser] = useState(undefined);

    const [projects] = useState([
        {
            title: "Casa copada",
            color: getRandomColor(),
            author: {
                name: "Pablo Gutierrez",
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
                name: "laura Mendez",
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
                name: "Esteban fernández",
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
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setUser({
                  id: user.uid,
                  name: user.displayName,
                  pic: user.photoURL,
              })
            } else {
              setUser(undefined);
            }
        });
    });

    return(
        <div className="App">
            <Logo />
            <div id="carouselsContainer">
                {projects.map((project, i) => (
                    <Carousel key={i} index={i} project={project} />
                ))}
            </div>
            <Menu user={user} setUser={setUser} />
        </div>
    );
}

export default App;