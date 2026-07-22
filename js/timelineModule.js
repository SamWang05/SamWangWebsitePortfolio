const timelineLine = document.querySelector(".timelineLine");
const timelineDisplay = document.querySelector(".timelineDisplay");
const experienceModules = document.querySelector(".experienceModules");

let timelinePositionIndex = 0;
let scrollFlag = true;

let datePosition = [2023, 9];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



const experienceEvents = [
/* 
    Copy/Paste for new experience:

    [
        null, // holds Obj. for the corresponding HTML experience element
        [Start Year, Start Month (Num)], 
        [End Year, End Month (Num)], 
        "Background Color (See Below)",
        "EXPERIENCE TITLE",
        "Employer", 
        "Summary of Duties",
        "false", // flag for controlling deletion animations
    ],
    
    Recommended Experience Colors:
    Terracotta Clay - #C4A184
    Warm Taupe - #A89A8C
    Muted Blue-Grey - #8FA0A8
    Soft Ochre/Mustard - #C9B27E
    Sage Green - #B4BFAE
    */
    [
        null, 
        [2023, 9], 
        [2024, 4], 
        "#B4BFAE", 
        "STUDENT - BIOMEDICAL ENGINEERING LEVEL I", 
        "McMaster University - Faculty of Engineering", 
        "",
        false,
    ],
    [
        null, 
        [2024, 5], 
        [2025, 4], 
        "#B4BFAE", 
        "STUDENT - ELECTRICAL & BIOMED. ENG. LEVEL II", 
        "McMaster University - Faculty of Engineering", 
        "",
        false,
    ],
    [
        null, 
        [2025, 5], 
        [2026, 4], 
        "#B4BFAE", 
        "STUDENT - ELEC. & BIOMED. ENG. LEVEL III", 
        "McMaster University - Faculty of Engineering", 
        "",
        false,
    ],
    [
        null, 
        [2026, 5], 
        [2026, 7], 
        "#B4BFAE", 
        "STUDENT - ELEC. & BIOMED. ENG. LEVEL IV", 
        "McMaster University - Faculty of Engineering", 
        "",
        false,
    ],
    [
        null, 
        [2024, 5], 
        [2024, 8], 
        "#C9B27E", 
        "QUALITY ASSURANCE AND AUTOMATION INTERN", 
        "Canadian Imperial Bank of Commerce (CIBC)", 
        "",
        false,
    ],
    [
        null,
        [2025, 3], 
        [2026, 1], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM GENERAL MEMBER",
        "McMaster Aerial Robotics Team", 
        "",
        false,
    ],
    [
        null,
        [2026, 2], 
        [2026, 6], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM TECHNICAL LEAD",
        "McMaster Aerial Robotics Team",
        "",
        false,
    ],
]

/* Logic Functions */

function findPresentDate() {
    const currentDate = Temporal.Now.plainDateISO();

    return [currentDate.year, currentDate.month];
}

function calculateScrollDirection(prevPos, currentPos) {
    if (currentPos > prevPos) return "DOWN";
    else if (currentPos < prevPos) return "UP";
    else return null;
}

function checkTimelineIndexBounds() {
    const timelineLength = countUniqueDates().length;

    if (timelinePositionIndex < 0) {
        timelinePositionIndex = 0;
    }
    else if (timelinePositionIndex > (timelineLength - 1)) {
        timelinePositionIndex = timelineLength - 1;
    }
}

function countUniqueDates() {
    let experienceDatesArray = []

    experienceEvents.forEach((experience) => {
        experienceDatesArray.push(experience[1].toString());
        experienceDatesArray.push(experience[2].toString());
    });

    experienceDatesArray.sort();

    let tempSet = new Set(experienceDatesArray);
    let uniqueExperienceDatesSet = new Set();

    tempSet.forEach((experience) => {
        let experienceDate = experience.split(",");

        experienceDate.forEach((expDate, index) => {
            experienceDate[index] = parseInt(expDate);
        });

        uniqueExperienceDatesSet.add(experienceDate);
    });

    const uniqueExperienceDatesArray = [...uniqueExperienceDatesSet];

    return uniqueExperienceDatesArray;
}



/* Experience Module Functions */




/* Timeline Functions */

function centerWindow() {
    scrollFlag = false;

    window.scrollTo({
        top: (document.documentElement.scrollHeight - window.innerHeight) / 2,
        left: 0,
        behavior: 'auto'
    });
}

function updateTimelineDate(timelineSlider, uniqueDateSet) {
    const uniqueDate = uniqueDateSet[timelinePositionIndex];

    const uniqueYear = uniqueDate[0];
    const uniqueMonth = months[(uniqueDate[1] - 1)];

    timelineSlider.textContent = uniqueYear + " | " + uniqueMonth;

    return [uniqueYear, (uniqueDate[1])];
}

function timelineListener(timelineSliderNode, uniqueDateSet) {
    let lastScrollPos = 100;
    let currentScrollPos = 0;

    document.addEventListener("scrollend", () => {
        if (!scrollFlag) {
            scrollFlag = true;
            return;
        }

        currentScrollPos = document.scrollingElement.scrollTop;

        let scrollDir = calculateScrollDirection(lastScrollPos, currentScrollPos);

        switch (scrollDir) {
            case "UP":
                timelinePositionIndex--;
            break;
            case "DOWN":
                timelinePositionIndex++;
            break;
        }

        checkTimelineIndexBounds();
        animateTimeline(timelineSliderNode, uniqueDateSet);
        datePosition = updateTimelineDate(timelineSliderNode, uniqueDateSet);

        centerWindow();

        lastScrollPos = 100;
    });
}

function renderTimeline() {
    const timelineSliderFrame = document.createElement("div");

        timelineSliderFrame.style.backgroundColor = "#DDD9D3";
        
        timelineSliderFrame.style.width = "30px";
        timelineSliderFrame.style.height = "100%";

        timelineSliderFrame.style.padding = "5px";

        timelineSliderFrame.style.borderRadius = "15px";

        timelineLine.appendChild(timelineSliderFrame);

    const timelineSlider = document.createElement("div");

        timelineSlider.classList.add("bodyText");

        timelineSlider.style.backgroundColor = "#8C7B6B";

        timelineSlider.style.width = "20px";
        timelineSlider.style.minHeight = "20%";
        timelineSlider.style.maxHeight = "80%";
        
        timelineSlider.animate([
            {
                height: "10%"
            },
            {
                height: "20%"
            }
        ],
            {
                duration: 1000,
                iterations: 1,
                fill: "forwards",
                easing: "ease-out",
            }
        )

        timelineSlider.style.borderRadius = "10px";

        timelineSlider.style.writingMode = "vertical-rl";
        timelineSlider.style.textAlign = "right";

        timelineSlider.style.paddingBottom = "10px";

        timelineSlider.style.fontSize = "1rem";
        timelineSlider.style.color = "#DDD9D3";

        timelineSlider.textContent = "Sep | 2023";

        timelineSliderFrame.appendChild(timelineSlider);
    
    return timelineSlider;
}

function animateTimeline(sliderNode, uniqueDateSet) {
    sliderNode.animate([
        {
            height: ""
        },
        {
            height: String(Math.round(20 + ((60 / (uniqueDateSet.length - 1)) * timelinePositionIndex), 1)) + "%"
        }
    ],
        {
            duration: 2000,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in-out",
        }
    )
}



/* Main Function */

function main() {
    const uniqueDateSet = countUniqueDates();
    const sliderNode = renderTimeline();
    const presentDate = findPresentDate();

    timelineListener(sliderNode, uniqueDateSet);
}

main();