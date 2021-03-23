import React from "react";

const Profile = (props) => {

    const handleClickProfile = () => {
        document.getElementById("icon_2").click();
    }

    const author = props.author || [];

    return(
        <div 
            className={props.own ? "profileContainer own" : "profileContainer"}
            onClick={() => handleClickProfile()}
        >
            <div 
                className={props.own ? "profilePic own" : "profilePic"} 
                style={{backgroundImage: `url(${author.profilePicture})`}}
            >
            </div>
            <div className={props.own ? "userInfo own" : "userInfo"}>
                <h3>{author.displayName}</h3>
                <p>{author.job}</p>
                <p className="userLocation">{author.location}{author.location && author.country ? ', ' : ''}{author.country}</p>
            </div>   
        </div>
    );
}

export default Profile;