import React, {useState} from "react";
import MenuIcons from "./MenuIcons";
import Discover from "./Discover";
import User from "./User";
import Config from "./Config";

const Menu = (props) => {

    const [content, setContent] = useState(0);

    return(
        <div className="menuContainer">
            <MenuIcons selected={content} setSelected={setContent} />
            <div className="menuContent">
                <div style={content === 0 ? {display: "block"} : {display: "none"}}><Discover setSearch={props.setSearch} /></div>
                <div style={content === 2 ? {display: "block"} : {display: "none"}}><Config /></div>
                <div style={content === 1 ? {display: "block"} : {display: "none"}}><User setContent={setContent} /></div>
            </div>
        </div>
    );
}

export default Menu;