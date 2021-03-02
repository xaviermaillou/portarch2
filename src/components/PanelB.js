import React from "react";
import DetailPic from "./DetailPic";

const PanelB = (props) => {
    return(
        <div className="panelContainer panelBContainer">
            <div className="detailPicsContainer">
                {props.pictures.map((picture, i) => (
                    <DetailPic key={i} color={picture} />
                ))}
            </div>
        </div>
    );
}

export default PanelB;