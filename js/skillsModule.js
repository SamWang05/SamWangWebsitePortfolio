const skillGroupsNodeArray = document.querySelectorAll(".skillGroup");
const skillGroupDisplayNode = document.querySelector(".skillGroupDisplay");

const softwareSkillNode = document.querySelector(".softwareSkills");
const hardwareSkillNode = document.querySelector(".hardwareSkills");
const labSkillNode = document.querySelector(".labSkills");
const languageSkillNode = document.querySelector(".languageSkills");

function initializeSkillGroupSelectors() {
    skillGroupsNodeArray.forEach((skillGroup) => {
        skillGroup.addEventListener("mouseenter", (event) => {
            const targetNode = event.target;
            console.log(targetNode);
        });
    });
}

function main() {
    initializeSkillGroupSelectors();
}

main();