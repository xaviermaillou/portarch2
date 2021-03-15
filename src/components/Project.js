import React, {useState} from "react";
import AddProject from "./AddProject";
import {useProjectPictures} from "../contexts/UserContext";

const Project = (props) => {
    const [edit, setEdit] = useState(false);
    const [allowRefresh, setAllowRefresh] = useState(true);
    const projectPictures = useProjectPictures(props.project.id);

    const handleClickEdit = () => {
        setEdit(true);
    }

    return(
        <>
            {!edit && 
                <div className="projectContainer" style={{background: `url(${props.project.mainPicture})`}}>
                    <h2>{props.project.title}</h2>
                    <button className="editButton" onClick={() => handleClickEdit()}>EDIT</button>
                </div>
            }
            {edit && 
                <AddProject existingProject={props.project} existingPictures={projectPictures} setEdit={setEdit} allowRefresh={allowRefresh} setAllowRefresh={setAllowRefresh} />
            }
        </>
    );
}

export default Project;