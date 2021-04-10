import React, {useState, useEffect} from "react";

const MenuIcons = (props) => {

    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const icons = document.getElementsByClassName("menuIcon");
        for(let i = 0; i < icons.length; i++) {
            icons[i].classList.remove("selected");
            icons[i].style.opacity = 0.5;
        }
        document.getElementById("icon_" + selected).classList.add("selected");
        document.getElementById("icon_" + selected).style.opacity = 1;
    }, [selected]);

    const handleClick = (num) => {
        setSelected(num);
        document.getElementsByClassName("menuSubContent")[num].scrollIntoView();
    }

    return(
        <div className={props.intro ? "menuIconsContainer intro" : "menuIconsContainer"} onMouseEnter={() => props.onMouseEnter()}>
            <div onClick={() => handleClick(0)} id="icon_0" className="menuIcon"></div>
            <div onClick={() => handleClick(1)} id="icon_1" className="menuIcon"></div>
            <div onClick={() => handleClick(2)} id="icon_2" className="menuIcon"></div>
        </div>
    )
}

export default MenuIcons;