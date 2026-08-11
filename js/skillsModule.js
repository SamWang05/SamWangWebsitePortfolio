const skillGroupsNodeArray = document.querySelectorAll(".skillGroup");
const skillTabDisplayNode = document.querySelector(".skillTabDisplay");

const softwareSkillNode = document.querySelector(".softwareSkills");

const baseColor = "#D9D9D9";
const selectColor = "#C9C9C9";

const logosDirectory = "./assets/img/logos/";



function initializeSkillGroupListeners() {
    softwareSkillNode.style.backgroundColor = selectColor;

    skillGroupsNodeArray.forEach((skillGroup) => {
        skillGroup.addEventListener("click", (event) => {
            event.preventDefault();

            const targetNode = event.currentTarget;
            const targetClassList = targetNode.classList[1]; // Identify if the clicked tab was for software/hardware/interpersonal skills

            skillGroupsNodeArray.forEach((skill) => {
                const skillClassList = skill.classList[1];

                if (skillClassList == targetClassList) { // If the tab was selected, darken its background color. Otherwise, change back to base
                    skill.style.backgroundColor = selectColor;
                }
                else {
                    skill.style.backgroundColor = baseColor;
                }
            });

            clearSkillTabDisplay();

            switch(targetClassList) { // Render the correct skills list based on target class selected
                case "softwareSkills":
                    renderSoftwareSkills();
                    break;
                case "hardwareSkills":
                    renderHardwareSkills();
                    break;
                case "intperSkills":
                    renderIntPerSkills()
                    break;
            }
        });
    });
}


function clearSkillTabDisplay () {
    skillTabDisplayNode.replaceChildren();
}

function renderSoftwareSkills () {
    const softwareSkillsArray = [ // [Skill, Strength%, Comments, Photo]
        ["Python", "82%", "Automation, Data Processing and Visualization", "Python.svg"],
        ["C/C++", "73%", "Object-Oriented Programming, Data Structures, Time/Space Optimization", "cLogo.svg"],
        ["MATLAB", "68%", "Matrix Operations, 3D Visualization, Signal Analysis", "MATLAB.svg"],
        ["PCB Design Software", "31%", "Altium Designer, KiCAD, Circuit Construction, Simulation, Component Selection, PCB Design and Layout", "KiCAD.svg"],
        ["Circuit Simulation", "57%", "PSPICE/LTSPICE, Digital Logic, Transistor Circuits", "logicORGate.svg"],
        ["Dev Tools and IDEs", "69%", "VSCode, GitHub, Keil uVision, Arduino IDE, Chrome Dev Tools", "VSCode.svg"],
        ["Assembly", "23%", "Machine Code, Hardware Architecture", "Verilog.svg"],
    ]

    createSkillModule(softwareSkillsArray);
}

function renderHardwareSkills () {
    const hardwareSkillsArray = [ // [Skill, Strength%, Comments, Photo]
        ["Microcontrollers", "74%", "Arduino, TI MSP-432, Raspberry Pi, Jetson Nano", "Arduino.svg"],
        ["Debugging and Testing", "71%", "Breadboard Prototyping, Testing Suites, Data Sheets", "MagnifyingGlass.svg"],
        ["Oscilloscope/Multimeter Measurements", "54%", "Circuit Analysis/Troubleshooting, Digital Logic, AC Signals", "ACVoltage.svg"],
        ["Circuit Design", "63%", "Theoretical Circuit Models, Linear Circuits, Filters, Converters, Transistors", "Transistor.svg"],
        ["Verification and Protection", "47%", "Circuit Protection, Component Selection, Collaborative Engineering", "Shield.svg"],
        ["PCB Construction", "15%", "Bill of Materials, PCB Layout", "PCBGeneralLogo.svg"]
    ]

    createSkillModule(hardwareSkillsArray);
}

function renderIntPerSkills () {
    const interpersonalSkillsArray = [ // [Skill, Strength%, Comments, Photo]
        ["Communication", "94%", "Public Speaking, Active Listening, Verbal/Nonverbal, Trilingual (English/French/Mandarin)", "SpeechBubbles.svg"],
        ["Leadership", "96%", "Volunteering, Mentorship, Initiative", "Leadership.svg"],
        ["Collaboration", "95%", "Extracurricular Technical Teams, Peer Support, Reliability", "Handshake.svg"],
        ["Adaptability", "98%", "Curiousity, Creative Thinking, Quick Learner, Open to Feedback", "BookOpen.svg"],
        ["Problem Solving", "97%", "Logical/Critical Thinking, Modeling, Scientific Research, Pattern Recognition", "Lightbulb.svg"],
        ["Time Management", "91%", "Deadline-Driven, Task Prioritization, Multitasking", "Timer.svg"]
    ]

    createSkillModule(interpersonalSkillsArray);
}

function createSkillModule (skillArray, skillCategory) { // Generates new module and appends to the display
    for (let i = 0; i < skillArray.length; i++) {
        let skillData = skillArray[i];

        const skillDataNode = document.createElement("div");

            skillDataNode.classList.add("skillDataNode");

            skillDataNode.style.display = "flex";
            skillDataNode.style.flexDirection = "column";

            skillDataNode.style.justifyContent = "space-equally";

            skillDataNode.style.padding = "20px";
            skillDataNode.style.gap = "10px";
            
            skillDataNode.style.borderRadius = "15px";    

            if (i % 2) {
                skillDataNode.style.backgroundColor = "#C9C9C9";
            }
            else {
                skillDataNode.style.backgroundColor = "#B9B9B9";
            }        

            skillTabDisplayNode.appendChild(skillDataNode);
        
        const skillTitleContainerNode = document.createElement("div");

            skillTitleContainerNode.style.display = "flex";
            skillTitleContainerNode.style.flexDirection = "row";

            skillTitleContainerNode.style.gap = "10px";

            skillDataNode.appendChild(skillTitleContainerNode);

            const skillTitleNode = document.createElement("div");

                skillTitleNode.classList.add("skillTitle");
                skillTitleNode.classList.add("subtitleText");

                skillTitleNode.textContent = skillData[0];

                skillTitleNode.style.fontSize = "1.5rem";
                skillTitleNode.style.fontWeight = "700";

                skillTitleContainerNode.appendChild(skillTitleNode);

            const skillLogo = document.createElement("img");

                skillLogo.src = logosDirectory + skillData[3];

                skillLogo.style.width = "1.5rem";
                skillLogo.style.height = "1.5rem";

                skillTitleContainerNode.appendChild(skillLogo);

        const skillSliderNode = document.createElement("div");

            skillSliderNode.classList.add("skillSlider");

            skillDataNode.appendChild(skillSliderNode);

            const skillSliderFrame = document.createElement("div");
            
                skillSliderFrame.style.width = "1000px";
                skillSliderFrame.style.borderRadius = "10px";

                skillSliderFrame.style.backgroundColor = "#DDD9D3";

                skillSliderNode.appendChild(skillSliderFrame);

            const skillSlider = document.createElement("div");

                skillSlider.classList.add("bodyText");

                skillSlider.textContent = skillData[1];

                skillSlider.animate([
                    {width: "30px"},
                    {width: skillData[1]}
                ],
                    {
                        duration: 2000,
                        iterations: 1,
                        fill: "forwards",
                        easing: "ease-in-out",
                    }
                )

                skillSlider.style.height = "18px";
                
                skillSlider.style.borderRadius = "10px";

                skillSlider.style.paddingRight = "10px";
                skillSlider.style.paddingLeft = "5px";
                skillSlider.style.paddingTop = "1px";

                skillSlider.style.textAlign = "right";

                skillSlider.style.fontWeight = "700";
                skillSlider.style.fontSize = "0.75rem"

                skillSlider.style.color = "#F5F0E8";
                skillSlider.style.backgroundColor = "#8C7B6B";

                skillSliderFrame.appendChild(skillSlider);
            


        const skillCommentsNode = document.createElement("div");

            skillCommentsNode.classList.add("skillComments");
            skillCommentsNode.classList.add("bodyText");

            skillCommentsNode.textContent = skillData[2];

            skillCommentsNode.style.fontSize = "0.75rem";
            skillCommentsNode.style.fontWeight = "700";

            skillDataNode.appendChild(skillCommentsNode);
    }
}


function main() {
    initializeSkillGroupListeners();

    renderSoftwareSkills();
}

main();