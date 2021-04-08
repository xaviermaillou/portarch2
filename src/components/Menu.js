import React, {useState} from "react";
import MenuIcons from "./MenuIcons";
import Discover from "./Discover";
import User from "./User";
import Config from "./Config";

const Menu = (props) => {
    //console.log("Menu loaded");

    const [content, setContent] = useState(0);
    const [focused, setFocused] = useState(false);
    const [focusLocked, setFocusLocked] = useState(false);

    //let timeout;

    const handleMouseEnter = () => {
        if((window.innerHeight / window.innerWidth) >= 1) {
            return;
        }
        //window.clearTimeout(timeout);
        setFocused(true);
        props.setDark(true);
    }
    const handleMouseLeave = () => {
        if((window.innerHeight / window.innerWidth) >= 1) {
            return;
        }
        if(focusLocked) {
            return;
        }
        //timeout = setTimeout(() => {
            setFocused(false);
        //}, 2000);
        props.setDark(false);
    }

    return(
        <div className={focused ? "menuContainer focused" : "menuContainer"} onMouseLeave={() => handleMouseLeave()}>
            <MenuIcons onMouseEnter={handleMouseEnter} selected={content} setSelected={setContent} intro={props.intro} />
            <div className={focused ? "menuContent focused" : "menuContent"}>
                <div style={content === 0 ? {display: "block"} : {display: "none"}}><Discover setSearch={props.setSearch} /></div>
                <div style={content === 1 ? {display: "block"} : {display: "none"}}><User setContent={setContent} setFocusLocked={setFocusLocked} /></div>
                <div style={content === 2 ? {display: "block"} : {display: "none"}}><Config setFocusLocked={setFocusLocked} /></div>
            </div>
        </div>
    );
}

export default Menu;