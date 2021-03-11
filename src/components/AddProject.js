import React, {useState} from "react";
import {useUser, uploadProject} from "../contexts/UserContext";

const AddProject = () => {

    const userID = useUser().state.id;

    const [mainPicture, setMainPicture] = useState();
    const [projectData, setProjectData] = useState({});
    const [pictures, setPictures] = useState([]);

    const [initOpacity, setInitOpacity] = useState(1);

    const handleClick = (n) => {
        n ? document.getElementById("addNewProjectMainPicture").click() : document.getElementById("addNewProjectPictures").click()
    }

    const handleChangeMainPicture = (e) => {
        var file = e.target.files[0];
        
        if(file === undefined) {
            return;
        }

        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
            return;
        }

        setInitOpacity(0);

        setMainPicture(file);

        let filePath = URL.createObjectURL(e.target.files[0]);
        document.getElementsByClassName("addProjectContainer")[0].style.backgroundImage = "url(" + filePath + ")";

        setTimeout(() => {
            document.getElementsByClassName("addProject2")[0].scrollIntoView({behavior: "smooth"});
        }, 1000);
    }

    const handleChangeInput = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value,
        });
    }

    const handleChangePictures = (e) => {
        var file = e.target.files[0];

        if(file === undefined) {
            return;
        }

        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
            return;
        }

        setPictures([
            ...pictures,
            file,
        ]);

        let filePath = URL.createObjectURL(e.target.files[0]);
        setTimeout(() => {
            document.getElementsByClassName("addNewProjectPicturesDisplay")[document.getElementsByClassName("addNewProjectPicturesDisplay").length - 2].style.backgroundImage = "url(" + filePath + ")";
        }, 500);
    }

    const handleDeletePicture = (i) => {
        pictures.splice(i, 1);
        setPictures([...pictures]);
    }

    const handleSubmit = () => {
        uploadProject(mainPicture, projectData, pictures, userID);
    }

    return(
        <div className="addProjectContainer projectContainer">

            <input 
                id="addNewProjectMainPicture" 
                type="file" 
                style={{display: 'none'}}
                onChange={(e) => handleChangeMainPicture(e)} />

            <input 
                id="addNewProjectPictures" 
                type="file" 
                style={{display: 'none'}}
                onChange={(e) => handleChangePictures(e)} />

            <div 
                onClick={() => handleClick(true)} 
                className="addProject1 addProjectContent"
                style={{opacity: `${initOpacity}`}}>
                <h2>
                    Add a new project
                </h2>
                <p>
                    Start with a main picture
                </p>
            </div>

            <div className="addProject2 addProjectContent">

                <input
                className="addProjectTitle"
                onChange={(e) => handleChangeInput(e)}
                name="title"
                value={projectData.title || ""}
                placeholder="Title"
                autoComplete="off" />

                <textarea
                onChange={(e) => handleChangeInput(e)}
                name="memoir"
                value={projectData.memoir || ""}
                placeholder="Memoir"
                autoComplete="off" />

            </div>

            <div className="addProject3 addProjectContent">

                <div className="addNewProjectPicturesDisplayContainer">
                    {pictures.map((picture, i) => 
                        <div key={i} onClick={() => handleDeletePicture(i)} className="addNewProjectPicturesDisplay">
                        </div>
                    )}
                    <div onClick={() => handleClick(false)} className="addNewProjectPicturesDisplay addNewProjectPicture" style={{display: `${pictures.length < 12 ? 'block' : 'none'}`}}></div>
                </div>

                <button onClick={() => handleSubmit()}>Add</button>

            </div>

        </div>
    );
}

export default AddProject;