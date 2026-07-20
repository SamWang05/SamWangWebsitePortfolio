const timelineLine = document.querySelector(".timelineLine");
const timelineDisplay = document.querySelector(".timelineDisplay");

let timelineCurrentLength = 300;
const ONE_SCROLL_PX_INCREMENT = 100;

const TIMELINE_START_DATE = Temporal.PlainDate.from("2023-09-01");

function calculateTimelineLength() {
    const TIMELINE_END_DATE = Temporal.Now.plainDateISO();

    let monthsElapsed = (TIMELINE_END_DATE.month + 12 * TIMELINE_END_DATE.year) - 
    (TIMELINE_START_DATE.month + 12 * TIMELINE_START_DATE.year) + 6; // Add 6 months to give some headway;

    return monthsElapsed;
}

function calculateDateFromMonths(months){
    let dateFromStart = TIMELINE_START_DATE.add({ months: months });

    return (dateFromStart.year + "-" + dateFromStart.month);
}

function timelineScrollListener(sliderNode) {
    let lastScrollPos = 0.0;
    let currentScrollPos = 0.0;
    let differentialScroll = 0.0;

    document.addEventListener("scrollend", (event) => {
        currentScrollPos = document.scrollingElement.scrollTop;

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
                duration: 1000,
                iterations: 1,
                fill: "forwards",
                easing: "ease-out",
            }
        )

        sliderNode.textContent = calculateDateFromMonths(Math.floor(currentScrollPos / 100, 1));

        timelineCurrentLength = timelineCurrentLength + differentialScroll;
        
        lastScrollPos = currentScrollPos;
    });
}

function renderTimeline(months) {
    const timelineSliderFrame = document.createElement("div");

        timelineSliderFrame.style.backgroundColor = "#DDD9D3";
        
        timelineSliderFrame.style.width = "30px";
        timelineSliderFrame.style.height = months * 100 + "px";

        timelineSliderFrame.style.padding = "5px";

        timelineSliderFrame.style.borderRadius = "15px";

        timelineLine.appendChild(timelineSliderFrame);

    const timelineSlider = document.createElement("div");

        timelineSlider.classList.add("bodyText");

        timelineSlider.style.backgroundColor = "#8C7B6B";

        timelineSlider.style.width = "20px";
        
        timelineSlider.style.height = timelineCurrentLength + "px";
        timelineSlider.style.minHeight = "10%";
        timelineSlider.style.maxHeight = "90%";

        timelineSlider.style.borderRadius = "10px";

        timelineSlider.style.paddingBottom = "10px";

        timelineSlider.style.writingMode = "vertical-rl";
        timelineSlider.style.textAlign = "right";

        timelineSlider.style.fontSize = "1rem";
        timelineSlider.style.color = "#DDD9D3";

        timelineSlider.textContent = "2023-7";

        timelineSliderFrame.appendChild(timelineSlider);

    return timelineSlider;
}

function main() {
    const monthsElapsed = calculateTimelineLength();
    const timelineSliderNode = renderTimeline(monthsElapsed);
    timelineScrollListener(timelineSliderNode);
}

main();