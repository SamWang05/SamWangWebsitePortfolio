const skillGroupsNodeArray = document.querySelectorAll(".skillGroup");
const skillGroupDisplayNode = document.querySelector(".skillGroupDisplay");

const softwareSkillNode = document.querySelector(".softwareSkills");
const hardwareSkillNode = document.querySelector(".hardwareSkills");
const labSkillNode = document.querySelector(".labSkills");
const languageSkillNode = document.querySelector(".languageSkills");

function initializeSkillGroupListeners() {
    skillGroupsNodeArray.forEach((skillGroup) => {
        skillGroup.addEventListener("mouseenter", (event) => {
            const targetNode = event.target;

            targetNode.style.transform = "scale(1.25, 1.25)";
            skillGroupDisplayNode.style.transform = "scale(1.1, 1.1)";
        });
        skillGroup.addEventListener("mouseleave", (event) => {
            const targetNode = event.target;

            targetNode.style.transform = "scale(1, 1)";
            skillGroupDisplayNode.style.transform = "scale(1, 1)";
        });
    });
}

function animateSkillGroupSelectors(skillGroupNode) {

}

function main() {
    initializeSkillGroupListeners();
}

main();