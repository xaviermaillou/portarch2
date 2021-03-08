import React, {useState} from "react";
import getRandomColor from "../helpers/getRandomColor";
import Profile from "./Profile";
import Project from "./Project";
import Log from "./Log";

const User = (props) => {

    const [alreadyMember, setAlreadyMember] = useState(true);
    const [linkBelow, setLinkBelow] = useState("Not a member yet?");
    const [errorMessage, setErrorMessage] = useState("");

    const [myProjects] = useState([
        {
            title: "Pabellón vanguardista",
            color: getRandomColor(),
        },
        {
            title: "Complejo complicado",
            color: getRandomColor(),
        },
        {
            title: "Hospital elitista",
            color: getRandomColor(),
        },
    ]);

    const handleClick = () => {
        setErrorMessage("");
        setAlreadyMember(!alreadyMember)
        !alreadyMember ? setLinkBelow("Not a member yet?") : setLinkBelow("Already member?")
    }

    const handleClickLogOut = () => {
        props.setUser(undefined);
    }

    return(
        <div className="userContainer">
            <h1>Profile</h1>
            {props.user && <Profile author={props.user} own={true} />}
            {!props.user && <Log alreadyMember={alreadyMember} setErrorMessage={setErrorMessage} setContent={props.setContent} setUser={props.setUser} />}
            {!props.user && <p className="helpLink" onClick={() => handleClick()}>{linkBelow}</p>}
            {!props.user && <p className="helpAlert">{errorMessage}</p>}
            {props.user && myProjects.map((project, i) => (
                <Project key={i} title={project.title} color={project.color} />
            ))}
            {props.user && <p className="helpLink" onClick={() => handleClickLogOut()}>Sign out</p>}
        </div>
    );
}

export default User;