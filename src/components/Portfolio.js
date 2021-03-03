import React, {useState} from "react";
import Carousel from "./Carousel";
import Profile from "./Profile";
import getRandomColor from "../helpers/getRandomColor";

const Portfolio = (props) => {

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
        <div className="panelContainer portfolioContainer">
            <Profile author={props.author} />
            {projects.map((project, i) => (
                <Carousel key={i} project={project} noAuthor={true} />
            ))}
        </div>
    );
}

export default Portfolio;