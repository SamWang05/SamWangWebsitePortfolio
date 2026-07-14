const skillGroupsNodeArray = document.querySelectorAll(".skillGroup");
const skillTabDisplayNode = document.querySelector(".skillTabDisplay");

const softwareSkillNode = document.querySelector(".softwareSkills");

const baseColor = "#D9D9D9";
const selectColor = "#C9C9C9";

function initializeSkillGroupListeners() {
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

            }
        });
    });
}

function renderSkillTabDisplay () {
    
}

function defaultSkillGroupSelection() {
    softwareSkillNode.style.backgroundColor = selectColor;
    softwareSkillNode.style.borderRadius = "25px 0px 0px 25px";

    skillTabDisplayNode.style.backgroundColor = selectColor;
}

function main() {
    initializeSkillGroupListeners();
    defaultSkillGroupSelection();
}

main();