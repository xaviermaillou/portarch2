import React, {useEffect} from "react";

const MenuIcons = (props) => {

    useEffect(() => {
        const icons = document.getElementsByClassName("menuIcon");
        for(let i = 0; i < icons.length; i++) {
            icons[i].classList.remove("selected");
            icons[i].style.opacity = 0.5;
        }
        document.getElementById("icon_" + props.selected).classList.add("selected");
        document.getElementById("icon_" + props.selected).style.opacity = 1;
    }, [props.selected]);

    const handleClick = (num) => {
        props.setSelected(num);
    }

    return(
        <div className="menuIconsContainer">
            <div onClick={() => handleClick(0)} id="icon_0" className="menuIcon"></div>
            <div onClick={() => handleClick(1)} id="icon_1" className="menuIcon"></div>
            <div onClick={() => handleClick(2)} id="icon_2" className="menuIcon"></div>
        </div>
    )
}

export default MenuIcons;