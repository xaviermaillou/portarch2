import React from "react";

const Tendency = (props) => {
    const handleClick = () => {
        props.setSearch({
            title: props.title,
            projects: props.result
        });
        let containers = document.getElementsByClassName("tendencyCover");
        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.remove("selected");
        }
        document.getElementById("tendencyCover" + props.index).classList.add("selected");
    }

    return(
        <div onClick={() => handleClick()} className="tendencyContainer">
            <div className="results">
                {props.result && props.result.map((result, i) => (
                    <div key={i} className="result" style={{backgroundImage: `url(${result.mainPicture})`}}></div>
                ))}
            </div>
            <div id={"tendencyCover" + props.index} className="tendencyCover">
                <h2>{props.title}</h2>
            </div>
        </div>
    );
}

export default Tendency;