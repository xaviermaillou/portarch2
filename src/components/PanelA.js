import React, {useState} from "react";
import Badge from "./Badge";

const PanelA = (props) => {

    const [coverOpacity, setCoverOpacity] = useState(0);

    const clickHandler = (e) => {
        if(e.target.classList.contains("addFavorite") 
            || e.target.classList.contains("addCollectionIcon") 
            || e.target.classList.contains("addCollectionContainer")
            || e.target.classList.contains("collectionSelect")
            || (e.target.tagName === "H2" && e.target.parentElement.classList.contains("collectionSelect"))
            || e.target.tagName === "INPUT"
            || e.target.tagName === "BUTTON"
        ) {
            return;
        }
        coverOpacity === 0 ? setCoverOpacity(1) : setCoverOpacity(0);
    }

    return(
        <div className="panelContainer panelAContainer" style={{background: `url(${props.picture})`}}>
            <div onClick={(e) => clickHandler(e)} className="panelACover" style={{opacity: `${coverOpacity}`}}>
                <Badge 
                    title={props.title} 
                    id={props.id} 
                    favorite={props.favorite} 
                />
            </div>
        </div>
    );
}

export default PanelA;