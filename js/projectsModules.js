const projectsDisplayNode = document.querySelector(".projectsDisplay");

const projectsDirectory = "/projects/";
const projectsArray = [
    [false, "Template Project", "templateProject.html"],
    [true, "Mechanical Arm Project", "templateProject.html"],
    [true, "LiDAR Project", "templateProject.html"],
    [true, "Website Portfolio", "templateProject.html"],
];


/* Logic Functions */

function isRowFull(projectRow){
    if (projectRow.childElementCount >= 3) return true;
    else return false;
}



/* Listener Functions */

function moduleCardListener(project) {
    document.addEventListener("click", () => {

    });
}



/* Projects Display Functions */

function createNewRow(rowsArray){

    const displayRow = document.createElement("div");
        displayRow.classList.add("displayRow");
        projectsDisplayNode.appendChild(displayRow);
    
    rowsArray.push(displayRow);
}

function populateProjectsDisplay(){
    let rowCount = 1;
    let rowObjects = [];

    createNewRow(rowObjects);

    projectsArray.forEach((project, index) => {
        if (project[0]) {
            const moduleCardLink = document.createElement("a");
                moduleCardLink.href = projectsDirectory + project[2];

                rowObjects[rowCount - 1].appendChild(moduleCardLink);
                
            const moduleCard = document.createElement("div");
                moduleCard.index = index;
                renderCard(moduleCard, project);

                moduleCardLink.appendChild(moduleCard);

            if (isRowFull(rowObjects[rowCount - 1])){
                createNewRow(rowObjects);

                rowCount++;
            }
        }
    });
}



/* Module Card Functions */

function renderCard(moduleCardObj, project) {
    moduleCardObj.classList.add("moduleCard");

    const moduleTitle = document.createElement("div");

        moduleTitle.classList.add("titleText");

        moduleTitle.textContent = project[1];

        moduleCardObj.appendChild(moduleTitle);
}



/* Main Function */

function main() {
    populateProjectsDisplay();
}

main();