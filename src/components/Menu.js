import React, {useState} from "react";
import MenuIcons from "./MenuIcons";
import Discover from "./Discover";
import User from "./User";
import Config from "./Config";

const Menu = () => {

    const [content, setContent] = useState(0);

    return(
        <div className="menuContainer">
            <MenuIcons selected={content} setSelected={setContent} />
            <div className="menuContent">
                {content === 0 && <Discover />}
                {content === 1 && <User />}
                {content === 2 && <Config />}
            </div>
        </div>
    );
}

export default Menu;