import React, {useState, useEffect, useContext} from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import imageCompression from 'browser-image-compression';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log("Loading user " + user.uid);
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
  firebase.firestore().collection('users_data').doc(user.id).update(user, {merge: true});
}

export const signOut = () => {
  firebase.auth().signOut();
}

export const uploadPicture = (file, user) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 540,
    useWebWorker: true
  }
  
  let ref = firebase.storage().ref().child('profile_pictures/' + user.id);
  imageCompression(file, options).then((compressedFile) => {
    ref.put(compressedFile).then((result) => {
      ref.getDownloadURL().then((url) => {
        firebase.firestore().collection('users_data').doc(user.id).update({
          profilePicture: url,
        });
      });
    });
  })
  .catch(function (error) {
    console.log(error.message);
  });;
}

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log("Loading projects");
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
    console.log("Loading projects' pictures");
    firebase.firestore().collection('project_pictures').where('project_id', '==', id).onSnapshot((snapshot) => {
      const picture = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPictures(picture);
    });
  }, [id]);

  return pictures;
}

export const uploadProject = (setRemainingItems, setAllowRefresh, mainPicture, data, pictures, userID, reload, i = 0, projectID, setEdit) => {

  let id = projectID ? projectID : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let remainingUploads = pictures.length + (mainPicture !== undefined ? 2 : 1);
  if(remainingUploads === 0 && projectID !== undefined) {setEdit(false)}
  setAllowRefresh(false);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  setRemainingItems(remainingUploads);

  firebase.firestore().collection('projects').doc(id).set({
    title: data.title,
    memoir: data.memoir,
    author: userID,
  }, {merge: true}).then(() => {
    remainingUploads--;
    setRemainingItems(remainingUploads);
    if(remainingUploads === 0 && projectID !== undefined) {setEdit(false); setAllowRefresh(true)}
    else if(remainingUploads === 0 && projectID === undefined) {reload(); setAllowRefresh(true)}
  });

  if(mainPicture !== undefined) {
    let ref = firebase.storage().ref().child('project_pictures/' + id);
    imageCompression(mainPicture, options).then((compressedFile) => {
      ref.put(compressedFile).then((result) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection('projects').doc(id).set({
            mainPicture: url,
          }, {merge: true});
          remainingUploads--;
          setRemainingItems(remainingUploads);
          if(remainingUploads === 0 && projectID !== undefined) {setEdit(false); setAllowRefresh(true)}
          else if(remainingUploads === 0 && projectID === undefined) {reload(); setAllowRefresh(true)}
        });
      });
    });
  }
  
  if(pictures !== undefined) {
    pictures.forEach((picture, index) => {
      let ref = firebase.storage().ref().child('project_pictures/' + id + (index + i));
      imageCompression(picture, options).then((compressedFile) => {
        ref.put(compressedFile).then((result) => {
          ref.getDownloadURL().then((url) => {
            firebase.firestore().collection('project_pictures').doc(id + (index + i)).set({
              project_id: id,
              url: url,
            });
            remainingUploads--;
            setRemainingItems(remainingUploads);
            if(remainingUploads === 0 && projectID !== undefined) {setEdit(false); setAllowRefresh(true)}
            else if(remainingUploads === 0 && projectID === undefined) {reload(); setAllowRefresh(true)}
          });
        });
      });
    });
  }
}

export const deleteProject = (id, picturesQuantity) => {
  firebase.firestore().collection('projects').doc(id).delete();
  firebase.firestore().collection('project_pictures').where('project_id', '==', id).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      doc.ref.delete();
    });
  });
  firebase.firestore().collection('favorites').where('project_id', '==', id).get().then((snapshot) => {
    snapshot.forEach((doc) => {
      doc.ref.delete();
    });
  });
  firebase.storage().ref().child('project_pictures/' + id).delete();
  for (let i = 0; i < picturesQuantity; i++) {
    firebase.storage().ref().child('project_pictures/' + id + i).delete();
  }
}

export const deleteProjectPicture = (fileName) => {
  firebase.firestore().collection('project_pictures').doc(fileName).delete();
  firebase.storage().ref().child('project_pictures/' + fileName).delete();
}

export const useAuthorData = (id) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Loading author's data");
    if(id === 0) {
      return;
    }
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
    console.log("Loading author's projects");
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

export const addFavorite = (id, userID, favorite) => {
  if(!favorite) {
    firebase.firestore().collection('favorites').doc(id+userID).set({
      project_id: id,
      author_id: userID,
    });
  } else if(favorite) {
    firebase.firestore().collection('favorites').doc(id+userID).delete();
  }
}

export const useFavorites = (userID) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if(userID === 0) {
      return;
    }
    firebase.firestore().collection('favorites').where('author_id', '==', userID).onSnapshot((snapshot) => {
      console.log("Loading favorites " + userID);
      const favorite = [];
      snapshot.docs.map((doc) => (
        favorite.push(doc.data().project_id)
      ));
      setFavorites(favorite);
    });
  }, [userID]);

  return favorites;
}