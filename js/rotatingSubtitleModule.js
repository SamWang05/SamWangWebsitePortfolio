const rotatingCaptionNode = document.querySelector(".rotatingCaption");
const introDisplayNode = document.querySelector(".introDisplay");

const animationDuration = 3500; // duration in ms

const subtitleTextArray = [
    "Education",
    "Employment",
    "Extracurriculars",
];



function initializeRotatingCaption() {
    const rotatingTextNode = document.createElement("div");

    rotatingTextNode.classList.add("subtitleText");
    rotatingTextNode.classList.add("animateCaption");
    // CSS Tag with animation data. Can't use .animate in JS because we need animationiteration event listener

    rotatingTextNode.textContent = subtitleTextArray[0];

    rotatingCaptionNode.appendChild(rotatingTextNode);

    return rotatingTextNode;
}

function clearRotatingDisplay() {
    rotatingCaptionNode.replaceChildren();
}

function animationListener(rotatingTextNode) {
    let animationIterations = 1; // Tracks progress of cycling animation

    rotatingTextNode.addEventListener("animationiteration", () => { 
        // Upon each iteration's end, cycles to next subtitle and cycles animationIterations counter until fully cycled, then repeat
        rotatingTextNode.textContent = subtitleTextArray[animationIterations];

        animationIterations++;

        if (animationIterations > subtitleTextArray.length - 1) {
            animationIterations = 0;
        }
    });


    animationIterations = 1;

}

function main() {
    const rotatingText = initializeRotatingCaption();

    animationListener(rotatingText);
}

main();