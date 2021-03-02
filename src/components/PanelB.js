import React, {useState, useEffect} from "react";
import DetailPic from "./DetailPic";

const PanelB = (props) => {

    const [selectedPic, setSelectedPic] = useState();

    const handleClick = () => {
        let zoomedPic = document.getElementById("zoomedPic");
        zoomedPic.style.display = "none";
        zoomedPic.style.opacity = 0;
        setSelectedPic(undefined);
        
    }

    useEffect(() => {
        if(selectedPic !== undefined) {
            let zoomedPic = document.getElementById("zoomedPic");
            zoomedPic.style.backgroundColor = props.pictures[selectedPic];
            zoomedPic.style.display = "block";
            zoomedPic.style.opacity = 1;
        }
    }, [selectedPic, props.pictures]);

    return(
        <div className="panelContainer panelBContainer">
            <div onClick={() => handleClick()} id="zoomedPic"></div>
            <div className="detailPicsContainer">
                {props.pictures.map((picture, i) => (
                    <DetailPic key={i} index={i} color={picture} select={setSelectedPic} />
                ))}
            </div>
        </div>
    );
}

export default PanelB;