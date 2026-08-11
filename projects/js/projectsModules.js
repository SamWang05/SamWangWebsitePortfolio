const projectsDisplayNode = document.querySelector(".projectsDisplay");

const PROJECTS_DIRECTORY = "/projects/html/";
const IMAGES_DIRECTORY = "/projects/assets/img/";

const projectsArray = [
    [false, "Mechanical Arm Project", "mechArmProject.html", ""],
    [true, "LiDAR Project", "LIDARProject.html", "LIDARSystem.jpg"],
    [true, "Website Portfolio", "websitePortfolio.html", "webLogo.svg"],
];



/* Logic Functions */

function isRowFull(projectRow){
    if (projectRow.childElementCount >= 3) return true;
    else return false;
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

                moduleCardLink.href = PROJECTS_DIRECTORY + project[2];

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

    moduleCardObj.style.backgroundImage = "url('" + IMAGES_DIRECTORY + project[3] + "')";
    moduleCardObj.style.backgroundRepeat = "no-repeat";
    moduleCardObj.style.backgroundSize = "cover";

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