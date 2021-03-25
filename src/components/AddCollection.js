import React, {useState} from "react";
import {useUser, addCollection, useCollections} from "../contexts/UserContext";

const AddCollection = (props) => {

    const user = useUser().state;
    const collections = useCollections();
    const [activateButton, setActivateButton] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");

    const handleChange = (e) => {
        setNewCollectionName(e.target.value);
    }

    const handleSubmit = (collectionName, added) => {
        setNewCollectionName("");
        addCollection(props.id, user.id, collectionName, added);
    }

    return(
        <div className="addCollectionContainer">
            <div className="collectionSelect">
                <h2>Add new collection</h2>
                <input 
                    onChange={(e) => handleChange(e)}
                    placeholder="Name"
                    value={newCollectionName}
                    onFocus = {() => setActivateButton(true)}
                    onBlur = {() => setActivateButton(false)}
                ></input>
                <button 
                    style={activateButton ? {opacity: "1"} : {opacity: "0"}}
                    onClick={() => handleSubmit(newCollectionName.toLowerCase())}
                >OK</button>
            </div>
            {collections !== undefined &&
                collections.map((collection, i) => (
                    <div 
                        key={i}
                        className={"collectionSelect " + (collection.project_id.includes(props.id) ? "added" : "")} 
                        onClick={() => handleSubmit(collection.name, collection.project_id.includes(props.id))}>
                        <h2>{collection.name}</h2>
                    </div>
                ))
            }
            <div className="collectionSelect"></div>
        </div>
    );
}

export default AddCollection;