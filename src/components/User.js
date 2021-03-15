import React, {useState, useEffect} from "react";
import Profile from "./Profile";
import Project from "./Project";
import Log from "./Log";
import AddProject from "./AddProject";
import {useUser, signOut, useAuthorProjects} from "../contexts/UserContext";

const User = (props) => {

    const user = useUser();
    const [alreadyMember, setAlreadyMember] = useState(true);
    const [linkBelow, setLinkBelow] = useState("Not a member yet?");
    const [errorMessage, setErrorMessage] = useState("");
    const [enabledForm, setEnabledForm] = useState(true);
    const [allowRefresh, setAllowRefresh] = useState(true);
    const [myProjects, setMyProjects] = useState([]);

    const loadedProjects = useAuthorProjects((user.state !== undefined ? user.state.id : 0));

    useEffect(() => {
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

    const reloadForm = () => {
        console.log("reloaded");
        setEnabledForm(false);
        setEnabledForm(true);
    }

    return(
        <div className="userContainer">
            <h1>Profile</h1>
            {user.state === undefined && <Log alreadyMember={alreadyMember} setErrorMessage={setErrorMessage} setContent={props.setContent} />}
            {user.state === undefined && <p className="helpLink" onClick={() => handleClick()}>{linkBelow}</p>}
            {user.state === undefined && <p className="helpAlert">{errorMessage}</p>}
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