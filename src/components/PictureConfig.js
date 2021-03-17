import React, {useState} from "react";
import {useUser, uploadPicture} from "../contexts/UserContext";

const PictureConfig = (props) => {
    const user = useUser().state;
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        document.getElementById("changePictureInput").click();
    }

    const handleChange = (e) => {
        var file = e.target.files[0];

        if(file === undefined) {
            return;
        }

        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
            return;
        }

        uploadPicture(file, user, setLoading);
    }

    return(
        <div 
            className={"configProfilePic " + (loading && "loading")} 
            style={loading ? {} : {backgroundImage: `url(${user.profilePicture})`}}
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