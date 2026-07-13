const titleNode = document.querySelector(".titleText");

const slideRightNode = document.querySelector(".animateSlideRight");
const smashRightNode = document.querySelector(".animateSmashRight");

const titleListenerEnter = titleNode.addEventListener("mouseover", () => {

    slideRightNode.style.animationDirection = "reverse";
    smashRightNode.style.animationDirection = "reverse";
});