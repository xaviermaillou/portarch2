import React, {useState, useContext} from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(undefined);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
          // User is signed out
          // ...
        }
      });

    return <UserContext.Provider value={{state: user, update: setUser}}>
                {props.children}
            </UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext);
}