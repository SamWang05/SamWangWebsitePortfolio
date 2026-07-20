const timelineLine = document.querySelector(".timelineLine");
const timelineDisplay = document.querySelector(".timelineDisplay");

let timelineCurrentLength = 300;
const ONE_SCROLL_PX_INCREMENT = 100;

function timelineScrollListener(sliderNode) {
    let lastScrollPos = 0.0;
    let currentScrollPos = 0.0;
    let differentialScroll = 0.0;

    document.addEventListener("scrollend", (event) => {
        currentScrollPos = document.scrollingElement.scrollTop;

        console.log();

        differentialScroll = currentScrollPos - lastScrollPos;

        sliderNode.animate([
            {
                height: String(timelineCurrentLength) + "px"
            },
            {
                height: String(timelineCurrentLength + differentialScroll) + "px"
            }
        ],
            {
                duration: 2000,
                iterations: 1,
                fill: "forwards",
                easing: "ease-in-out",
            }
        )

        timelineCurrentLength = timelineCurrentLength + differentialScroll;
        
        lastScrollPos = currentScrollPos;
    });
}

function renderTimeline() {
    const timelineSliderFrame = document.createElement("div");

        timelineSliderFrame.style.backgroundColor = "#DDD9D3";
        
        timelineSliderFrame.style.width = "30px";
        timelineSliderFrame.style.height = "2000px";

        timelineSliderFrame.style.padding = "5px";

        timelineSliderFrame.style.borderRadius = "15px";

        timelineLine.appendChild(timelineSliderFrame);

    const timelineSlider = document.createElement("div");

        timelineSlider.style.backgroundColor = "#8C7B6B";

        timelineSlider.style.width = "20px";
        
        timelineSlider.style.height = timelineCurrentLength + "px";
        timelineSlider.style.minHeight = "10%";
        timelineSlider.style.maxHeight = "90%";

        timelineSlider.style.borderRadius = "10px";

        timelineSliderFrame.appendChild(timelineSlider);

    return timelineSlider;
}

function main() {
    const timelineSliderNode = renderTimeline();
    timelineScrollListener(timelineSliderNode);
}

main();