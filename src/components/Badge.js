import React, {useEffect, useState} from "react";
import AddCollection from "./AddCollection";
import {useUser, addFavorite, useCollections} from "../contexts/UserContext";

const Badge = (props) => {

    const user = useUser().state;
    const collections = useCollections();
    const [willAddCollection, setWillAddCollection] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        collections.forEach((collection) => {
            if(collection.project_id.includes(props.id)) {
                setAdded(true)
            }
        });
    }, [collections, props.id]);

    const handleClickCollection = () => {
        setWillAddCollection(!willAddCollection);
    }

    return(
        <div className="badge">
            <h2>{props.title}</h2>
            {user !== undefined && 
                <div 
                    onClick={() => addFavorite(props.id, user.id, props.favorite)} 
                    className={props.favorite ? "addFavorite selected" : "addFavorite"}
                ></div>
            }
            {willAddCollection && <AddCollection id={props.id} collections={props.collections} />}
            {user !== undefined && 
                <div
                    onClick={() => handleClickCollection()}
                    className={(willAddCollection ? "addCollectionIcon focus" : "addCollectionIcon") + " " + (added ? "selected" : "")}
                ></div>
            }
        </div>
    );
}

export default Badge;