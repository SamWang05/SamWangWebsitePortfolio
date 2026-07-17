const rotatingCaptionNode = document.querySelector(".rotatingCaption");
const introDisplayNode = document.querySelector(".introDisplay");

const animationDuration = 3500; // duration in ms

const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.1
};

const subtitleTextArray = [
    "Title1",
    "Title2",
    "Title3",
    "Title4",
    "Title5"
];

let animationIterations = 1;



function renderRotatingCaption() {
    const rotatingTextNode = document.createElement("div");

    rotatingTextNode.classList.add("subtitleText");
    rotatingTextNode.classList.add("animateCaption");

    rotatingTextNode.textContent = subtitleTextArray[0];

    rotatingCaptionNode.appendChild(rotatingTextNode);

    return rotatingTextNode;
}

function clearRotatingDisplay() {
    rotatingCaptionNode.replaceChildren();
}

function main() {
    const observeIntroDisplay = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                const rotatingText = renderRotatingCaption();

                rotatingText.addEventListener("animationiteration", () => {
                    rotatingText.textContent = subtitleTextArray[animationIterations];

                    animationIterations++;

                    if (animationIterations > subtitleTextArray.length - 1) {
                        animationIterations = 0;
                    }
                });
            }
            else {
                clearRotatingDisplay();

                animationIterations = 1;
            }
        });
    }, observerOptions);

    observeIntroDisplay.observe(introDisplayNode);
}

main();