import React, {useState, useEffect, useContext} from "react";
import splitToKeywords from "../helpers/splitToKeywords";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

//NPM Package to compress images
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
        }
      });
    }, []);

    const [collections, setCollections] = useState([]);

    useEffect(() => {
      if(user === undefined) {
        return;
      }
    
      firebase.firestore().collection('collections').where('author_id', '==', user.id).onSnapshot((snapshot) => {
        const collection = [];
        snapshot.docs.map((doc) => (
          collection.push(doc.data())
        ));
        setCollections(collection);
      });
    }, [user]);

    return <UserContext.Provider value={{state: user, collections: collections}}>
                {props.children}
            </UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext);
}

//Updates user's data (displayName, job, city, country)
export const updateUser = (user, setLoading, setSaved) => {
  firebase.firestore().collection('users_data').doc(user.id).update(user, {merge: true})
    .then(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 1000);
    });
}

//Sign out
export const signOut = () => {
  firebase.auth().signOut();
}

//Uploads/updates user's profile picture
export const uploadPicture = (file, user, setLoading) => {
  setLoading(true);

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
        setLoading(false);
      });
    });
  })
  .catch(function (error) {
    console.log(error.message);
  });;
}

//Gets all the projects for the main stream
export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('projects').orderBy('score', 'desc').onSnapshot((snapshot) => {
      console.log("Loading projects: " + snapshot.docs.length);
      const project = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(project);
    });
  }, []);

  return projects;
}

//Gets the secondary pictures for each project (taking its id)
export const useProjectPictures = (id) => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('project_pictures').where('project_id', '==', id).orderBy('order').onSnapshot((snapshot) => {
      //console.log("Loading project's pictures: " + snapshot.docs.length);
      const picture = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPictures(picture);
    });
  }, [id]);

  return pictures;
}

//Uploads/updates a project
export const uploadProject = (setRemainingItems, setAllowRefresh, order, mainPicture, data, keywords, score, pictures, userID, reload, i = 0, projectID, setEdit) => {

  //First, creates an ID (which will be used all along the process): whether the actual project's id (if updating an existing one), or creating a random one
  let id = projectID ? projectID : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  //Sums the quantity of uploads needed: 
  //one for all the string data (always), 
  //one for the main picture (mainPicture !== undefined ?), 
  //and one for each secondary picture (pictures.length)
  let remainingUploads = pictures.length + (mainPicture !== undefined ? 2 : 1);

  //if(remainingUploads === 0 && projectID !== undefined) {setEdit(false)}
  //Unables user's projects refresh when uploading 
  //to prevent the project to appear gradually on his profile while uploading 
  //and, on the other hand, unables the newly uploaded secondary pictures to appear in the form while uploading the project
  setAllowRefresh(false);

  //Compress plugin options
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  //Used for the indicator of remaining items during the upload
  setRemainingItems(remainingUploads);

  let keywordsArray;
  if(keywords.length > 0) {
    keywordsArray = keywords.split(",");
  } else {
    keywordsArray = [];
  }
  keywordsArray.forEach((keyword, i) => {
      keywordsArray[i] = keyword.replace(/\s+/g," ").replace(/^\s+|\s+$/,'').toLowerCase();
  });
  //Uploads/updates the project's data document with the previously set id
  firebase.firestore().collection('projects').doc(id).set({
    id: id,
    title: data.title,
    memoir: data.memoir,
    author: userID,
    order: order,
    search_words: splitToKeywords(data.title).concat(splitToKeywords(keywords)),
    keywords: keywordsArray,
    score: score,
  }, {merge: true}).then(() => {
    remainingUploads--;
    setRemainingItems(remainingUploads);
    if(remainingUploads === 0 && projectID !== undefined) {setEdit(false); setAllowRefresh(true)}
    else if(remainingUploads === 0 && projectID === undefined) {reload(); setAllowRefresh(true)}
  });

  if(keywordsArray.length > 0) {
    keywordsArray.forEach((keyword) => {
      firebase.firestore().collection('keywords').doc(keyword).set({
        keyword: keyword,
        projects: firebase.firestore.FieldValue.arrayUnion(id),
        score: firebase.firestore.FieldValue.increment(1),
      }, {merge: true});
    });
  }

  //If there is a new main picture uploaded, uploads this picture to the storage
  if(mainPicture !== undefined) {
    let ref = firebase.storage().ref().child('project_pictures/' + id);
    imageCompression(mainPicture, options).then((compressedFile) => {
      ref.put(compressedFile).then((result) => {
        ref.getDownloadURL().then((url) => {
          //... then takes the url to put it in the project's main picture document (creating a new one if it is a new project)
          firebase.firestore().collection('projects').doc(id).set({
            mainPicture: url,
          }, {merge: true});
          remainingUploads--;
          setRemainingItems(remainingUploads);
          //Now if it was the last upload, 
          //whether it just unsets the edition mode of the project's container (in case of updating an existing one)...
          if(remainingUploads === 0 && projectID !== undefined) {setEdit(false); setAllowRefresh(true)}
          //...or reloads the <AddProject /> component to empty it (in case of new project)
          else if(remainingUploads === 0 && projectID === undefined) {reload(); setAllowRefresh(true)}
        });
      });
    });
  }
  
  //If there are uploaded secondary pictures, uploads them to the storage
  if(pictures !== undefined) {
    pictures.forEach((picture, index) => {
      let ref = firebase.storage().ref().child('project_pictures/' + id + (index + i));
      imageCompression(picture, options).then((compressedFile) => {
        ref.put(compressedFile).then((result) => {
          ref.getDownloadURL().then((url) => {
            //... then takes the url to put it in the 'project_pictures' collection, one document created per picture uploaded
            firebase.firestore().collection('project_pictures').doc(id + (index + i)).set({
              project_id: id,
              url: url,
              order: index + i,
            });
            remainingUploads--;
            setRemainingItems(remainingUploads);
            //Now if it was the last upload, 
            //whether it just unsets the edition mode of the project's container (in case of updating an existing one)...
            if(remainingUploads === 0 && projectID !== undefined) {setEdit(false); setAllowRefresh(true)}
            //...or reloads the <AddProject /> component to empty it (in case of new project)
            else if(remainingUploads === 0 && projectID === undefined) {reload(); setAllowRefresh(true)}
          });
        });
      });
    });
  }
}

//Deletes the project, needs the quantity of secondary pictures to delete all of them from storage (because cannot iterate through storage files)
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

  //Manual iteration to delete all the files from storage
  firebase.storage().ref().child('project_pictures/' + id).delete();
  for (let i = 0; i < picturesQuantity; i++) {
    firebase.storage().ref().child('project_pictures/' + id + i).delete();
  }
}

//Deletes one specific secondary picture of a project with its name
export const deleteProjectPicture = (fileName) => {
  firebase.firestore().collection('project_pictures').doc(fileName).delete();
  firebase.storage().ref().child('project_pictures/' + fileName).delete();
}

//Gets the project's author user's data (taking his id)
export const useAuthorData = (id) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if(id === undefined) {
      return;
    }
    firebase.firestore().collection('users_data').where('id', '==', id).onSnapshot((snapshot) => {
      //console.log("Loading project's author profile");
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setData(data);
    });
  }, [id]);

  return data;
}

//Get the projects from a specific user (with his id)
export const useAuthorProjects = (id) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if(id === undefined) {
      return;
    }
    firebase.firestore().collection('projects').where('author', '==', id).orderBy('order').onSnapshot((snapshot) => {
      //console.log("Loading author's projects: " + snapshot.docs.length);
      const project = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(project);
    });
  }, [id]);

  return projects;
}

//Changes the project's order
export const changeProjectOrder = (user, order, n) => {
  firebase.firestore().collection('projects').where('author', '==', user).where('order', '==', order).limit(1).get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      firebase.firestore().collection('projects').doc(doc.id).set({
        order: firebase.firestore.FieldValue.increment(n),
      }, {merge: true});
    });
  });
  firebase.firestore().collection('projects').where('author', '==', user).where('order', '==', order+n).limit(1).get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      firebase.firestore().collection('projects').doc(doc.id).set({
        order: firebase.firestore.FieldValue.increment(-n),
      }, {merge: true});
    });
  });
}

//Adds/removes favorite (taking project's id, user's id and if favorited (boolean))
export const addFavorite = (id, userID, favorite) => {
  if(!favorite) {
    firebase.firestore().collection('projects').doc(id).set({
      score: firebase.firestore.FieldValue.increment(1),
    }, {merge: true});
    firebase.firestore().collection('favorites').doc(id+userID).set({
      project_id: id,
      author_id: userID,
    });
  } else if(favorite) {
    firebase.firestore().collection('projects').doc(id).set({
      score: firebase.firestore.FieldValue.increment(-1),
    }, {merge: true});
    firebase.firestore().collection('favorites').doc(id+userID).delete();
  }
}

//Gets all the user's favorites (just to know which projects are favorited (their ids), it doesn't uploads the projects with all their data)
export const useFavorites = (userID) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if(userID === 0) {
      return;
    }
    firebase.firestore().collection('favorites').where('author_id', '==', userID).onSnapshot((snapshot) => {
      //console.log("Loading user's favorites: " + snapshot.docs.length);
      const favorite = [];
      snapshot.docs.map((doc) => (
        favorite.push(doc.data().project_id)
      ));
      setFavorites(favorite);
    });
  }, [userID]);

  return favorites;
}

//Adds/removes to a collection (taking project's id, user's id, collection's name and if added (boolean))
export const addCollection = (id, userID, collectionName, added = false) => {
  if(!added) {
    firebase.firestore().collection('collections').doc(collectionName.split(" ").join("-")+"_"+userID).set({
      project_id: firebase.firestore.FieldValue.arrayUnion(id),
      author_id: userID,
      name: collectionName,
    }, {merge: true});
  } else if(added) {
    firebase.firestore().collection('collections').doc(collectionName.split(" ").join("-")+"_"+userID).set({
      project_id: firebase.firestore.FieldValue.arrayRemove(id),
      author_id: userID,
      name: collectionName,
    }, {merge: true});
  }
}

export const useCollections = () => {
  return useContext(UserContext).collections;
}

//Gets all the keywords, to help user writing a search query
export const useKeywords = () => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('keywords').orderBy('score', 'desc').onSnapshot((snapshot) => {
      const keyword = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      let keywordsArray = [];
      keyword.forEach((key) => {
        keywordsArray.push(key.keyword);
      });
      setKeywords(keywordsArray);
    });
  }, []);

  return keywords;
}

//Searchs through projects' keywords
export const search = (str, setSearches, searches, setNoResults) => {
  if(str.length === 0) {
    return;
  }
  //Creates a random id for each search resuls pack (for DOM purposes)
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  firebase.firestore().collection('projects').where('search_words', 'array-contains-any', splitToKeywords(str)).onSnapshot((snapshot) => {
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if(result.length === 0) {
      setNoResults(true);
      return;
    }
    if(setSearches !== undefined && searches !== undefined) {
      setSearches(searches => [...searches, {id: id, search: str, result: result}]);
    } else {
      return result;
    }
  });
}

export const useTendencies = () => {
  const [tendencies, setTendencies] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('keywords').orderBy('score', 'desc').limit(5).onSnapshot((snapshot) => {
      const tendency = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setTendencies(tendency);
    });
  }, []);
  return tendencies;
}

export const useProjectById = (id) => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('projects').doc(id).onSnapshot((snapshot) => {
      //console.log("Loading project by id: " + snapshot.doc.data());
      setProject(snapshot.doc.data());
    });
  });

  return project;
}

export const useProjectsByIdsArray = (IdsArray) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if(IdsArray.length === 0) {
      return;
    }
    firebase.firestore().collection('projects').where('id', 'in', IdsArray).onSnapshot((snapshot) => {
      //console.log("Loading projects by id: " + snapshot.docs.length);
      const project = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setProjects(projects => [...projects, project]);
    });
  }, [IdsArray]);
  return projects[projects.length - 1];
}