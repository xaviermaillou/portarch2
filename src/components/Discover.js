import React, {useState} from "react";
import getRandomColor from "../helpers/getRandomColor";
import Search from "./Search";
import Tendency from "./Tendency";

const Discover = (props) => {

    const [tendencies] = useState([
        {
            title: "Minimalism",
            color: getRandomColor(),
        },
        {
            title: "New brutalism",
            color: getRandomColor(),
        },
        {
            title: "Mies van der Rohe",
            color: getRandomColor(),
        },
        {
            title: "Construction",
            color: getRandomColor(),
        },
        {
            title: "Concrete",
            color: getRandomColor(),
        },
        {
            title: "Models",
            color: getRandomColor(),
        },
    ]);
    
    return(
        <div className="discoverContainer">
            <h1>Tendencies</h1>
            <Search />
            {tendencies.map((tendency, i) => (
                <Tendency key={i} title={tendency.title} color={tendency.color} />
            ))}
        </div>
    );
}

export default Discover;