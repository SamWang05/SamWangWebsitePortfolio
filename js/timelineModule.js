const timelineLine = document.querySelector(".timelineLine");
const timelineDisplay = document.querySelector(".timelineDisplay");
const experienceModules = document.querySelector(".experienceModules");

let timelinePositionIndex = 0;
let scrollFlag = true;
let activeExperienceIndex = null;

const TIMELINE_START_DATE = [2023, 9];
const PRESENT_DATE = findPresentDate();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let datePosition = TIMELINE_START_DATE;

const MODULE_HEIGHT_MULTIPLE = 150; // Units of px
const TIMELINE_HEIGHT_INCREASE = 100; // Units of px

const MODULE_BASE_OPACITY = 0.5



/* 
    Copy/Paste for new experience:

    [
        null, // holds Obj. for the corresponding HTML experience element
        [Start Year, Start Month (Num)], 
        [End Year, End Month (Num)], 
        "Background Color (See Below)",
        "EXPERIENCE TITLE",
        "Employer", 
        "Summary of Duties (Divide using |)",
        "Type of Experience (Edu/Work/EC)"
    ],
    
    Experience Colors:
        Education: Sage Green - #B4BFAE
        Work: Soft Ochre/Mustard - #C9B27E
        EC: Muted Blue-Grey - #8FA0A8
*/

const experienceEvents = [
    [
        null, 
        [2023, 9], 
        [2024, 4], 
        "#B4BFAE", 
        "STUDENT - BIOMEDICAL ENGINEERING LEVEL I", 
        "McMaster University - Faculty of Engineering", 
        `Health Solutions Design Projects I | Engineering Mathematics I/II | Introductory Physics | 
        Entrepreneurship and Biomedical Innovation`,
        "Edu",
    ],
    [
        null, 
        [2024, 4], 
        [2025, 4], 
        "#B4BFAE", 
        "STUDENT - ELECTRICAL & BIOMEDICAL ENG. LEVEL II", 
        "McMaster University - Faculty of Engineering", 
        `Hlth. Solutions Design Projects II | Physiology and Anatomy I/II | Electromagnetics I | Principles 
        of Programming & Data Structures | Circuit Analysis | Circuits and Systems | Engineering Mathematics 
        III`,
        "Edu",
    ],
    [
        null, 
        [2025, 4], 
        [2026, 4], 
        "#B4BFAE", 
        "STUDENT - ELEC. & BIOMED. ENG. LEVEL III", 
        "McMaster University - Faculty of Engineering", 
        `Digital Logic Design | Microprocessor Systems | Electronic Devices and Circuits I | Electromagnetics 
        II | Hlth. Solutions Design Projects III | Biomedical Signals and Systems | Energy Conversion | Advanced 
        Probability | Statistical Methods in Biomed. Eng.`,
        "Edu",
    ],
    [
        null, 
        [2026, 4], 
        PRESENT_DATE, 
        "#B4BFAE", 
        "STUDENT - ELEC. & BIOMED. ENG. LEVEL IV", 
        "McMaster University - Faculty of Engineering", 
        `Hlth. Solutions Design Projects IV | Electronic Devices and Circuits II | Communication Systems | Numerical 
        Methods & Scientific Computing | Biomedical Instrumentation | Biomechanics | Biomedical Control Systems | Biosensors 
        Applications | Organic Chemistry`,
        "Edu",
    ],
    [
        null, 
        [2024, 5], 
        [2024, 8], 
        "#C9B27E", 
        "QUALITY ASSURANCE AND AUTOMATION INTERN", 
        "Canadian Imperial Bank of Commerce (CIBC)", 
        `JIRA Atlassian | PostgreSQL | Quality Assurance Metrics | Agile Workflow | Data Processing and Validation | Database 
        Manipulation | Student Leadership`,
        "Work",
    ],
    [
        null,
        [2025, 3], 
        [2026, 1], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM GENERAL MEMBER",
        "McMaster Aerial Robotics Team", 
        `Altium Designer | LTSpice | Circuit Design, Analysis, and Optimization | Error Detection`,
        "EC",
    ],
    [
        null,
        [2026, 2], 
        [2026, 6], 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM TECHNICAL LEAD",
        "McMaster Aerial Robotics Team",
        `Electrical Infrastructure Design | Test Suite Design | Resource Allocation and Organization | Technical Guidance`,
        "EC",
    ],
    [
        null,
        [2025, 9], 
        PRESENT_DATE, 
        "#8FA0A8",
        "ELECTRICAL SUBTEAM MEMBER",
        "McMaster Biomedical Engineering Technical Team", 
        `Circuit Design and Analysis | Engineering Peer Review | ISO Standards Research`,
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

    return (" - " + startMonth + " " + startYear + " to " + endMonth + " " + endYear + " - ");
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

function processModuleBodyText(moduleBodyText) {
    let bodyTextItemsArray = moduleBodyText.replaceAll("\n", "").split(" | ");

    let processedBodyTextArray = [];

    bodyTextItemsArray.forEach((textItem) => {
        const bodyTextItem = textItem.replace(/\s+/g, ' ');

        processedBodyTextArray.push(bodyTextItem);
    });

    return processedBodyTextArray;
}



/* Experience Module Functions */

function scrollModuleDisplay(uniqueFilteredDateSet) {
    const targetExperienceIndex = uniqueFilteredDateSet[timelinePositionIndex][1];
    const targetExperience = experienceEvents[targetExperienceIndex]
    const targetExperienceObj = targetExperience[0];

    // ActiveExperienceIndex = Currently viewed position, targetExperienceIndex = Next in line
    if (activeExperienceIndex != null && activeExperienceIndex != targetExperienceIndex) {
        activeExperienceObj = experienceEvents[activeExperienceIndex][0]; // Obj. for the experience viewed before the new target

        activeExperienceObj.animate([
            {opacity: 1.0},
            {opacity: MODULE_BASE_OPACITY},
        ],
        {
            duration: 300,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in-out",
        });
    }

    activeExperienceIndex = targetExperienceIndex;

    targetExperienceObj.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    });

    setTimeout(() => { // Flash each module to indicate it was selected
        targetExperienceObj.animate([
            {filter: "brightness(100%)", opacity: MODULE_BASE_OPACITY},
            {filter: "brightness(90%)"},
            {filter: "brightness(100%)", opacity: 1.0}
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

    const moduleClass = moduleType;

    const moduleHeight = calculateModuleHeight(experienceEvent[1], experienceEvent[2]) + "px";
    const moduleDist = calculateModuleDistance(experienceEvent[1]); 

    const newExperienceModule = document.createElement("div");

        newExperienceModule.classList.add("moduleCard");

        experienceEvent[0] = newExperienceModule;

        newExperienceModule.style.backgroundColor = experienceEvent[3];

        newExperienceModule.style.height = moduleHeight;
        newExperienceModule.style.top = moduleDist + "px";

        newExperienceModule.style.zIndex = moduleDist;

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

        moduleBody.classList.add("moduleBody");

        newExperienceModule.appendChild(moduleBody);

        const textContentArray = processModuleBodyText(experienceEvent[6]);

            textContentArray.forEach((textContent) => {

                const moduleList = document.createElement("li");

                moduleList.classList.add("bodyText");
                moduleList.textContent = textContent;

                moduleBody.appendChild(moduleList);
            })
}

function renderExperienceModules(uniqueDateSet) {
    const organizedExperienceEvents = splitExperienceEvents();
    
    const eduModules = document.querySelector(".eduModules");
    const workModules = document.querySelector(".workModules");
    const ECModules = document.querySelector(".extracurricularModules");

    const moduleObjArray = [eduModules, workModules, ECModules];

    organizedExperienceEvents.forEach((experienceEvent, index) => {
        renderModules(experienceEvent, uniqueDateSet, moduleObjArray[index]);
    });
}

function renderModules(moduleEvents, uniqueDateSet, moduleObj) {
    moduleEvents.forEach((moduleEvent) => {
        createExperienceModule(moduleEvent, uniqueDateSet, moduleObj);
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
    scrollModuleDisplay(uniqueSortedDateSet);
}

main();