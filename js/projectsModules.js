const projectsDisplayNode = document.querySelector(".projectsDisplay");
const projectsArray = [
    [true, "test1"],
    [true, "test2"],
    [true, "test3"],
    [true, "test4"],
    [true, "test5"],
    [false, "tes6"],
    [true, "test7"],
    [true, "test8"],
    [true, "test9"],
    [true, "test10"],
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

    projectsArray.forEach((project) => {
        if (project[0]) {
            const moduleCard = document.createElement("div");

            renderCard(moduleCard, project);

            rowObjects[rowCount - 1].appendChild(moduleCard);

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