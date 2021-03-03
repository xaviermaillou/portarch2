import React, {useState, useEffect} from "react";

const Config = (props) => {

    const [user, setUser] = useState(props.user || undefined);
    const [countries, setCountries] = useState([]);

    const countriesURL = "https://restcountries.eu/rest/v2/all";

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const handleClick = () => {
        props.saveChanges(user);
    }

    useEffect(() => {
        if(user !== undefined) {
            const fetchCountries = async () => {
                const response = await fetch(countriesURL);
                const responseJSON = await response.json();
                let countries_copy = [];
                
                responseJSON.map((country) => (
                    countries_copy.push({
                        name: country.name,
                        code: country.alpha2Code,
                    })
                ));
        
                setCountries(countries_copy);
                //document.querySelector(`#countrySelect option[value="GR"`).selected = "selected";
                if(user.country !== undefined) {
                    document.querySelector(`#countrySelect option[value=${user.country}]`).selected = "selected";
                }
            }
            fetchCountries();
        }
    }, [user]);

    return(
        <div className="configContainer">
            <h1>Settings</h1>
            {user !== undefined && <div className="configProfilePic"></div>}
            {user !== undefined && <input onChange={(e) => handleChange(e)} name="name" type="text" value={user.name || ""} placeholder="Name"></input>}
            {user !== undefined && <input onChange={(e) => handleChange(e)} name="job" type="text" value={user.job || ""} placeholder="Profession"></input>}
            {user !== undefined && <input onChange={(e) => handleChange(e)} name="location" type="text" value={user.location || ""} placeholder="City"></input>}
            {user !== undefined && <select onChange={(e) => handleChange(e)} name="country" id="countrySelect" defaultValue="select">
                <option value="select" disabled>Country</option>
                {countries.map((country, i) => (
                    <option key={i} value={country.code}>{country.name}</option>
                ))}
            </select>}
            <button onClick={() => handleClick()}>Save</button>
        </div>
    );
}

export default Config;