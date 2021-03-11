import React, {useState} from "react";
//import {useUser} from "../contexts/UserContext";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Log = (props) => {

    //const user = useUser();
    const [newUser, setNewUser] = useState({});

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    }

    const handleClick = () => {
        if(props.alreadyMember) {
            firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password);
        } else {
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((userCredential) => {
                let id = userCredential.user.uid;
                firebase.firestore().collection('users_data').doc(id).set({
                    id: id,
                });
            });
            
            props.setContent(2);
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