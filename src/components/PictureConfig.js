import React from "react";
import {useUser, updateUser} from "../contexts/UserContext";

const PictureConfig = (props) => {
    const user = useUser()

    return(
        <div className="configProfilePic" style={{backgroundImage: `url(${user.picture})`}}>

        </div>
    );
}

export default PictureConfig;