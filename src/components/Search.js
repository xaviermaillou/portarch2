import React, {useState} from "react";

const Search = () => {

    const[search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return(
        <div className="searchContainer">
            <input onChange={(e) => handleChange(e)} value={search} type="text" placeholder="Search..."></input>
        </div>
    );
}

export default Search;