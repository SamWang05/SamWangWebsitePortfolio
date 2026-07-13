const titleNode = document.querySelector(".titleText");

const slideRightNode = document.querySelector(".animateSlideRight");
const smashRightNode = document.querySelector(".animateSmashRight");

const titleListenerEnter = titleNode.addEventListener("click", () => {
/*
    
*/
    slideRightNode.style.animationIterationCount = "2";
    smashRightNode.style.animationIterationCount = "2";

    slideRightNode.style.animationDirection = "reverse";
    smashRightNode.style.animationDirection = "reverse";
});