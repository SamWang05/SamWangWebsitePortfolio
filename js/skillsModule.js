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
        skillGroup.addEventListener("click", (event) => {
            const targetNode = event.currentTarget;
            const targetClassList = targetNode.classList[1];

            skillGroupsNodeArray.forEach((skill) => {
                const skillClassList = skill.classList[1];

                if (skillClassList == targetClassList) {
                    skill.style.backgroundColor = selectColor;
                }
                else {
                    skill.style.backgroundColor = baseColor;

                    skillGroupDisplayNode.style.backgroundColor = baseColor;
                }
            });

            switch(targetClassList) {

            }

            skillGroupDisplayNode.style.backgroundColor = selectColor;
        });
    });
}

function animateSkillGroupSelectors(skillGroupNode) {

}

function defaultSkillGroupSelection() {
    softwareSkillNode.style.backgroundColor = selectColor;
    softwareSkillNode.style.borderRadius = "25px 0px 0px 25px";

    skillGroupDisplayNode.style.backgroundColor = selectColor;
}

function main() {
    initializeSkillGroupListeners();
    defaultSkillGroupSelection();
}

main();