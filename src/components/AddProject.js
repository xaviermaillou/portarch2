import React from "react";

const AddProject = () => {

    const handleClick = () => {
        document.getElementById("addNewProjectMainPicture").click();
    }

    const handleChange = (e) => {
        var file = e.target.files[0];

        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
            return;
        }
    }

    return(
        <div onClick={() => handleClick()} className="addProjectContainer projectContainer">
            <input 
                id="addNewProjectMainPicture" 
                type="file" 
                style={{display: 'none'}}
                onChange={(e) => handleChange(e)} />
        </div>
    );
}

export default AddProject;