const skillGroupsNodeArray = document.querySelectorAll(".skillGroup");
const skillTabDisplayNode = document.querySelector(".skillTabDisplay");

const softwareSkillNode = document.querySelector(".softwareSkills");

const baseColor = "#D9D9D9";
const selectColor = "#C9C9C9";



function initializeSkillGroupListeners() {
    softwareSkillNode.style.backgroundColor = selectColor;

    skillGroupsNodeArray.forEach((skillGroup) => {
        skillGroup.addEventListener("click", (event) => {
            event.preventDefault();

            const targetNode = event.currentTarget;
            const targetClassList = targetNode.classList[1];

            skillGroupsNodeArray.forEach((skill) => {
                const skillClassList = skill.classList[1];

                if (skillClassList == targetClassList) {
                    skill.style.backgroundColor = selectColor;
                }
                else {
                    skill.style.backgroundColor = baseColor;
                }
            });

            switch(targetClassList) {
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
    /* Just clear all the children */
}

function renderSoftwareSkills () {
    const softwareSkillsArray = [ /* [Skill, Strength%, Comments] */
        ["Python", "82%", "Automation, Data Processing and Visualization"],
        ["C/C++", "73%", "Object-Oriented Programming, Data Structures, Time/Space Optimization"],
        ["MATLAB", "68%", "Matrix Operations, 3D Visualization, Signal Analysis"],
        ["PCB Design Software", "3", "Altium Designer, KiCAD, Circuit Construction, Simulation, Component Selection, PCB Design and Layout"],
        ["Circuit Simulation", "1", "PSPICE/LTSPICE, Digital Logic, Transistor Circuits"],
        ["Keil uVision", "59%", "Assembly/C++, ARM Microcontrollers"],
        ["GitHub", "46%", "Version Control, Collaborative Software Design, Open-Source Software, Licensing"],
        ["Assembly", "23%", "Machine Code, Hardware Architecture"],
    ]

    createSkillModule(softwareSkillsArray);
}

function renderHardwareSkills () {
    const hardwareSkillsArray = [ /* [Skill, Strength%, Comments] */
        ["Microcontrollers", "74%", "Arduino, TI MSP-432, Raspberry Pi, Jetson Nano"],
        ["Debugging and Testing", "71%", "Breadboard Prototyping, Testing Suites, Data Sheets"],
        ["Oscilloscope/Multimeter Measurements", "54%", "Circuit Analysis/Troubleshooting, Digital Logic, AC Signals"],
        ["Circuit Design", "63%", "Theoretical Circuit Models, Linear Circuits, Filters, Converters, Transistors"],
        ["Verification and Protection", "47%", "Circuit Protection, Component Selection, Collaborative Engineering"],
        ["PCB Construction", "15%", "Bill of Materials, PCB Layout"]
    ]

    createSkillModule(hardwareSkillsArray);
}

function renderIntPerSkills () {
    const interpersonalSkillsArray = [ /* [Skill, Strength%, Comments] */
        ["Communication", "92%", "Public Speaking, Active Listening, Verbal/Nonverbal, Trilingual (English/French/Mandarin)"],
        ["Leadership", "96%", "Volunteering, Mentorship, Initiative"],
        ["Collaboration", "95%", "Extracurricular Technical Teams, Peer Support, Reliability"],
        ["Adaptability", "98%", "Curiousity, Creative Thinking, Quick Learner, Open to Feedback"],
        ["Problem Solving", "95%", "Logical/Critical Thinking, Modeling, Scientific Research, Pattern Recognition"]
    ]

    createSkillModule(interpersonalSkillsArray);
}

function createSkillModule (skillArray, skillCategory) {
    for (let i = 0; i < skillArray.length; i++) {
        let skillData = skillArray[i];

        const skillDataNode = document.createElement("div");

            skillDataNode.classList.add("skillDataNode");

            skillDataNode.style.display = "flex";
            skillDataNode.style.flexDirection = "column";

            skillDataNode.style.justifyContent = "space-equally";

            skillDataNode.style.padding = "20px";
            
            skillDataNode.style.borderRadius = "15px";    

            if (i % 2) {
                skillDataNode.style.backgroundColor = "#C9C9C9";
            }
            else {
                skillDataNode.style.backgroundColor = "#B9B9B9";
            }        

            skillTabDisplayNode.appendChild(skillDataNode);
        


        const skillTitleNode = document.createElement("div");

            skillTitleNode.classList.add("skillTitle");
            skillTitleNode.classList.add("subtitleText");

            skillTitleNode.textContent = skillData[0];

            skillTitleNode.style.fontSize = "1.5rem";
            skillTitleNode.style.fontWeight = "700";

            skillDataNode.appendChild(skillTitleNode);



        const skillSliderNode = document.createElement("div");

            skillSliderNode.classList.add("skillSlider");

            skillDataNode.appendChild(skillSliderNode);
        


        const skillCommentsNode = document.createElement("div");

            skillCommentsNode.classList.add("skillComments");
            skillCommentsNode.classList.add("bodyText");

            skillCommentsNode.textContent = skillData[2];

            skillCommentsNode.style.fontSize = "0.75rem";

            skillDataNode.appendChild(skillCommentsNode);
        /* 
            skillDataNode
               skillTitle subtitleText
               skillSlider
               skillComments bodyText
        */

        /* 
            use different emojis/svgs to represent different percentages of skill (ex: 20% = egg, 40% = baby chicken, etc.)
        */
    }
}



function main() {
    initializeSkillGroupListeners();
}

main();