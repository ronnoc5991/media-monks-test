// Grab DOM elements ---------------------------------------
const body = document.getElementsByTagName('body')[0];
const loadingScreen = document.getElementById('loading-screen');
const backgroundImage = document.getElementById('background');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const steps: any = document.getElementsByClassName('step');
const textDivs: any = document.getElementsByClassName('text');
const contactContainer = document.getElementById('end-container');

// Event Listeners ------------------------------------------------

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.transform = 'translateY(-100%)';
        }, 500);
    }, 3500 )
})

window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    imageWidth = window.innerHeight * 11.320374;
    transformBackgroundImage(currentStep);
})

leftArrow.addEventListener('click', () => {
    updateApp(currentStep - 1);
})

rightArrow.addEventListener('click', () => {
    updateApp(currentStep + 1);
})

for (let i = 0; i < steps.length; i++) {
    steps[i].addEventListener('click', () => {
        updateApp(parseInt(steps[i].dataset.stepNumber));
    })
}

// State ---------------------------------------------------
let currentStep: number;
let screenWidth = window.innerWidth;
let imageWidth = window.innerHeight * 11.320374;

//Controller  ------------------------------------------------------
function updateApp (stepNumber: number) {
    updateStep(stepNumber);
    updateDom(currentStep);
}

function updateDom (step: number) {
    transformBackgroundImage(step);
    handleContentContainer(step);
    updateStepMap(step);
    updateArrows(step);
    updateMainText(step);
    updateStepCountText(step);
} 

// Logic -----------------------------------------------------------

function updateStep(stepNumber: number) {
    (stepNumber >= 0 && stepNumber <= 9) ? currentStep = stepNumber : undefined;
}

// DOM Manipulation ------------------------------------------------

function transformBackgroundImage (currentStep: number) {
    backgroundImage.style.transform = `translate(${getTransformValue(currentStep)}px)`;
}

function smallerScreen () {
    return (screenWidth < 1000);
}

function getTransformValue (currentStep: number) {
    switch (currentStep) {
        case 0:
            return smallerScreen() ? -((imageWidth * .05) - (screenWidth / 2)) : 0;
        case 1:
            return smallerScreen() ? -((imageWidth * .20) - (screenWidth / 2)) : -(imageWidth * .11);
        case 2:
            return -((imageWidth * .28) - (screenWidth / 2))
        case 3:
            return smallerScreen() ? -((imageWidth * .35) - (screenWidth / 2)) : -((imageWidth * .38) - (screenWidth / 2));
        case 4:
            return smallerScreen() ? -((imageWidth * .48) - (screenWidth / 2)) : -((imageWidth * .51) - (screenWidth / 2));
        case 5:
            return smallerScreen() ? -((imageWidth * .59) - ( screenWidth / 2 )) : -((imageWidth * .63) - ( screenWidth / 2 ))
        case 6:
            return -((imageWidth * .825) - (screenWidth))
        case 7:
            return -(imageWidth - screenWidth)
        case 8:
            return -(imageWidth - screenWidth)
        case 9:
            return (screenWidth < 375) ? -imageWidth : -(imageWidth - (screenWidth / 6))
        default: 
    }
}

function handleContentContainer (currentStep: number) {
    (currentStep === 9) ? contactContainer.style.transform = 'translate(0)' : contactContainer.style.transform = 'translate(100%';
}

function updateStepMap (currentStep: number) {
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove("active");
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
            leftArrow.style.display = 'flex';
            setTimeout(() => {
                leftArrow.style.opacity = '1';
            }, 1000);
        }
    }
    if (currentStep === 9) {
        rightArrow.style.opacity = '0';
        rightArrow.style.display = 'none';
    } else {
        rightArrow.style.display = 'flex';
        setTimeout(() => {
            rightArrow.style.opacity = '1';
        }, 1000)
    }
}

function updateMainText(currentStep: number) {
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


// Initialize -----------------------------------------------------
updateApp(0);