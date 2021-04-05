import React, {useState} from "react";
import Tendency from "./Tendency";
import {search, useKeywords} from "../contexts/UserContext";

const Search = (props) => {

    const [searchString, setSearchString] = useState("");
    const [searches, setSearches] = useState([]);
    const [activateButton, setActivateButton] = useState(false);
    const keywords = useKeywords();
    const [autofill, setAutofill] = useState("");

    const [noResults, setNoResults] = useState(false);

    const handleFocus = () => {
        setActivateButton(true);
        setNoResults(false);
    }

    const handleChange = (e) => {
        setSearchString(e.target.value);
        if(e.target.value.length > 0) {
            const found = keywords.find(element => element.startsWith(e.target.value));
            setAutofill(found);
        } else {
            setAutofill("");
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            handleSubmit();
            e.target.blur();
        }
        if(e.keyCode === 39) {
            setSearchString(autofill);
        }
    }

    const handleSubmit = () => {
        search(searchString.toLowerCase(), setSearches, searches, setNoResults);
        setAutofill("");
        setSearchString("");
    }

    return(
        <div className="searchContainer">
            <div className="autofill">{autofill}</div>
            <input 
                className={noResults ? "help" : ""}
                onChange={(e) => handleChange(e)} 
                onKeyDown={(e) => handleKeyPress(e)} 
                value={searchString} 
                type="text" 
                placeholder={noResults ? "No results. Try 'Buenos Aires' for ex." : "Search..."}
                onFocus = {() => handleFocus()}
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