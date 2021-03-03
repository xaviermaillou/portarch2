import React, {useState} from "react";

const Profile = (props) => {

    const [user] = useState(props.author);

    return(
        <div className={props.own ? "profileContainer own" : "profileContainer"}>
            <div className={props.own ? "profilePic own" : "profilePic"}>
            </div>
            <div className={props.own ? "userInfo own" : "userInfo"}>
                <h3>{user.name}</h3>
                <p>{user.job}</p>
                <p className="userLocation">{user.location}, {user.country}</p>
            </div>
            
        </div>
    );
}

export default Profile;