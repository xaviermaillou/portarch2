import React from "react";
import {useProjectsByIdsArray} from "../contexts/UserContext";

const Tendency = (props) => {
    const userCollection = useProjectsByIdsArray(props.collection);
    const collection = props.result ? props.result : userCollection;

    const handleClick = () => {
        document.getElementById("searchResultsContainer").scrollTop = 0;
        props.setSearch({
            title: props.title,
            projects: collection
        });
        let containers = document.getElementsByClassName("tendencyCover");
        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.remove("selected");
        }
        document.getElementById("tendencyCover" + props.index).classList.add("selected");
        if((window.innerHeight / window.innerWidth) >= 1) {
            document.getElementsByClassName("logoContainer")[0].click();
        }
    }

    const handleClose = (e, result) => {
        e.stopPropagation();
        if(result) {
            props.setSearches(props.searches.filter((obj) => {
                return obj.id !== props.index;
            }))
        }
    }

    return(
        <div onClick={() => handleClick()} className="tendencyContainer">
            <div className="results">
                {collection && collection.map((element, i) => (
                    <div key={i} className="result" style={{backgroundImage: `url(${element.mainPicture})`}}></div>
                ))}
            </div>
            <div id={"tendencyCover" + props.index} className="tendencyCover">
                <h2>{props.title}</h2>
                <p>{collection !== undefined && collection.length} result(s)</p>
                {props.result && <div onClick={(e) => handleClose(e, props.result)} className="close"></div>}
            </div>
        </div>
    );
}

export default Tendency;