import React, {useState} from "react";

const Profile = (props) => {

    const [userInfo] = useState(props.author || {
        name: "ducito",
        job: "architect",
        location: "Bariloche",
        country: "AR",
    });

    return(
        <div className={props.own ? "profileContainer own" : "profileContainer"}>
            <div className={props.own ? "profilePic own" : "profilePic"}>
            </div>
            <div className={props.own ? "userInfo own" : "userInfo"}>
                <h3>{userInfo.name}</h3>
                <p>{userInfo.job}</p>
                <p className="userLocation">{userInfo.location}, {userInfo.country}</p>
            </div>
            
        </div>
    );
}

export default Profile;