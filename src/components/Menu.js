import React, {useState} from "react";
import MenuIcons from "./MenuIcons";
import Discover from "./Discover";
import User from "./User";
import Config from "./Config";

const Menu = (props) => {

    const [focused, setFocused] = useState(false);
    const [focusLocked, setFocusLocked] = useState(false);

    const handleMouseEnter = () => {
        if((window.innerHeight / window.innerWidth) >= 1) {
            return;
        }
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
        setFocused(false);
        props.setDark(false);
    }

    return(
        <div className={focused ? "menuContainer focused" : "menuContainer"} onMouseLeave={() => handleMouseLeave()}>
            <MenuIcons onMouseEnter={handleMouseEnter} intro={props.intro} />
            <div className={focused ? "menuContent focused" : "menuContent"}>
                <div className="menuSubContent"><Discover setSearch={props.setSearch} /></div>
                <div className="menuSubContent"><User setFocusLocked={setFocusLocked} /></div>
                <div className="menuSubContent"><Config setFocusLocked={setFocusLocked} /></div>
            </div>
        </div>
    );
}

export default Menu;