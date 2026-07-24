const timelineLine = document.querySelector(".timelineLine");
const timelineDisplay = document.querySelector(".timelineDisplay");
const experienceModules = document.querySelector(".experienceModules");

let timelinePositionIndex = 0;
let scrollFlag = true;

const TIMELINE_START_DATE = [2023, 9];
const PRESENT_DATE = findPresentDate();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let datePosition = TIMELINE_START_DATE;

const MODULE_HEIGHT_MULTIPLE = 100; // Units of px
const TIMELINE_HEIGHT_INCREASE = 100; // Units of px



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
        "Type of Experience (Edu/Work/EC)"
    ],
    
    Recommended Experience Colors:
    Terracotta Clay - #C4A184
    Warm Taupe - #A89A8C
    Muted Blue-Grey - #8FA0A8
    Soft Ochre/Mustard - #C9B27E
    Sage Green - #B4BFAE
*/

const experienceEvents = [
    [
        null, 
        [2023, 9], 
        [2024, 4], 
        "#B4BFAE", 
        "STUDENT - BIOMEDICAL ENGINEERING LEVEL I", 
        "McMaster University - Faculty of Engineering", 
        "",
        "Edu",
    ],
    [
        null, 
        [2024, 4], 
        [2025, 4], 
        "#B4BFAE", 
        "STUDENT - ELECTRICAL & BIOMED. ENG. LEVEL II", 
        "McMaster University - Faculty of Engineering", 
        "",
        "Edu",
    ],
    [
        null, 
        [2025, 4], 
        [2026, 4], 
        "#B4BFAE", 
        "STUDENT - ELEC. & BIOMED. ENG. LEVEL III", 
        "McMaster University - Faculty of Engineering", 
        "",
        "Edu",
    ],
    [
        null, 
        [2026, 4], 
        PRESENT_DATE, 
        "#B4BFAE", 
        "STUDENT - ELEC. & BIOMED. ENG. LEVEL IV", 
        "McMaster University - Faculty of Engineering", 
        "",
        "Edu",
    ],
    [
        null, 
        [2024, 5], 
        [2024, 8], 
        "#C9B27E", 
        "QUALITY ASSURANCE AND AUTOMATION INTERN", 
        "Canadian Imperial Bank of Commerce (CIBC)", 
        "",
        "Work",
    ],
    [
        null,
        [2025, 3], 
        [2026, 1], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM GENERAL MEMBER",
        "McMaster Aerial Robotics Team", 
        "",
        "EC",
    ],
    [
        null,
        [2026, 2], 
        [2026, 6], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM TECHNICAL LEAD",
        "McMaster Aerial Robotics Team",
        "",
        "EC",
    ],
    [
        null,
        [2025, 9], 
        PRESENT_DATE, 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM GENERAL MEMBER",
        "McMaster Biomedical Engineering Technical Team", 
        "",
        "EC",
    ],
]



/* Logic Functions */

function splitExperienceEvents() { // Split experienceEvents array based on which type of experience
    let educationEvents = [];
    let workEvents = [];
    let extracurricularEvents = [];

    experienceEvents.forEach((experience) => {
        if (experience[7] == "Edu") {
            educationEvents.push(experience);
        }
        else if (experience[7] == "Work") {
            workEvents.push(experience);
        }
        else if (experience[7] == "EC") {
            extracurricularEvents.push(experience);
        }
    });

    return [educationEvents, workEvents, extracurricularEvents];
}

function formatDateRange(startDateArray, endDateArray) { // Simply reformat date range from two arrays to string for experienceModules
    const startYear = startDateArray[0];
    const endYear = endDateArray[0];

    const startMonth = months[startDateArray[1] - 1];
    const endMonth = months[endDateArray[1] - 1];

    return (startMonth + " " + startYear + " to " + endMonth + " " + endYear);
}

function findPresentDate() {
    const currentDate = Temporal.Now.plainDateISO();

    return [currentDate.year, currentDate.month];
}

function calculateModuleHeight(startDateArray, endDateArray) {
    const startDateMonths = 12 * startDateArray[0] + startDateArray[1];
    const endDateMonths = 12 * endDateArray[0] + endDateArray[1];

    return (endDateMonths - startDateMonths) * MODULE_HEIGHT_MULTIPLE;
}

function calculateTimelineHeight(uniqueDateSet) {
    const endDate = uniqueDateSet[uniqueDateSet.length - 1][0];

    const startDateMonths = 12 * TIMELINE_START_DATE[0] + TIMELINE_START_DATE[1];
    const endDateMonths = 12 * endDate[0] + endDate[1];

    return (endDateMonths - startDateMonths) * MODULE_HEIGHT_MULTIPLE + TIMELINE_HEIGHT_INCREASE;
}

function calculateModuleDistance(startDateArray) { // Module's distance needs to be based on its start date relative to Sept. 2023
    const startDateMonths = 12 * startDateArray[0] + startDateArray[1];
    const startPositionMonths = 12 * TIMELINE_START_DATE[0] + TIMELINE_START_DATE[1];

    return ((startDateMonths - startPositionMonths) * MODULE_HEIGHT_MULTIPLE);
}

function countUniqueDates() {
    let experienceDatesArray = [];

    experienceEvents.forEach((experience, index) => {
        // For each experienceEvent, hold the starting and ending dates, as 
        // well as the event's corresponding index and tag (start/end)

        experienceDatesArray.push([experience[1], String(index), "start"]);
        experienceDatesArray.push([experience[2], String(index), "end"]);
    });

    experienceDatesArray.sort((startingDate, endingDate) => {
        // Compares two entries startingDate, endingDate by converting to # of months, then check if + or -

        const startingInMonths = 12 * startingDate[0][0] + startingDate[0][1];
        const endingInMonths = 12 * endingDate[0][0] + endingDate[0][1];

        return startingInMonths - endingInMonths;
    });

    let uniqueExperienceDatesArray = [];
    let datesSeen = new Map();

    experienceDatesArray.forEach(([experienceDate, experienceIndex, dateType]) => {
        const dateString = experienceDate.toString();
        

        if (!datesSeen.has(dateString)) { // Check if this date has already been pushed, and pushes date if not
            const entry = [experienceDate, experienceIndex, dateType];
            datesSeen.set(dateString, entry);
            uniqueExperienceDatesArray.push(entry);
        } 
        else { // If a specific date marks both a start and end date, force the start date to take priority
            const existingEntry = datesSeen.get(dateString);

            if (existingEntry[2] == "end" && dateType == "start") { // Rewrites an end date to take the start date instead
                existingEntry[1] = experienceIndex;
                existingEntry[2] = "start";
            }
        }
    });

    return uniqueExperienceDatesArray;
}

function selectModuleType(moduleType, uniqueDateSet) {
    let moduleObj = null;

    if (moduleType == "Education") {
        moduleObj = document.querySelector(".eduModules");
    }
    else if (moduleType == "Work") {
        moduleObj = document.querySelector(".workModules");
    }
    else if (moduleType == "Extracurricular") {
        moduleObj = document.querySelector(".extracurricularModules");
    }

    return moduleObj;
}



/* Experience Module Functions */

function scrollModuleDisplay(uniqueFilteredDateSet) {
    const targetExperienceIndex = uniqueFilteredDateSet[timelinePositionIndex][1];
    const targetExperience = experienceEvents[targetExperienceIndex]
    const targetExperienceObj = targetExperience[0];

    targetExperienceObj.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    });

    setTimeout(() => { // Flash each module to indicate it was selected
        targetExperienceObj.animate([
            {filter: "brightness(100%)"},
            {filter: "brightness(90%)"},
            {filter: "brightness(100%)"}
        ],
        {
            duration: 300,
            iterations: 2,
            fill: "forwards",
            easing: "ease-in-out",
        });
    }, 500);
    
}

function createExperienceModule(experienceEvent, uniqueDateSet, moduleType) {

    const moduleClass = selectModuleType(moduleType, uniqueDateSet);

    const moduleHeight = calculateModuleHeight(experienceEvent[1], experienceEvent[2]) + "px";
    const moduleDist = calculateModuleDistance(experienceEvent[1]) + "px"; 

    const newExperienceModule = document.createElement("div");

        newExperienceModule.classList.add("moduleCard");

        experienceEvent[0] = newExperienceModule;

        newExperienceModule.style.backgroundColor = experienceEvent[3];
        newExperienceModule.style.height = moduleHeight;
        newExperienceModule.style.top = moduleDist;

        moduleClass.appendChild(newExperienceModule);
    
    const moduleTitle = document.createElement("div");

        moduleTitle.classList.add("titleText");
        
        moduleTitle.textContent = experienceEvent[4];

        newExperienceModule.appendChild(moduleTitle);

    const moduleEmployer = document.createElement("div");

        moduleEmployer.classList.add("subtitleText");
        moduleEmployer.classList.add("employerText");

        moduleEmployer.textContent = experienceEvent[5];

        newExperienceModule.appendChild(moduleEmployer)

    const moduleDate = document.createElement("div");

        moduleDate.classList.add("subtitleText");
        moduleDate.classList.add("dateRangeText");

        moduleDate.textContent = formatDateRange(experienceEvent[1], experienceEvent[2]);

        newExperienceModule.appendChild(moduleDate)

    const moduleBody = document.createElement("div");

        moduleBody.classList.add("bodyText");

        moduleBody.textContent = experienceEvent[6];

        newExperienceModule.appendChild(moduleBody);
}

function renderExperienceModules(uniqueDateSet) {
    const organizedExperienceEvents = splitExperienceEvents();

    renderEducationModules(organizedExperienceEvents[0], uniqueDateSet);
    renderWorkModules(organizedExperienceEvents[1], uniqueDateSet);
    renderECModules(organizedExperienceEvents[2], uniqueDateSet);
}

function renderEducationModules(educationEvents, uniqueDateSet) {
    educationEvents.forEach((eduExperience) => {
        createExperienceModule(eduExperience, uniqueDateSet, "Education");
    });
}

function renderWorkModules(workEvents, uniqueDateSet) {
    workEvents.forEach((workExperience) => {
        createExperienceModule(workExperience, uniqueDateSet, "Work");
    });
}

function renderECModules(extracurricularEvents, uniqueDateSet) {
    extracurricularEvents.forEach((extraCExperience) => {
        createExperienceModule(extraCExperience, uniqueDateSet, "Extracurricular");
    });
}



/* Timeline Functions */

function centerWindow() {
    scrollFlag = false; // Reset scroll flag to false. Otherwise, scrollTo will reactivate centerWindow (8 hours to solve this one ;-;)

    window.scrollTo({
        top: (document.documentElement.scrollHeight - window.innerHeight) / 2,
        left: 0,
        behavior: 'auto'
    });
}

function updateTimelineDate(timelineSlider, uniqueFilteredDateSet) {
    const uniqueFilteredDate = uniqueFilteredDateSet[timelinePositionIndex][0];

    const uniqueYear = uniqueFilteredDate[0];
    const uniqueMonth = months[(uniqueFilteredDate[1] - 1)];

    timelineSlider.textContent = uniqueYear + " | " + uniqueMonth;

    return [uniqueYear, (uniqueFilteredDate[1])];
}

function timelineListener(timelineSliderNode, uniqueFilteredDateSet) {
    let lastScrollPos = document.scrollingElement.scrollTop;
    let currentScrollPos = 0;

    document.addEventListener("scrollend", () => {
        if (!scrollFlag) { // If the scrollFlag is false, we will block the action of centerWindow() from reactivating the listener
            scrollFlag = true;
            lastScrollPos = document.scrollingElement.scrollTop;
            return;
        }

        currentScrollPos = document.scrollingElement.scrollTop;

        let scrollDir

        if (currentScrollPos > lastScrollPos) scrollDir = "DOWN";
        else if (currentScrollPos < lastScrollPos) scrollDir = "UP";
        else scrollDir = null;

        switch (scrollDir) {
            case "UP":
                timelinePositionIndex--;
            break;
            case "DOWN":
                timelinePositionIndex++;
            break;
        }

        if (timelinePositionIndex < 0) {
            timelinePositionIndex = 0;
        }
        else if (timelinePositionIndex > (uniqueFilteredDateSet.length - 1)) {
            timelinePositionIndex = uniqueFilteredDateSet.length - 1;
        }

        animateTimeline(timelineSliderNode, uniqueFilteredDateSet);
        datePosition = updateTimelineDate(timelineSliderNode, uniqueFilteredDateSet);

        scrollModuleDisplay(uniqueFilteredDateSet);

        centerWindow();
    });
}

function renderTimeline() {
    const timelineSliderFrame = document.createElement("div");

        timelineSliderFrame.classList.add("timelineSliderFrame");

        timelineLine.appendChild(timelineSliderFrame);

    const timelineSlider = document.createElement("div");

        timelineSlider.classList.add("bodyText");
        timelineSlider.classList.add("timelineSlider");
        
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

        timelineSlider.textContent = "2023 | Sep";

        timelineSliderFrame.appendChild(timelineSlider);
    
    return timelineSlider;
}

function animateTimeline(sliderNode, uniqueFilteredDateSet) {
    sliderNode.animate([
        {
            height: ""
        },
        {
            height: String(Math.round(20 + ((60 / (uniqueFilteredDateSet.length - 1)) * timelinePositionIndex), 1)) + "%"
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
    // Unique date set contains start and end dates. Effectively a set of "notable" dates, used for 
    // calculating timeline length.

    // Sorted date set contains only "start" dates, used for scroll positioning -> subset of unique date set

    const sliderNode = renderTimeline();
    const uniqueDateSet = countUniqueDates();
    const uniqueSortedDateSet = uniqueDateSet.filter((dateEntry) => dateEntry[2] === "start");

    renderExperienceModules(uniqueDateSet);
    timelineListener(sliderNode, uniqueSortedDateSet);
}

main();