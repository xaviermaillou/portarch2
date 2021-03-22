import React, {useState} from "react";
import AddProject from "./AddProject";
import {useProjectPictures, changeProjectOrder} from "../contexts/UserContext";

const Project = (props) => {
    const [edit, setEdit] = useState(false);
    const [allowRefresh, setAllowRefresh] = useState(true);
    const projectPictures = useProjectPictures(props.project.id);

    const handleClickEdit = () => {
        setEdit(true);
    }

    const handleClickOrder = (n) => {
        changeProjectOrder(props.user, props.project.order, n);
    }

    return(
        <>
            {!edit && 
                <div className="projectContainer" style={{background: `url(${props.project.mainPicture})`}}>
                    {props.project.order !== 0 && 
                        <div 
                            onClick={() => handleClickOrder(-1)} 
                            className="arrowContainer arrowContainer-up"
                        >
                            <div className="arrow-up"></div>
                        </div>
                    }
                    {props.project.order !== (props.maxOrder - 1) && 
                        <div 
                        onClick={() => handleClickOrder(1)} 
                            className="arrowContainer arrowContainer-down"
                        >
                            <div className="arrow-down"></div>
                        </div>
                    }
                    <h2>{props.project.title}</h2>
                    <div className="submitCover"></div>
                    <button className="editButton" onClick={() => handleClickEdit()}>EDIT</button>
                </div>
            }
            {edit && 
                <AddProject 
                    existingProject={props.project} 
                    existingPictures={projectPictures} 
                    setEdit={setEdit} allowRefresh={allowRefresh} 
                    setAllowRefresh={setAllowRefresh} 
                    order={props.project.order}
                />
            }
        </>
    );
}

export default Project;