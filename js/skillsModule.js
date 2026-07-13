const skillGroupsNodeArray = document.querySelectorAll(".skillGroup");
const skillGroupDisplayNode = document.querySelector(".skillGroupDisplay");

const softwareSkillNode = document.querySelector(".softwareSkills");
const hardwareSkillNode = document.querySelector(".hardwareSkills");
const labSkillNode = document.querySelector(".labSkills");
const languageSkillNode = document.querySelector(".languageSkills");

const baseColor = "#D9D9D9";
const selectColor = "#C9C9C9";

function initializeSkillGroupListeners() {
    skillGroupsNodeArray.forEach((skillGroup) => {
        skillGroup.addEventListener("mouseenter", (event) => {
            const targetNode = event.target;

            targetNode.style.backgroundColor = selectColor;
            targetNode.style.marginRight = "0px";
            targetNode.style.borderRadius = "25px 0px 0px 25px";

            skillGroupDisplayNode.style.backgroundColor = selectColor;
        });
        skillGroup.addEventListener("mouseleave", (event) => {
            const targetNode = event.target;

            targetNode.style.backgroundColor = baseColor;
            targetNode.style.marginRight = "50px";
            targetNode.style.borderRadius = "25px";

            skillGroupDisplayNode.style.backgroundColor = baseColor;
        });
    });
}

function animateSkillGroupSelectors(skillGroupNode) {

}

function main() {
    initializeSkillGroupListeners();
}

main();