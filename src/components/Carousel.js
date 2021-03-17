import React, {useState, useEffect} from "react";
import PanelA from "./PanelA";
import PanelB from "./PanelB";
import Portfolio from "./Portfolio";

const Carousel = (props) => {

    //noAuthor prop is true when it is a portfolio's carousel, which means there is no author at the end

    //Entire carousel's opacity
    const [opacity, setOpacity] = useState(1);

    //Enables a div at the end of portfolio's carousels (author's projects) to allow Panel B to be scrolled completely to the left
    const [ghostDiv, setGhostDiv] = useState(false);

    useEffect(() => {
        //If portrait display and is not a portfolio's carousel (has an author at the end)
        //opacity is set to 0.25
        if((window.innerHeight / window.innerWidth) >= 1 && !props.noAuthor) {
            setOpacity(0.25);
            //Except if it is the first carousel
            if(props.index === 0) {
                setOpacity(1);
            }
            //Also, a scroll event listener is added, which gets the distance between the carousel and the top of the screen
            document.getElementById('carouselsContainer').addEventListener('scroll', function() {
                const scrollPosition = document.getElementById("carousel_" + props.index).getBoundingClientRect().top;
                //If the carousel's top edge's distance with top of the screen is between 0 and a third of the display height,
                //opacity is set to 1, otherwise 0.25
                if(scrollPosition >= 0 && scrollPosition <= (window.innerHeight / 3)) {
                    setOpacity(1);
                } else {
                    setOpacity(0.25);
                }
            });
            
        }
        //The ghost div is only needed if landscape display, and if the carousel is inside a portfolio (otherwise the author section at the end plays the same role as the ghost div)
        if((window.innerHeight / window.innerWidth) <= 1 && props.noAuthor) {
            setGhostDiv(true);
        }
    }, [props.index, props.noAuthor]);

    return(
        <div id={!props.noAuthor ? "carousel_" + props.index : undefined} className="carouselContainer" style={{opacity: `${opacity}`}}>
            <PanelA picture={props.project.mainPicture} title ={props.project.title} id={props.project.id} favorite={props.favorite} />
            <PanelB id={props.project.id} memoir={props.project.memoir} ownProject={props.noAuthor} />
            {!props.noAuthor && <Portfolio author={props.project.author} />}
            {ghostDiv && <div className="ghostDiv" style={{width: `${window.innerWidth - window.innerHeight}px`}}></div>}
        </div>
    );
}

export default Carousel;