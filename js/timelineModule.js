const timelineLine = document.querySelector(".timelineLine");

function initializeTimeline() {
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
        timelineSlider.style.height = "200px";

        timelineSlider.style.borderRadius = "10px";

        timelineSliderFrame.appendChild(timelineSlider);
}

function main() {
    initializeTimeline();
}

main();