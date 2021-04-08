import React, {useState, useEffect} from "react";
import {useUser, uploadProject, deleteProject, deleteProjectPicture} from "../contexts/UserContext";

const AddProject = (props) => {

    const userID = useUser().state.id;

    const [mainPicture, setMainPicture] = useState();
    const [projectData, setProjectData] = useState({});
    const [pictures, setPictures] = useState([]);

    const [initOpacity, setInitOpacity] = useState(1);

    const [submitted, setSubmitted] = useState(false);
    const [remainingItems, setRemainingItems] = useState(0);
    const [existingPictures, setExistingPictures] = useState([]);
    const [keywords, setKeywords] = useState("");
    const [score, setScore] = useState(0);

    const [errorMessage1, setErrorMessage1] = useState();
    const [errorMessage2, setErrorMessage2] = useState();

    const form_id = props.existingProject ? props.existingProject.id : 0;

    useEffect(() => {
        if(props.allowRefresh && props.existingPictures) {
            setExistingPictures(props.existingPictures);
        }
    }, [props.allowRefresh, props.existingPictures]);

    useEffect(() => {
        if(props.existingProject) {
            setProjectData({
                title: props.existingProject.title,
                memoir: props.existingProject.memoir,
                author: props.existingProject.author,
            });

            setKeywords(props.existingProject.keywords.join(", "));
            setScore(props.existingProject.score);

            document.getElementById("addProject1" + form_id).classList.add("reload");

            document.getElementById("addProjectContainer" + form_id).style.backgroundImage = "url(" + props.existingProject.mainPicture + ")";
        }
    }, [props.existingProject, form_id]);

    const handleClick = (n) => {
        props.setFocusLocked(true);
        document.body.onfocus = () => {
            setTimeout((() => {
                props.setFocusLocked(false);
            }), 100);
        }
        props.setErrorMessage("");
        n ? document.getElementById("addNewProjectMainPicture" + form_id).click() : document.getElementById("addNewProjectPictures" + form_id).click()
    }

    const handleChangeMainPicture = (e) => {
        var file = e.target.files[0];
        
        if(file === undefined) {
            return;
        }

        if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setErrorMessage1("Sorry, must be jpeg or png format...");
            return;
        }

        setInitOpacity(0);
        
        setMainPicture(file);

        let filePath = URL.createObjectURL(e.target.files[0]);
        document.getElementById("addProjectContainer" + form_id).style.backgroundImage = "url(" + filePath + ")";

        setTimeout(() => {            
            document.getElementById("addProject2" + form_id).scrollIntoView({behavior: "smooth"});
        }, 2000);
    }

    const handleChangeInput = (e) => {
        setErrorMessage2();
        document.getElementById("addProject2" + form_id).firstElementChild.classList.remove("help");
        document.getElementById("addProject2" + form_id).lastElementChild.classList.remove("help");

        if(e.target.name === "keywords") {
            setKeywords(e.target.value);
            return;
        }

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
            document.getElementsByClassName("addNewProjectPicturesDisplay"+form_id)[document.getElementsByClassName("addNewProjectPicturesDisplay"+form_id).length - 1].style.backgroundImage = "url(" + filePath + ")";
        }, 500);
    }

    const handleDeleteExistingPicture = (id) => {
        deleteProjectPicture(id);
    }

    const handleDelete = () => {
        props.setEdit(false);
        deleteProject(props.existingProject.id, props.existingPictures.length);
    }

    const handleDeletePicture = (i) => {
        pictures.splice(i, 1);
        setPictures([...pictures]);
    }

    const handleSubmit = () => {
        if(!props.existingProject && mainPicture === undefined) {
            setErrorMessage1("How'd you share a project with no picture?");
            document.getElementById("addProject1" + form_id).scrollIntoView({behavior: "smooth"});
            return;
        } else if(projectData.title === undefined || projectData.memoir === undefined) {
            setErrorMessage2("Mandatory");
            document.getElementById("addProject2" + form_id).firstChild.classList.add("help");
            document.getElementById("addProject2" + form_id).lastChild.classList.add("help");
            document.getElementById("addProject2" + form_id).scrollIntoView({behavior: "smooth"});
            return;
        }

        uploadProject(
            setRemainingItems, 
            props.setAllowRefresh, 
            props.order, 
            mainPicture, 
            projectData, 
            keywords, 
            score,
            pictures, 
            userID, 
            (props.reload && props.reload), 
            ((props.existingPictures && props.existingPictures.length > 0) && props.existingPictures[props.existingPictures.length -1].order + 1), 
            (props.existingProject && props.existingProject.id), (props.existingProject && props.setEdit)
        );
        setSubmitted(true);
    }

    return(
        <div id={"addProjectContainer" + form_id} className="addProjectContainer projectContainer">

            <input 
                id={"addNewProjectMainPicture" + form_id} 
                type="file" 
                style={{display: 'none'}}
                onChange={(e) => handleChangeMainPicture(e)} />

            <input 
                id={"addNewProjectPictures" + form_id}
                type="file" 
                style={{display: 'none'}}
                onChange={(e) => handleChangePictures(e)} />

            <div 
                id={"addProject1" + form_id}
                onClick={() => handleClick(true)} 
                className="addProject1 addProjectContent"
                style={{opacity: `${initOpacity}`}}
            >
                <h2>
                    Add a new project
                </h2>
                {errorMessage1 ? 
                <span className="helpAlert">{errorMessage1}</span>
                : <p>
                    Start with a main picture
                </p>}
            </div>

            <div 
                id={"addProject2" + form_id} 
                className="addProject2 addProjectContent"
            >
                <input
                className="addProjectTitle"
                onChange={(e) => handleChangeInput(e)}
                name="title"
                value={projectData.title || ""}
                placeholder={errorMessage2 ? "No title?" : "Title"}
                autoComplete="off" />

                <input 
                className="addKeywords"
                onChange={(e) => handleChangeInput(e)}
                name="keywords"
                value={keywords || ""}
                placeholder="Keywords (city, style, materials, etc...)" />

                <textarea
                onChange={(e) => handleChangeInput(e)}
                name="memoir"
                value={projectData.memoir || ""}
                placeholder={errorMessage2 ? "Every project needs a memoir. Write at least some words..." : "Memoir"}
                autoComplete="off" />
            </div>

            <div className="addProject3 addProjectContent">
                {(existingPictures.length + pictures.length) === 0 && <p>Add some more pictures</p>}
                <div className="addNewProjectPicturesDisplayContainer">
                    {existingPictures && existingPictures.map((picture, i) => 
                        <div 
                            key={i} 
                            onClick={() => handleDeleteExistingPicture(picture.id)} 
                            className={"addNewProjectPicturesDisplay addNewProjectPicturesDisplay"+form_id} 
                            style={{background: `url(${picture.url})`}}
                        >
                        </div>
                    )} 
                    {pictures.map((picture, i) => 
                        <div 
                            key={i} 
                            onClick={() => handleDeletePicture(i)} 
                            className={"addNewProjectPicturesDisplay addNewProjectPicturesDisplay"+form_id}
                        >
                        </div>
                    )}
                    <div onClick={() => handleClick(false)} className="addNewProjectPicturesDisplay addNewProjectPicture" style={{display: `${((props.existingPictures ? props.existingPictures.length : 0) + pictures.length) < 12 ? 'block' : 'none'}`}}></div>
                </div>

                <div className="submitCover"></div>
                {!submitted && <button onClick={() => handleSubmit()}>{props.existingProject ? "UPDATE" : "ADD"}</button>}
                {submitted && <div className="submitFooter"><span>{remainingItems} item(s) remaining...</span><i className="loadingIcon" alt="loading..." /></div>}
            </div>
            {props.existingProject && <div className="formFooter">
                <button onClick={() => handleDelete()}>DELETE PROJECT</button>
                <button onClick={() => props.setEdit(false)}>CANCEL EDITING</button>
            </div>}
        </div>
    );
}

export default AddProject;