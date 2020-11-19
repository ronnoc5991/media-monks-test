// Grab elements from Document ---------------------------------------
const body = document.getElementsByTagName('body')[0];
const loadingScreen = document.getElementById('loading-screen');
const backgroundImage = document.getElementById('background');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const steps: any = document.getElementsByClassName('step');
const textDivs: any = document.getElementsByClassName('text');
const endContainer = document.getElementById('end-container');
let screenWidth = window.innerWidth;
let imageWidth = window.innerHeight * 11.320374;


// State of the App ---------------------------------------------------
let currentStep: number;


// Add Event Listeners -----------------------------------------------
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.transform = 'translateY(-100%)';
        }, 200);
    }, 1000 )
})

window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    imageWidth = window.innerHeight * 11.320374;
})

leftArrow.addEventListener('click', () => {
    handleClick(String(currentStep - 1));
})

rightArrow.addEventListener('click', () => {
    handleClick(String(currentStep + 1));
})

for (let i = 0; i < steps.length; i++) {
    steps[i].addEventListener('click', () => {
        handleClick(steps[i].dataset.stepNumber);
    })
}

//Controller  ------------------------------------------------------
function handleClick (stepNumber: string) {
    updateStep(stepNumber);
    transformImage(currentStep);
    updateStepMap(currentStep);
    updateArrows(currentStep);
    updateText(currentStep);
    updateStepCountText(currentStep);
}

// Logic -----------------------------------------------------------

function updateStep(stepNumber: string) {
    currentStep = parseInt(stepNumber);
}

// DOM Manipulation ------------------------------------------------

function transformImage(currentStep: number) {
    switch (currentStep) {
        case 0:
            if (screenWidth < 1000) {
                backgroundImage.style.transform = `translate(-${ (imageWidth * .05) - (screenWidth / 2) }px)`;
            } else {
                backgroundImage.style.transform = 'translate(0)';
            }
            endContainer.style.transform = 'translate(100%)';
            break;
        case 1:
            if (screenWidth < 1000) { //mobile
                backgroundImage.style.transform = `translate(-${ (imageWidth * .20) - (screenWidth / 2) }px)`;
            } else {
                backgroundImage.style.transform = `translate(-${ imageWidth * .11 }px)`;
            }
            endContainer.style.transform = 'translate(100%)';
            break;
        case 2:
            backgroundImage.style.transform = `translate(-${ (imageWidth * .28) - (screenWidth / 2) }px)`;
            endContainer.style.transform = 'translate(100%)';
            break;
        case 3:
            if (screenWidth < 1000) {
                backgroundImage.style.transform = `translate(-${ (imageWidth * .35) - (screenWidth / 2) }px)`;
            } else {
                backgroundImage.style.transform = `translate(-${ (imageWidth * .38) - (screenWidth / 2) }px)`;
            }
            endContainer.style.transform = 'translate(100%)';
            break;
        case 4:
            if (screenWidth < 1000) {
                backgroundImage.style.transform = `translate(-${ (imageWidth * .48) - (screenWidth / 2) }px)`;
            } else {
                backgroundImage.style.transform = `translate(-${ (imageWidth * .51) - (screenWidth / 2) }px)`;
            }
            endContainer.style.transform = 'translate(100%)';
            break;
        case 5:
            if (screenWidth < 1000) {
                backgroundImage.style.transform = `translate(-${ (imageWidth * .59) - ( screenWidth / 2 ) }px)`;
            } else {
                backgroundImage.style.transform = `translate(-${ (imageWidth * .63) - ( screenWidth / 2 ) }px)`;
            }
            endContainer.style.transform = 'translate(100%)';
            break;
        case 6:
            backgroundImage.style.transform = `translate(-${ (imageWidth * .83) - (screenWidth) }px)`;
            endContainer.style.transform = 'translate(100%)';
            break;
        case 7:
            backgroundImage.style.transform = `translate(-${ imageWidth - screenWidth }px)`;
            endContainer.style.transform = 'translate(100%)';
            break;
        case 8:
            backgroundImage.style.transform = `translate(-${ imageWidth - screenWidth }px)`;
            endContainer.style.transform = 'translate(100%)';
            break;
        case 9:
            backgroundImage.style.transform = `translate(-${ imageWidth - (screenWidth / 5) }px)`;
            endContainer.style.transform = 'translate(0)';
            break;
        default: 
    }
}

function updateStepMap (currentStep: number) {
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove("active");
    }
    for (let i = 0; i < steps.length; i++) {
        if (steps[i].dataset.stepNumber == currentStep) {
            steps[i].classList.add("active");
        }
    }
}

function updateArrows (currentStep: number) {
    if (currentStep === 0) {
        leftArrow.style.opacity = '0';
        leftArrow.style.display = 'none';
    } else {
        if (leftArrow.style.opacity === '0') {
            setTimeout(() => {
                leftArrow.style.display = 'flex';
                leftArrow.style.opacity = '1';
            }, 1000);
        }
    }
    if (currentStep === 9) {
        rightArrow.style.opacity = '0';
        rightArrow.style.display = 'none';
    } else {
        setTimeout(() => {
            rightArrow.style.display = 'flex';
            rightArrow.style.opacity = '1';
        }, 1000)
    }
}

function updateText(currentStep: number) {
    for (let i = 0; i < textDivs.length; i++) {
        textDivs[i].style.opacity = '0';
        textDivs[i].style.display = 'none';
    }
    for (let i = 0; i < textDivs.length; i++) {
        if (parseInt(textDivs[i].dataset.showOn) === currentStep) {
            textDivs[i].style.display = 'block';
            setTimeout(() => {
                textDivs[i].style.opacity = '1';
            }, 1000);
        }
    }
}

function updateStepCountText(currentStep: number) {
    if (document.getElementById('step-counter-text')) {
        body.removeChild(document.getElementById('step-counter-text'));
    }
    if (currentStep > 0 && currentStep < 9) {
        let stepTextDiv = document.createElement('div');
        stepTextDiv.id = ('step-counter-text');
        stepTextDiv.classList.add('sub-header');
        stepTextDiv.classList.add('text');
        let stepText = document.createElement('p');
        stepText.innerHTML = `Step ${currentStep} out of 8 on the path to digital enlightenment`;
        stepTextDiv.appendChild(stepText);
        stepTextDiv.style.opacity = '0';
        body.appendChild(stepTextDiv);
        setTimeout(() => {
            stepTextDiv.style.opacity = '1';
        }, 1000);
    }
}

handleClick('0');