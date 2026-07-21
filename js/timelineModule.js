const timelineLine = document.querySelector(".timelineLine");
const timelineDisplay = document.querySelector(".timelineDisplay");
const experienceModules = document.querySelector(".experienceModules");

let timelineCurrentLength = 300;
const ONE_SCROLL_PX_INCREMENT = 100;

const TIMELINE_START_DATE = Temporal.PlainDate.from("2023-09-01");
let datePosition = TIMELINE_START_DATE;

const experienceEvents = [
    /* [Module Object, [Start Year, Start Month], [End Year, End Month], Experience Color, Experience Employer, Experience Title, 
    Experience Body] */
    /* 
    Recommended Experience Colors:
    Terracotta Clay - #C4A184
    Warm Taupe - #A89A8C
    Muted Blue-Grey - #8FA0A8
    Soft Ochre/Mustard - #C9B27E
    Sage Green - #B4BFAE
    */
    [
        null, /* Empty Entry to hold possible object */
        [2025, 3], 
        [2026, 2], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM GENERAL MEMBER",
        "McMaster Aerial Robotics Team", 
        "Test Experience Body 1",
    ],
    [
        null, /* Empty Entry to hold possible object */
        [2026, 2], 
        [2026, 6], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM TECHNICAL LEAD",
        "McMaster Aerial Robotics Team",
        "Test Experience Body 1",
    ],
    [
        null, /* Empty Entry to hold possible object */
        [2024, 5], 
        [2024, 8], 
        "#C9B27E", 
        "QUALITY ASSURANCE AND AUTOMATION INTERN", 
        "Canadian Imperial Bank of Commerce (CIBC)", 
        "Test Experience Body 2",
    ],
]



/* DateTime Calculation Functions */

function calculateTimelineLength() {
    const TIMELINE_END_DATE = Temporal.Now.plainDateISO();

    let monthsElapsed = (TIMELINE_END_DATE.month + 12 * TIMELINE_END_DATE.year) - 
    (TIMELINE_START_DATE.month + 12 * TIMELINE_START_DATE.year) + 6; // Add 6 months to give some headway;

    return monthsElapsed;
}

function calculateDateFromMonths(months){
    datePosition = TIMELINE_START_DATE.add({ months: months });
}



/* Timeline Scrolling Functions */

function timelineScrollListener(sliderNode) {
    let lastScrollPos = 0.0;
    let currentScrollPos = 0.0;
    let differentialScroll = 0.0;

    document.addEventListener("scrollend", () => {
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

        calculateDateFromMonths(Math.floor(currentScrollPos / 100, 1))
        sliderNode.textContent = datePosition.year + " " + datePosition.toLocaleString("en-US", { month: "short" });

        checkTimelineEvent();

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
        
        timelineSlider.style.minHeight = "50px";

        timelineSlider.style.borderRadius = "10px";

        timelineSlider.style.paddingBottom = "10px";

        timelineSlider.style.writingMode = "vertical-rl";
        timelineSlider.style.textAlign = "right";

        timelineSlider.style.fontSize = "1rem";
        timelineSlider.style.color = "#DDD9D3";

        timelineSlider.textContent = "";

        timelineSliderFrame.appendChild(timelineSlider);

    return timelineSlider;
}



/* Experience Module Functions */

function newExperienceModule(experienceEvent) {
    const experienceModule = document.createElement("div");

        experienceModule.style.display = "flex";
        experienceModule.style.flexDirection = "column";

        experienceModule.style.width = "auto";
        experienceModule.style.height = "30vh";

        experienceModule.style.backgroundColor = experienceEvent[3];

        experienceModule.style.borderRadius = "15px";

        experienceModule.style.padding = "50px";
        experienceModule.style.gap = "20px";

        experienceModule.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ], 
        {
            duration: 500,
            fill: 'forwards'
        });

        experienceModules.appendChild(experienceModule);

    const moduleTitle = document.createElement("div");

        moduleTitle.classList.add("titleText");

        moduleTitle.style.textWrap = "wrap";
        moduleTitle.style.fontSize = "1.5rem";

        moduleTitle.textContent = experienceEvent[4];

        experienceModule.appendChild(moduleTitle);

    const moduleEmployer = document.createElement("div");

        moduleEmployer.classList.add("subtitleText");

        moduleEmployer.style.fontSize = "1.25rem";
        moduleEmployer.style.paddingLeft = "20px";
        moduleEmployer.style.borderLeft = "5px solid"

        moduleEmployer.textContent = experienceEvent[5];

        experienceModule.appendChild(moduleEmployer)

    const moduleBody = document.createElement("div");

        moduleBody.classList.add("bodyText");

        moduleBody.style.fontSize = "1rem";
        moduleBody.style.paddingLeft = "20px";

        moduleBody.textContent = experienceEvent[6];

        experienceModule.appendChild(moduleBody);

    return experienceModule;
}

function deleteExperienceModule(experienceArrayEntry) {
    let targetModule = experienceArrayEntry[0];

    targetModule.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ], 
        {
            duration: 500,
            fill: 'forwards'
    });

    setTimeout(() => {
        targetModule.remove();
    }, 500);
    

    experienceArrayEntry[0] = null;
}

function isDateBetweenRange(startDateRange, endDateRange) {
    let timelineYear = datePosition.year;
    let timelineMonth = datePosition.month;
    let timelineDateInMonths = timelineYear * 12 + timelineMonth;

    let startYear = startDateRange[0];
    let startMonth = startDateRange[1];
    let startDateInMonths = startYear * 12 + startMonth;
    
    let endYear = endDateRange[0];
    let endMonth = endDateRange[1];
    let endDateInMonths = endYear * 12 + endMonth;

    if (startDateInMonths <= timelineDateInMonths && timelineDateInMonths <= endDateInMonths) {
        return true;
    }
    return false;
}

function checkTimelineEvent() {
    experienceEvents.forEach((experience) => {
        if (isDateBetweenRange(experience[1], experience[2])) {
            if (experience[0] == null) {
                experience[0] = newExperienceModule(experience);
            }
        }
        else if (experience[0] != null) {
            /* delete experienceObject module */
            deleteExperienceModule(experience);
        }
    });
    
}



/* Main Function */

function main() {
    const monthsElapsed = calculateTimelineLength();
    const timelineSliderNode = renderTimeline(monthsElapsed);

    timelineScrollListener(timelineSliderNode);
}

main();