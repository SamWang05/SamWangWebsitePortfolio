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



function renderSoftwareSkills () {
    const softwareSkillsArray = [ /* [Skill, Strength%, Comments, # of Years] */
        ["Python", "82%", "Automation, Data Processing and Visualization", "5+"],
        ["C/C++", "73%", "Object-Oriented Programming, Data Structures, Time/Space Optimization", "3"],
        ["MATLAB", "68%", "Matrix Operations, 3D Visualization, Signal Analysis", "4"],
        ["PCB Design Software", "3", "Altium Designer, KiCAD, Circuit Construction, Simulation, Component Selection, PCB Design and Layout", "33%"],
        ["Circuit Simulation", "1", "PSPICE/LTSPICE, Digital Logic, Transistor Circuits", "68%"],
        ["Keil uVision", "59%", "Assembly/C++, ARM Microcontrollers", "1"],
        ["GitHub", "46%", "Version Control, Collaborative Software Design, Open-Source Software, Licensing", "<1",]
        ["Assembly", "23%", "Machine Code, Hardware Architecture", "<1"],
    ]


}

function renderHardwareSkills () {
    const hardwareSkillsArray = [ /* [Skill, Strength%, Comments, # of Years] */
        ["Microcontrollers", "74%", "Arduino, TI MSP-432, Raspberry Pi, Jetson Nano", "5+"],
        ["Debugging and Testing", "71%", "Breadboard Prototyping, Testing Suites, Data Sheets", "5+"],
        ["Oscilloscope/Multimeter Measurements", "54%", "Circuit Analysis/Troubleshooting, Digital Logic, AC Signals", "4"],
        ["Circuit Design", "63%", "Theoretical Circuit Models, Linear Circuits, Filters, Converters, Transistors", "3"],
        ["Verification and Protection", "47%", "Circuit Protection, Component Selection, Collaborative Engineering", "2"],
        ["PCB Construction", "15%", "Bill of Materials, PCB Layout", "<1"]
    ]
}

function renderIntPerSkills () {
    const interpersonalSkillsArray = [ /* [Skill, Strength%, Comments] */
        ["Communication", "92%", "Public Speaking, Active Listening, Verbal/Nonverbal, Trilingual (English/French/Mandarin)"],
        ["Leadership", "96%", "Volunteering, Mentorship, Initiative"],
        ["Collaboration", "95%", "Extracurricular Technical Teams, Peer Support, Reliability"],
        ["Adaptability", "98%", "Curiousity, Creative Thinking, Quick Learner, Open to Feedback"],
        ["Problem Solving", "95%", "Logical/Critical Thinking, Modeling, Scientific Research, Pattern Recognition"],
    ]
}





function main() {
    initializeSkillGroupListeners();
}

main();