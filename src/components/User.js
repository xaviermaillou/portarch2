import React, {useState} from "react";
import Profile from "./Profile";
import Project from "./Project";
import Log from "./Log";
import AddProject from "./AddProject";
import {useUser, signOut, useAuthorProjects} from "../contexts/UserContext";

const User = (props) => {

    const user = useUser();
    console.log(user);
    const [alreadyMember, setAlreadyMember] = useState(true);
    const [linkBelow, setLinkBelow] = useState("Not a member yet?");
    const [errorMessage, setErrorMessage] = useState("");

    const myProjects = useAuthorProjects(user.state !== undefined ? user.state.id : 0);

    const handleClick = () => {
        setErrorMessage("");
        setAlreadyMember(!alreadyMember)
        !alreadyMember ? setLinkBelow("Not a member yet?") : setLinkBelow("Already member?")
    }

    const handleClickLogOut = () => {
        signOut();
        window.location.reload(false);
    }

    return(
        <div className="userContainer">
            <h1>Profile</h1>
            {user.state === undefined && <Log alreadyMember={alreadyMember} setErrorMessage={setErrorMessage} setContent={props.setContent} />}
            {user.state === undefined && <p className="helpLink" onClick={() => handleClick()}>{linkBelow}</p>}
            {user.state === undefined && <p className="helpAlert">{errorMessage}</p>}
            {user.state !== undefined && <Profile own={true} author={user.state} />}
            {user.state !== undefined && myProjects.map((project, i) => (
                <Project key={i} title={project.title} picture={project.mainPicture} />
            ))}
            {user.state !== undefined && <AddProject />}
            {user.state !== undefined && <p className="helpLink" onClick={() => handleClickLogOut()}>Sign out</p>}
        </div>
    );
}

export default User;