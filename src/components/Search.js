import React, {useState} from "react";
import Tendency from "./Tendency";
import {search} from "../contexts/UserContext";

const Search = (props) => {

    const [searchString, setSearchString] = useState("");
    const [searches, setSearches] = useState([]);

    const handleChange = (e) => {
        setSearchString(e.target.value);
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            search(searchString.toLowerCase(), setSearches, searches);
            setSearchString("");
        }
    }

    return(
        <div className="searchContainer">
            <input onChange={(e) => handleChange(e)} onKeyPress={(e) => handleKeyPress(e)} value={searchString} type="text" placeholder="Search..."></input>
            <div className="resultsContainer">
                {searches.length > 0 && searches.map((search, i) => (
                    <Tendency key={i} index={search.id} title={search.search} result={search.result} setSearch={props.setSearch} />
                ))}
            </div>
        </div>
    );
}

export default Search;