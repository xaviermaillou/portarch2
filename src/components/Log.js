import React, {useState} from "react";

const Log = (props) => {

    const [newUser, setNewUser] = useState({});

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    }

    const handleClick = () => {
        if(props.alreadyMember) {
            props.setUser(newUser);
        } else {
            props.setUser(newUser);
        }
    }

    return(
        <div className="signUpContainer">
            <input onChange={(e) => handleChange(e)} value={newUser.email || ""} name="email" type="mail" placeholder="Enter email"></input>
            <input onChange={(e) => handleChange(e)} value={newUser.password || ""} name="password" type="password" placeholder="Enter password"></input>
            <button onClick={() => handleClick()}>{props.alreadyMember ? "Sign in" : "Sign up"}</button>
        </div>
    );
}

export default Log;