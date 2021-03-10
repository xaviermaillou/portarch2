import React from "react";
import {useUser, uploadPicture} from "../contexts/UserContext";

const PictureConfig = (props) => {
    const user = useUser().state;

    const handleClick = () => {
        document.getElementById("changePictureInput").click();
    }

    const handleChange = (e) => {
        var file = e.target.files[0];

        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
            return;
        }

        uploadPicture(file, user);
    }

    return(
        <div 
            className="configProfilePic" 
            style={{backgroundImage: `url(${user.profilePicture})`}}
            onClick={() => handleClick()}>
            <input 
                id="changePictureInput" 
                type="file" 
                style={{display: 'none'}}
                onChange={(e) => handleChange(e)} />
        </div>
    );
}

export default PictureConfig;