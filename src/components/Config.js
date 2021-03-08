import React, {useState, useEffect} from "react";

const Config = (props) => {

    const [configUser, setConfigUser] = useState(props.user);
    const [countries, setCountries] = useState([]);

    const countriesURL = "https://restcountries.eu/rest/v2/all";

    useEffect(() => {
        if(configUser !== undefined) {
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
                if(configUser.country !== undefined) {
                    document.querySelector(`#countrySelect option[value=${configUser.country}]`).selected = "selected";
                }
            }
            fetchCountries();
        }
    }, [configUser]);

    const handleChange = (e) => {
        setConfigUser({
            ...configUser,
            [e.target.name]: e.target.value,
        });
    }

    const handleClick = () => {
        props.setUser(configUser);
    }

    return(
        <div className="configContainer">
            <h1>Settings</h1>
            <input 
                onChange={(e) => handleChange(e)} 
                value={configUser.name || ""} name="name" 
                placeholder="Name" 
                autoComplete="off">
            </input>
            <input 
                onChange={(e) => handleChange(e)} 
                value={configUser.job || ""} name="job" 
                placeholder="Profession" 
                autoComplete="off">
            </input>
            <input 
                onChange={(e) => handleChange(e)} 
                value={configUser.location || ""} name="location" 
                placeholder="City" 
                autoComplete="off">
            </input>
            <select onChange={(e) => handleChange(e)} id="countrySelect" name="country" defaultValue="null">
                <option value="null" disabled>Country</option>
                {countries.map((country, i) => (
                    <option key={i} value={country.code}>{country.name}</option>
                ))}
            </select>
            <button onClick={() => handleClick()}>Save</button>
        </div>
    );
}

export default Config;