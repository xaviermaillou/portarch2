import React from "react";

const Profile = (props) => {

    const handleClickProfile = () => {
        document.getElementById("icon_2").click();
    }

    const author = props.author || [];

    return(
        <div 
            className={props.own ? "profileContainer own" : "profileContainer carousel"}
            onClick={() => handleClickProfile()}
        >
            <div 
                className={props.own ? "profilePic own" : "profilePic"} 
                style={{backgroundImage: `url(${author.profilePicture})`}}
            >
                <div className={props.own ? "userInfo own" : "userInfo carousel"}>
                    <h2>{author.displayName}</h2>
                    <h2>{author.job}</h2>
                    <h2 className="userLocation">{author.location}{author.location && author.country ? ', ' : ''}{author.country}</h2>
                </div> 
            </div>  
        </div>
    );
}

export default Profile;