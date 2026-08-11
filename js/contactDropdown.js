const contactModulesDisplay = document.querySelector(".contactModules");
const contactModulesArray = document.querySelectorAll(".contactModule");



/* Listeners */

function createHoverListeners(contactArray) {
    contactArray.forEach((contactObj) => {
        const contactObjBody = contactObj.querySelector(".bodyText");

        contactObj.addEventListener("mouseenter", () => {

            contactObjBody.animate([
                {transform: "translateY(-10px)", opacity: 0},
                {transform: "translateY(0px)", opacity: 1},
            ],
                {
                    duration: 500,
                    iterations: 1,
                    fill: "forwards",
                    easing: "ease-in-out",
                }
            )
        });

        contactObj.addEventListener("mouseleave", () => {
            contactObjBody.animate([
                {transform: "translateY(0px)", opacity: 1},
                {transform: "translateY(-10px)", opacity: 0},
            ],
                {
                    duration: 500,
                    iterations: 1,
                    fill: "forwards",
                    easing: "ease-in-out",
                }
            )
        });
    });
}



/* Main Function */

function main() {
    createHoverListeners(contactModulesArray);
}

main();