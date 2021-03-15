import React from "react";
import {useUser, addFavorite} from "../contexts/UserContext";

const Badge = (props) => {

    const user = useUser().state;

    return(
        <div className="badge">
            <h2>{props.title}</h2>
            <div 
                onClick={() => addFavorite(props.id, user.id, props.favorite)} 
                className={props.favorite ? "addFavorite selected" : "addFavorite"}
            ></div>
        </div>
    );
}

export default Badge;