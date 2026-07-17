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
]

function renderRotatingCaption(subtitleText) {
    const rotatingTextNode = document.createElement("div");

    rotatingTextNode.classList.add("subtitleText");
    rotatingTextNode.textContent = subtitleText;

    rotatingCaptionNode.appendChild(rotatingTextNode);

    animateRotatingText(rotatingTextNode);
}

function animateRotatingText(rotatingCaptionNode) {
    rotatingCaptionNode.animate([
        {
            transformOrigin: "bottom",
            transform: "rotateX(-90deg)"
        },
        {
            transformOrigin: "bottom",
            transform: "rotateX(0deg)",
            offset: 0.05
        },
        {
            transformOrigin: "bottom",
            transform: "rotateX(0deg)",
            offset: 0.95
        },
        {
            transformOrigin: "bottom",
            transform: "rotateX(90deg)"
        }
    ],
        {
            duration: animationDuration,
            iterations: Infinity,
            fill: "forwards",
            easing: "ease-in-out",
        }
    )
}

function clearRotatingText(rotatingCaptionNode) {
    rotatingCaptionNode.textContent = "";
}

function clearRotatingDisplay() {
    rotatingCaptionNode.replaceChildren();
}

function main() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                const rotatingText = renderRotatingCaption("test");
            }
            else {
                clearRotatingDisplay();
            }
        });
    }, observerOptions);

    observer.observe(introDisplayNode);
}

main();