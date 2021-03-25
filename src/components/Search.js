import React, {useState} from "react";
import Tendency from "./Tendency";
import {search} from "../contexts/UserContext";

const Search = (props) => {

    const [searchString, setSearchString] = useState("");
    const [searches, setSearches] = useState([]);
    const [activateButton, setActivateButton] = useState(false);

    const handleChange = (e) => {
        setSearchString(e.target.value);
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            search(searchString.toLowerCase(), setSearches, searches);
            setSearchString("");
            e.target.blur();
        }
    }

    const handleSubmit = () => {
        search(searchString.toLowerCase(), setSearches, searches);
        setSearchString("");
    }

    return(
        <div className="searchContainer">
            <input 
                onChange={(e) => handleChange(e)} 
                onKeyPress={(e) => handleKeyPress(e)} 
                value={searchString} 
                type="text" 
                placeholder="Search..."
                onFocus = {() => setActivateButton(true)}
                onBlur = {() => setActivateButton(false)}
            ></input>
            <button 
                style={activateButton ? {opacity: "1"} : {opacity: "0"}}
                onClick={() => handleSubmit()}
            >OK</button>
            <div className="resultsContainer">
                {searches.length > 0 && searches.map((search, i) => (
                    <Tendency 
                        key={i} 
                        index={search.id} 
                        title={search.search} 
                        result={search.result} 
                        setSearch={props.setSearch} 
                        collection={[]}
                    />
                ))}
            </div>
        </div>
    );
}

export default Search;