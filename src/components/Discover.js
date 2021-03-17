import React, {useState} from "react";
import Search from "./Search";
import Tendency from "./Tendency";

const Discover = (props) => {

    const [tendencies] = useState([
        {
            title: "Minimalism",
        },
        {
            title: "New brutalism",
        },
        {
            title: "Mies van der Rohe",
        },
        {
            title: "Construction",
        },
        {
            title: "Concrete",
        },
        {
            title: "Models",
        },
    ]);
    
    return(
        <div className="discoverContainer">
            <h1>Discover</h1>
            <Search setSearch={props.setSearch} />
            <h4>Tendencies</h4>
            {tendencies.map((tendency, i) => (
                <Tendency key={i} title={tendency.title} color={tendency.color} />
            ))}
        </div>
    );
}

export default Discover;