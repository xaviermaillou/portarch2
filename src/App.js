import React, {useState} from "react";
import "./App.css";
import getRandomColor from "./helpers/getRandomColor";
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";
import Logo from "./components/Logo";

const App = () => {

    const [user, setUser] = useState({
        name: "ducito",
        job: "architect",
        location: "Bariloche",
        country: "AR",
    });

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