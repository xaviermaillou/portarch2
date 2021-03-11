import React from "react";

const DetailPic = (props) => {

    const handleClick = () => {
        props.select(props.index);
    }

    return(
        <div onClick={() => handleClick()} className="detailPic" style={{background: `url(${props.picture})`}}>
            
        </div>
    );
}

export default DetailPic;