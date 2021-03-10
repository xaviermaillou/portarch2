import React, {useState, useEffect, useContext} from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.firestore().collection('users_data').where('id', '==', user.uid).onSnapshot((snapshot) => {
              const newUserData = snapshot.docs.map((doc) => ({
                ...doc.data(),
              }));
              
              setUser(newUserData[0]);
            });
        } else {
          // User is signed out
          // ...
        }
      });
    }, []);

    return <UserContext.Provider value={{state: user}}>
                {props.children}
            </UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext);
}

export const updateUser = (user) => {
  firebase.firestore().collection('users_data').doc(user.id).set(user);
}

export const signOut = () => {
  firebase.auth().signOut();
}

export const uploadPicture = (file, user) => {
  let ref = firebase.storage().ref().child('profile_pictures/' + user.id);
  ref.put(file).then((result) => {
    ref.getDownloadURL().then((url) => {
      firebase.firestore().collection('users_data').doc(user.id).update({
        profilePicture: url,
      });
    });
  });
}