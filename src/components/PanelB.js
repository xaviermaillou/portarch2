import React, {useState, useEffect} from "react";
import DetailPic from "./DetailPic";
import {useProjectPictures} from "../contexts/UserContext";

const PanelB = (props) => {

    const pictures = useProjectPictures(props.id);

    const [selectedPic, setSelectedPic] = useState();

    const suffix = props.ownProject ? "own_" : "";

    const handleClick = () => {
        let zoomedPic = document.getElementById(suffix + "zoomedPic" + props.id);
        zoomedPic.style.display = "none";
        zoomedPic.style.opacity = 0;
        setSelectedPic(undefined);
    }

    useEffect(() => {
        if(selectedPic !== undefined) {
            let zoomedPic = document.getElementById(suffix + "zoomedPic" + props.id);
            zoomedPic.style.background = "url(" +  pictures[selectedPic].url + ")";
            zoomedPic.style.display = "block";
            zoomedPic.style.opacity = 1;
        }
    }, [selectedPic, pictures, props.id, suffix]);

    return(
        <div className="panelContainer panelBContainer">
            <div onClick={() => handleClick()} id={suffix + "zoomedPic" + props.id} className="zoomedPic"></div>
            <div className="detailPicsContainer">
                {pictures && pictures.map((picture, i) => (
                    <DetailPic key={i} index={i} select={setSelectedPic} picture={picture.url} />
                ))}
            </div>
            <div className="projectMemoir">
                <p>
                    <b>
                        " 
                    </b>
                    {props.memoir}
                </p>
            </div>
        </div>
    );
}

export default PanelB;