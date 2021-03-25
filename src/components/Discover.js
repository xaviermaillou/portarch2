import React, {useState, useEffect} from "react";
import Search from "./Search";
//import Tendency from "./Tendency";

import {useTendencies, useCollections} from "../contexts/UserContext";
import Tendency from "./Tendency";

const Discover = (props) => {

    //const tendencies = useTendencies();
    const collections = useCollections();

    return(
        <div className="discoverContainer">
            <h1>Discover</h1>
            <Search setSearch={props.setSearch} />
            {collections.length > 0 && <h4>Collections</h4>}
            {collections.map((collection, i) => (
                <Tendency key={i} index={collection.name+i} title={collection.name} collection={collection.project_id} setSearch={props.setSearch} />
            ))}
            {/*<h4>Tendencies</h4>}
            {tendencies.map((tendency, i) => (
                <Tendency key={i} title={tendency.title} color={tendency.color} />
            ))*/}
        </div>
    );
}

export default Discover;