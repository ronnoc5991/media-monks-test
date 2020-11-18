// Grab elements from Document ---------------------------------------
const body = document.getElementsByTagName('body')[0];
const loadingScreen = document.getElementById('loading-screen');
const backgroundImage = document.getElementById('background');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const steps: any = document.getElementsByClassName('step');
const textDivs: any = document.getElementsByClassName('text'); 
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
        }, 600);
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
    changeStep(stepNumber);
    transformImage(currentStep);
    updateStepMap(currentStep);
    updateArrows(currentStep);
    changeText(currentStep);
    displayStepCountText(currentStep);
}

// Logic -----------------------------------------------------------

function changeStep(stepNumber: string) {
    currentStep = parseInt(stepNumber);
}

// DOM Manipulation ------------------------------------------------

function transformImage(currentStep: number) {
    switch (currentStep) {
        case 0:
            backgroundImage.style.transform = 'translate(0)';
            break;
        case 1:
            backgroundImage.style.transform = `translate(-${ imageWidth * .11 }px)`;
            break;
        case 2:
            backgroundImage.style.transform = `translate(-${ imageWidth * .19 }px)`;
            break;
        case 3:
            backgroundImage.style.transform = `translate(-${ imageWidth * .31 }px)`;
            break;
        case 4:
            backgroundImage.style.transform = `translate(-${ imageWidth * .42 }px)`;
            break;
        case 5:
            backgroundImage.style.transform = `translate(-${ imageWidth * .54 }px)`;
            break;
        case 6:
            backgroundImage.style.transform = `translate(-${ imageWidth * .66 }px)`;
            break;
        case 7:
            backgroundImage.style.transform = `translate(-${ imageWidth - screenWidth }px)`;
            break;
        case 8:
            backgroundImage.style.transform = `translate(-${ imageWidth - screenWidth }px)`;
            break;
        case 9:
            backgroundImage.style.transform = `translate(-${ imageWidth - (screenWidth / 5) }px)`;
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
    } else {
        if (leftArrow.style.opacity === '0') {
            setTimeout(() => {
                leftArrow.style.opacity = '1';
            }, 1000);
        }
    }
    if (currentStep === 9) {
        rightArrow.style.opacity = '0';
    } else {
        setTimeout(() => {
            rightArrow.style.opacity = '1';
        }, 1000)
    }
}

function changeText(currentStep: number) {
    for (let i = 0; i < textDivs.length; i++) {
        textDivs[i].style.opacity = '0';
    }
    for (let i = 0; i < textDivs.length; i++) {
        if (parseInt(textDivs[i].dataset.showOn) === currentStep) {
            setTimeout(() => {
                textDivs[i].style.opacity = '1';
            }, 1000);
        }
    }
}

function displayStepCountText(currentStep: number) {
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
        setTimeout(() => {
            body.appendChild(stepTextDiv);
        }, 1000);
    }
}

handleClick('0');