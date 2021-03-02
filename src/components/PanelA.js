import React, {useState} from "react";
import Badge from "./Badge";

const PanelA = (props) => {

    const [coverOpacity, setCoverOpacity] = useState(0);

    const clickHandler = () => {
        coverOpacity === 0 ? setCoverOpacity(1) : setCoverOpacity(0);
    }

    return(
        <div className="panelContainer panelAContainer" style={{backgroundColor: `${props.color}`}}>
            <div onClick={() => clickHandler()} className="panelACover" style={{opacity: `${coverOpacity}`}}>
                <Badge title={props.title} />
            </div>
        </div>
    );
}

export default PanelA;