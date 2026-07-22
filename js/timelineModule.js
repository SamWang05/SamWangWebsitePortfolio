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
        null, holds Obj. for the corresponding HTML experience element
        [Start Year, Start Month (Num)], 
        [End Year, End Month (Num)], 
        "Background Color (See Below)",
        "EXPERIENCE TITLE",
        "Employer", 
        "Summary of Duties",
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
    ],
    [
        null, 
        [2024, 5], 
        [2025, 4], 
        "#B4BFAE", 
        "STUDENT - ELECTRICAL & BIOMED. ENG. LEVEL II", 
        "McMaster University - Faculty of Engineering", 
        "",
    ],
    [
        null, 
        [2025, 5], 
        [2026, 4], 
        "#B4BFAE", 
        "STUDENT - ELEC. & BIOMED. ENG. LEVEL III", 
        "McMaster University - Faculty of Engineering", 
        "",
    ],
    [
        null, 
        [2026, 5], 
        [2026, 7], 
        "#B4BFAE", 
        "STUDENT - ELEC. & BIOMED. ENG. LEVEL IV", 
        "McMaster University - Faculty of Engineering", 
        "",
    ],
    [
        null, 
        [2024, 5], 
        [2024, 8], 
        "#C9B27E", 
        "QUALITY ASSURANCE AND AUTOMATION INTERN", 
        "Canadian Imperial Bank of Commerce (CIBC)", 
        "",
    ],
    [
        null,
        [2025, 3], 
        [2026, 1], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM GENERAL MEMBER",
        "McMaster Aerial Robotics Team", 
        "",
    ],
    [
        null,
        [2026, 2], 
        [2026, 6], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM TECHNICAL LEAD",
        "McMaster Aerial Robotics Team",
        "",
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

function isDateBetweenRange(startDateRange, endDateRange) {
    let timelineYear = datePosition[0];
    let timelineMonth = datePosition[1];
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

function isEventEnding(experienceObj) {
    const endDateRange = experienceObj[2];

    if (datePosition[0] == endDateRange[0] && datePosition[1] == endDateRange[1]) return true;
    else return false;
}



/* Experience Module Functions */

function renderExperienceModules(uniqueDateSet) {
    // Cycles through each experience in experienceEvents and identifies if the time range is accurate
    // if entry is within date bounds, add its object to a list. Then, render all items in that index list.

    let activeExperienceModulesArray = [];

    experienceEvents.forEach((experience, index) => {
        let experienceModuleData = [];

        if (isDateBetweenRange(experience[1], experience[2]) && experience[0] == null) {
            const experienceModuleObj = createExperienceModule(experience);

            experienceModuleData.push(index);
            experienceModuleData.push(experienceModuleObj);

            experience[0] = experienceModuleObj;

            activeExperienceModulesArray.push(experienceModuleData);
        }
        else if ((!isDateBetweenRange(experience[1], experience[2])) && experience[0] != null) {
            deleteExperienceModule(experience);

            experience[0] = null;
        }
        
        if (isEventEnding(experience) && experience[0] != null) {
            animateExperienceDeletion(experience);
        }
        else if (!isEventEnding(experience) && experience[0] != null) {
            resetExperienceAnimation(experience);
        }
    });
}

function createExperienceModule(experienceEvent) {
    const experienceModule = document.createElement("div");

        experienceModule.style.display = "flex";
        experienceModule.style.flexDirection = "column";

        experienceModule.style.backgroundColor = experienceEvent[3];

        experienceModule.style.borderRadius = "15px";

        experienceModule.style.padding = "25px";
        experienceModule.style.gap = "10px";

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
    
    const moduleContainer = document.createElement("div");

        moduleContainer.style.display = "flex";
        moduleContainer.style.flexDirection = "row";

        moduleContainer.style.justifyContent = "space-between";
        
        experienceModule.appendChild(moduleContainer);

        const moduleEmployer = document.createElement("div");

            moduleEmployer.classList.add("subtitleText");

            moduleEmployer.style.fontSize = "1.25rem";
            moduleEmployer.style.paddingLeft = "20px";
            moduleEmployer.style.borderLeft = "5px solid"

            moduleEmployer.textContent = experienceEvent[5];

            moduleContainer.appendChild(moduleEmployer)

        const moduleDate = document.createElement("div");

            moduleDate.classList.add("bodyText");

            moduleDate.style.fontSize = "1.25rem";

            moduleDate.style.paddingRight = "10px";
            moduleDate.style.borderRight = "5px solid";

            moduleDate.textContent = experienceEvent[1][0] + " " + months[experienceEvent[1][1] - 1] + 
            " | " + experienceEvent[2][0] + " " + months[experienceEvent[2][1] - 1];

            moduleContainer.appendChild(moduleDate)

    const moduleBody = document.createElement("div");

        moduleBody.classList.add("bodyText");

        moduleBody.style.fontSize = "1rem";
        moduleBody.style.paddingLeft = "20px";

        moduleBody.textContent = experienceEvent[6];

        experienceModule.appendChild(moduleBody);

    return experienceModule;
}

function animateExperienceDeletion(experienceObj) {
    let targetModule = experienceObj[0];

    targetModule.animate(
        [
            { backgroundColor: "", offset: 0},
            { backgroundColor: "#C9C9C9", offset:  1},
        ], 
        {
            duration: 500,
            fill: 'forwards'
    });

    targetModule.animate(
        [
            { transform: "rotate(0deg)", offset: 0},
            { transform: "rotate(0.5deg)", offset:  0.05},
            { transform: "rotate(-0.5deg)", offset:  0.1},
        ], 
        {
            duration: 100,
            fill: 'forwards',
            iterations: Infinity,
    });
}

function resetExperienceAnimation(experienceObj) {
    let targetModule = experienceObj[0];

    targetModule.getAnimations().forEach(animation => animation.cancel());
    targetModule.style.backgroundColor = experienceObj[3];
}

function deleteExperienceModule(experienceObj) {
    let targetModule = experienceObj[0];

    targetModule.animate(
        [
            { opacity: 1 },
            { opacity: 0 },
        ], 
        {
            duration: 500,
            fill: 'forwards'
    });

    setTimeout(() => {
        targetModule.remove();
    }, 500);
}

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
        renderExperienceModules(uniqueDateSet);

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
    renderExperienceModules(uniqueDateSet);
}

main();