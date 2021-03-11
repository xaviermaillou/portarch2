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

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('projects').onSnapshot((snapshot) => {
      const project = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(project);
    });
  }, []);

  return projects;
}

export const useProjectPictures = (id) => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('project_pictures').where('project_id', '==', id).onSnapshot((snapshot) => {
      const picture = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setPictures(picture);
    });
  }, [id]);

  return pictures;
}

export const uploadProject = (mainPicture, data, pictures, userID) => {

  let randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  firebase.firestore().collection('projects').doc(randomID).set({
    title: data.title,
    memoir: data.memoir,
    author: userID,
  }, {merge: true});

  let ref = firebase.storage().ref().child('project_pictures/' + randomID);
  ref.put(mainPicture).then((result) => {
    ref.getDownloadURL().then((url) => {
      firebase.firestore().collection('projects').doc(randomID).set({
        mainPicture: url,
      }, {merge: true});
    });
  });

  let i = 0;
  pictures.forEach((picture) => {
    let ref = firebase.storage().ref().child('project_pictures/' + randomID + i);
    ref.put(picture).then((result) => {
      ref.getDownloadURL().then((url) => {
        firebase.firestore().collection('project_pictures').doc().set({
          project_id: randomID,
          url: url,
        });
      });
    });
    i++;
  });
}

export const useAuthorData = (id) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('users_data').where('id', '==', id).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setData(data);
    });
  }, [id]);

  return data;
}

export const useAuthorProjects = (id) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if(id === 0) {
      return;
    }
    firebase.firestore().collection('projects').where('author', '==', id).onSnapshot((snapshot) => {
      const project = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(project);
    });
  }, [id]);

  return projects;
}