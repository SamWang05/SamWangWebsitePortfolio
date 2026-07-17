const timelineLineNode = document.querySelector(".timelineLine");

let currentTimelineSliderPos = "30"; // measured in px;

function initializeSliderScroll(timelineSliderNode) {
    document.addEventListener("scroll", () => {
        timelineSliderNode.animate([
            {height: "30px"},
            {height: "40px"}
        ],
            {
                duration: 500,
                iterations: 1,
                fill: "forwards",
                easing: "ease-in-out",
            }
        )
    });
}

function initializeTimelineSlider() {
    const timelineFrame = document.createElement("div");
        timelineFrame.style.display = "flex";

        timelineFrame.style.justifyContent = "center";

        timelineFrame.style.backgroundColor = "#DDD9D3";

        timelineFrame.style.width = "30px";
        timelineFrame.style.height = "1000px";

        timelineFrame.style.margin = "50px";
        timelineFrame.style.padding = "5px";

        timelineFrame.style.borderRadius = "15px";

        timelineLineNode.appendChild(timelineFrame);

    const timelineSlider = document.createElement("div");

        timelineSlider.style.backgroundColor = "#8C7B6B";

        timelineSlider.style.width = "20px";
        timelineSlider.style.height = "30px";

        timelineSlider.style.borderRadius = "10px";

        timelineFrame.appendChild(timelineSlider);

        return timelineSlider
}

function main() {
    const sliderNode = initializeTimelineSlider();
    initializeSliderScroll(sliderNode);
}

main();