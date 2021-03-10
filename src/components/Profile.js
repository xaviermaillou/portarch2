import React, {useState} from "react";
import {useUser} from "../contexts/UserContext";

const Profile = (props) => {

    const user = useUser().state;
    const [author] = useState(props.author || user);

    return(
        <div className={props.own ? "profileContainer own" : "profileContainer"}>
            <div className={props.own ? "profilePic own" : "profilePic"} style={{backgroundImage: `url(${author.profilePicture})`}}>
            </div>
            <div className={props.own ? "userInfo own" : "userInfo"}>
                <h3>{author.displayName}</h3>
                <p>{author.job}</p>
                <p className="userLocation">{author.location}, {author.country}</p>
            </div>   
        </div>
    );
}

export default Profile;