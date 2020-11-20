// Grab DOM elements ---------------------------------------
var body = document.getElementsByTagName('body')[0];
var loadingScreen = document.getElementById('loading-screen');
var backgroundImage = document.getElementById('background');
var leftArrow = document.getElementById('leftArrow');
var rightArrow = document.getElementById('rightArrow');
var steps = document.getElementsByClassName('step');
var textDivs = document.getElementsByClassName('text');
var contactContainer = document.getElementById('end-container');
// Event Listeners ------------------------------------------------
window.addEventListener('load', function () {
    setTimeout(function () {
        loadingScreen.style.opacity = '0';
        setTimeout(function () {
            loadingScreen.style.transform = 'translateY(-100%)';
        }, 500);
    }, 3500);
});
window.addEventListener('resize', function () {
    screenWidth = window.innerWidth;
    imageWidth = window.innerHeight * 11.320374;
    transformBackgroundImage(currentStep);
});
leftArrow.addEventListener('click', function () {
    updateApp(currentStep - 1);
});
rightArrow.addEventListener('click', function () {
    updateApp(currentStep + 1);
});
var _loop_1 = function (i) {
    steps[i].addEventListener('click', function () {
        updateApp(parseInt(steps[i].dataset.stepNumber));
    });
};
for (var i = 0; i < steps.length; i++) {
    _loop_1(i);
}
// State ---------------------------------------------------
var currentStep;
var screenWidth = window.innerWidth;
var imageWidth = window.innerHeight * 11.320374;
//Controller  ------------------------------------------------------
function updateApp(stepNumber) {
    updateStep(stepNumber);
    updateDom(currentStep);
}
function updateDom(step) {
    transformBackgroundImage(step);
    handleContentContainer(step);
    updateStepMap(step);
    updateArrows(step);
    updateMainText(step);
    updateStepCountText(step);
}
// Logic -----------------------------------------------------------
function updateStep(stepNumber) {
    (stepNumber >= 0 && stepNumber <= 9) ? currentStep = stepNumber : undefined;
}
// DOM Manipulation ------------------------------------------------
function transformBackgroundImage(currentStep) {
    backgroundImage.style.transform = "translate(" + getTransformValue(currentStep) + "px)";
}
function smallerScreen() {
    return (screenWidth < 1000);
}
function getTransformValue(currentStep) {
    switch (currentStep) {
        case 0:
            return smallerScreen() ? -((imageWidth * .05) - (screenWidth / 2)) : 0;
        case 1:
            return smallerScreen() ? -((imageWidth * .20) - (screenWidth / 2)) : -(imageWidth * .11);
        case 2:
            return -((imageWidth * .28) - (screenWidth / 2));
        case 3:
            return smallerScreen() ? -((imageWidth * .35) - (screenWidth / 2)) : -((imageWidth * .38) - (screenWidth / 2));
        case 4:
            return smallerScreen() ? -((imageWidth * .48) - (screenWidth / 2)) : -((imageWidth * .51) - (screenWidth / 2));
        case 5:
            return smallerScreen() ? -((imageWidth * .59) - (screenWidth / 2)) : -((imageWidth * .63) - (screenWidth / 2));
        case 6:
            return -((imageWidth * .825) - (screenWidth));
        case 7:
            return -(imageWidth - screenWidth);
        case 8:
            return -(imageWidth - screenWidth);
        case 9:
            return (screenWidth < 375) ? -imageWidth : -(imageWidth - (screenWidth / 6));
        default:
    }
}
function handleContentContainer(currentStep) {
    (currentStep === 9) ? contactContainer.style.transform = 'translate(0)' : contactContainer.style.transform = 'translate(100%';
}
function updateStepMap(currentStep) {
    for (var i = 0; i < steps.length; i++) {
        steps[i].classList.remove("active");
        if (steps[i].dataset.stepNumber == currentStep) {
            steps[i].classList.add("active");
        }
    }
}
function updateArrows(currentStep) {
    if (currentStep === 0) {
        leftArrow.style.opacity = '0';
        leftArrow.style.display = 'none';
    }
    else {
        if (leftArrow.style.opacity === '0') {
            leftArrow.style.display = 'flex';
            setTimeout(function () {
                leftArrow.style.opacity = '1';
            }, 1000);
        }
    }
    if (currentStep === 9) {
        rightArrow.style.opacity = '0';
        rightArrow.style.display = 'none';
    }
    else {
        rightArrow.style.display = 'flex';
        setTimeout(function () {
            rightArrow.style.opacity = '1';
        }, 1000);
    }
}
function updateMainText(currentStep) {
    for (var i = 0; i < textDivs.length; i++) {
        textDivs[i].style.opacity = '0';
        textDivs[i].style.display = 'none';
    }
    var _loop_2 = function (i) {
        if (parseInt(textDivs[i].dataset.showOn) === currentStep) {
            textDivs[i].style.display = 'block';
            setTimeout(function () {
                textDivs[i].style.opacity = '1';
            }, 1000);
        }
    };
    for (var i = 0; i < textDivs.length; i++) {
        _loop_2(i);
    }
}
function updateStepCountText(currentStep) {
    if (document.getElementById('step-counter-text')) {
        body.removeChild(document.getElementById('step-counter-text'));
    }
    if (currentStep > 0 && currentStep < 9) {
        var stepTextDiv_1 = document.createElement('div');
        stepTextDiv_1.id = ('step-counter-text');
        stepTextDiv_1.classList.add('sub-header');
        stepTextDiv_1.classList.add('text');
        var stepText = document.createElement('p');
        stepText.innerHTML = "Step " + currentStep + " out of 8 on the path to digital enlightenment";
        stepTextDiv_1.appendChild(stepText);
        stepTextDiv_1.style.opacity = '0';
        body.appendChild(stepTextDiv_1);
        setTimeout(function () {
            stepTextDiv_1.style.opacity = '1';
        }, 1000);
    }
}
// Initialize -----------------------------------------------------
updateApp(0);
