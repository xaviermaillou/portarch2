import React, {useState} from "react";
import MenuIcons from "./MenuIcons";
import Discover from "./Discover";
import User from "./User";
import Config from "./Config";

const Menu = (props) => {

    const [content, setContent] = useState(0);
    const [focused, setFocused] = useState(true);

    let timeout;

    const handleMouseEnter = () => {
        if((window.innerHeight / window.innerWidth) >= 1) {
            return;
        }
        //window.clearTimeout(timeout);
        //setFocused(true);
        props.setDark(true);
    }
    const handleMouseLeave = () => {
        if((window.innerHeight / window.innerWidth) >= 1) {
            return;
        }
        //timeout = setTimeout(() => {
            //setFocused(false);
        //}, 2000);
        props.setDark(false);
    }

    return(
        <div className="menuContainer">
            <MenuIcons onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} selected={content} setSelected={setContent} />
            <div 
                className={focused ? "menuContent focused" : "menuContent"}
                onMouseEnter={() => handleMouseEnter()} 
                onMouseLeave={() => handleMouseLeave()}
            >
                <div style={content === 0 ? {display: "block"} : {display: "none"}}><Discover setSearch={props.setSearch} /></div>
                <div style={content === 2 ? {display: "block"} : {display: "none"}}><Config /></div>
                <div style={content === 1 ? {display: "block"} : {display: "none"}}><User setContent={setContent} /></div>
            </div>
        </div>
    );
}

export default Menu;