import React, {useState} from "react";
import firebase from "firebase/app";
import "firebase/auth";

const SignUp = (props) => {

    const [newUser, setNewUser] = useState({});

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    }

    const handleClick = () => {
        if(props.alreadyMember) {
            firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                props.setErrorMessage(error.message);
        });
        } else {
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);
                setTimeout(() => {
                    props.setContent(2);
                }, 100);
            })
            .catch((error) => {
                props.setErrorMessage(error.message);
            });
        }
    }

    return(
        <div className="signUpContainer">
            <input onChange={(e) => handleChange(e)} name="email" type="mail" placeholder="Enter email"></input>
            <input onChange={(e) => handleChange(e)} name="password" type="password" placeholder="Enter password"></input>
            <button onClick={() => handleClick()}>{props.alreadyMember ? "Sign in" : "Sign up"}</button>
        </div>
    );
}

export default SignUp;