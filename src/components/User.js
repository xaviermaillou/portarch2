import React, {useState, useEffect} from "react";
import Profile from "./Profile";
import Project from "./Project";
import Log from "./Log";
import AddProject from "./AddProject";
import {useUser, signOut, useAuthorProjects} from "../contexts/UserContext";

const User = (props) => {

    const user = useUser();

    //Used for the connexion form, goes to <Log /> component
    const [alreadyMember, setAlreadyMember] = useState(true);

    //Sets the message of the link below the connexion's form
    const [linkBelow, setLinkBelow] = useState("Not a member yet?");
    const [errorMessage, setErrorMessage] = useState("");

    //Little state used to reload the <AddProject /> component
    const [enabledForm, setEnabledForm] = useState(true);

    //Unables user's projects refresh when uploading 
    //to prevent the project to appear gradually on his profile while uploading 
    //and, on the other hand, unables the newly uploaded secondary pictures to appear in the form while uploading the project
    const [allowRefresh, setAllowRefresh] = useState(true);
    const [myProjects, setMyProjects] = useState([]);

    //Firstly gets the user's projects before putting them inside myProjects state...
    const loadedProjects = useAuthorProjects((user.state !== undefined ? user.state.id : 0));

    useEffect(() => {
        //... if refresh is allowed, the loaded projects are put inside the myProjects state
        //in order to be displayed in User's menu
        if(allowRefresh) {
            setMyProjects(loadedProjects);
        }
    }, [allowRefresh, loadedProjects]);

    const handleClick = () => {
        setErrorMessage("");
        setAlreadyMember(!alreadyMember)
        !alreadyMember ? setLinkBelow("Not a member yet?") : setLinkBelow("Already member?")
    }

    const handleClickLogOut = () => {
        signOut();
        window.location.reload(false);
    }

    //Reloads the <AddProject /> component when new project is fully uploaded (in order to empty the component and reload it new)
    const reloadForm = () => {
        console.log("reloaded");
        setEnabledForm(false);
        setEnabledForm(true);
    }

    return(
        <div className="userContainer">
            <h1>Profile</h1>
            {/* If user is NOT connected */}
            {user.state === undefined && <Log alreadyMember={alreadyMember} setErrorMessage={setErrorMessage} setContent={props.setContent} />}
            {user.state === undefined && <p className="helpLink" onClick={() => handleClick()}>{linkBelow}</p>}
            {user.state === undefined && <p className="helpAlert">{errorMessage}</p>}

            {/* If user is connected */}
            {user.state !== undefined && <Profile own={true} author={user.state} />}
            {user.state !== undefined && myProjects.map((project, i) => (
                <Project key={i} project={project} />
            ))}
            {(user.state !== undefined && enabledForm) && <AddProject reload={() => reloadForm()} allowRefresh={allowRefresh} setAllowRefresh={setAllowRefresh} />}
            {user.state !== undefined && <p className="helpLink" onClick={() => handleClickLogOut()}>Sign out</p>}
        </div>
    );
}

export default User;