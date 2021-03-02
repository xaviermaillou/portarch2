import React, {useState} from "react";
import getRandomColor from "../helpers/getRandomColor";
import Profile from "./Profile";
import Project from "./Project";

const User = () => {

    const [myProjects] = useState([
        {
            title: "Pabellón vanguardista",
            color: getRandomColor(),
        },
        {
            title: "Complejo complicado",
            color: getRandomColor(),
        },
        {
            title: "Hospital elitista",
            color: getRandomColor(),
        },
    ]);

    return(
        <div className="userContainer">
            <h1>Profile</h1>
            <Profile own={true} />
            {myProjects.map((project, i) => (
                <Project key={i} title={project.title} color={project.color} />
            ))}
        </div>
    );
}

export default User;