import React, {useState, useEffect} from "react";
import Search from "./Search";
import Tendency from "./Tendency";

import {useTendencies} from "../contexts/UserContext";

const Discover = (props) => {

    const tendencies = useTendencies();

    return(
        <div className="discoverContainer">
            <h1>Discover</h1>
            <Search setSearch={props.setSearch} />
            {/*<h4>Tendencies</h4>}
            {tendencies.map((tendency, i) => (
                <Tendency key={i} title={tendency.title} color={tendency.color} />
            ))*/}
        </div>
    );
}

export default Discover;