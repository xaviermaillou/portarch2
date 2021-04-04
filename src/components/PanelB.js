import React, {useState, useEffect} from "react";
import DetailPic from "./DetailPic";
import {useProjectPictures} from "../contexts/UserContext";

const PanelB = (props) => {
    //console.log("Panel B loaded - of: " + props.id);

    const pictures = useProjectPictures(props.id);

    const [selectedPic, setSelectedPic] = useState();
    const [index] = useState(props.index);

    const suffix = props.ownProject ? "own_" : "";
    const suffix2 = props.resultProject ? "result_" : "";

    const handleClick = () => {
        let zoomedPic = document.getElementById(suffix + suffix2 + "zoomedPic" + props.id + index);
        zoomedPic.style.display = "none";
        zoomedPic.style.opacity = 0;
        setSelectedPic(undefined);
    }

    useEffect(() => {
        if(selectedPic !== undefined) {
            let zoomedPic = document.getElementById(suffix + suffix2 + "zoomedPic" + props.id + index);
            zoomedPic.style.backgroundImage = "url(" +  pictures[selectedPic].url + ")";
            zoomedPic.style.display = "block";
            zoomedPic.style.opacity = 1;
        }
    }, [selectedPic, pictures, props.id, suffix, suffix2, index]);

    return(
        <div className="panelContainer panelBContainer">
            <div onClick={() => handleClick()} id={suffix + suffix2 + "zoomedPic" + props.id + index} className="zoomedPic"></div>
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