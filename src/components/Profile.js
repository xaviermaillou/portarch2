import React from "react";

const Profile = (props) => {

    const handleClickEditProfile = (own) => {
        own ? document.getElementById("icon_2").click() : console.log("work in progress...");
    }

    const author = props.author || [];

    return(
        <div className={props.own ? "profileContainer own" : "profileContainer carousel"}>
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
            {props.own &&
                <div className="userOptionsContainer">
                    <div className="userOption"><a href={"/portfolio/"+author.id} target="_blank" rel="noreferrer">Share</a></div>
                    <div className="userOption" onClick={() => handleClickEditProfile(props.own)}></div>
                </div>
            }
        </div>
    );
}

export default Profile;