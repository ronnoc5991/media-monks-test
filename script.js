// Grab elements from Document ---------------------------------------
var body = document.getElementsByTagName('body')[0];
var loadingScreen = document.getElementById('loading-screen');
var backgroundImage = document.getElementById('background');
var leftArrow = document.getElementById('leftArrow');
var rightArrow = document.getElementById('rightArrow');
var steps = document.getElementsByClassName('step');
var textDivs = document.getElementsByClassName('text');
var endContainer = document.getElementById('end-container');
var screenWidth = window.innerWidth;
var imageWidth = window.innerHeight * 11.320374;
// State of the App ---------------------------------------------------
var currentStep;
// Add Event Listeners -----------------------------------------------
window.addEventListener('load', function () {
    setTimeout(function () {
        loadingScreen.style.opacity = '0';
        setTimeout(function () {
            loadingScreen.style.transform = 'translateY(-100%)';
        }, 200);
    }, 1000);
});
window.addEventListener('resize', function () {
    screenWidth = window.innerWidth;
    imageWidth = window.innerHeight * 11.320374;
});
leftArrow.addEventListener('click', function () {
    handleClick(String(currentStep - 1));
});
rightArrow.addEventListener('click', function () {
    handleClick(String(currentStep + 1));
});
var _loop_1 = function (i) {
    steps[i].addEventListener('click', function () {
        handleClick(steps[i].dataset.stepNumber);
    });
};
for (var i = 0; i < steps.length; i++) {
    _loop_1(i);
}
//Controller  ------------------------------------------------------
function handleClick(stepNumber) {
    changeStep(stepNumber);
    transformImage(currentStep);
    updateStepMap(currentStep);
    updateArrows(currentStep);
    changeText(currentStep);
    displayStepCountText(currentStep);
}
// Logic -----------------------------------------------------------
function changeStep(stepNumber) {
    currentStep = parseInt(stepNumber);
}
// DOM Manipulation ------------------------------------------------
function transformImage(currentStep) {
    switch (currentStep) {
        case 0:
            backgroundImage.style.transform = 'translate(0)';
            endContainer.style.transform = 'translate(100%)';
            break;
        case 1:
            backgroundImage.style.transform = "translate(-" + imageWidth * .11 + "px)";
            endContainer.style.transform = 'translate(100%)';
            break;
        case 2:
            // backgroundImage.style.transform = `translate(-${ imageWidth * .19 }px)`;
            backgroundImage.style.transform = "translate(-" + ((imageWidth * .28) - (screenWidth / 2)) + "px)";
            endContainer.style.transform = 'translate(100%)';
            break;
        case 3:
            // backgroundImage.style.transform = `translate(-${ imageWidth * .31 }px)`;
            backgroundImage.style.transform = "translate(-" + ((imageWidth * .39) - (screenWidth / 2)) + "px)";
            endContainer.style.transform = 'translate(100%)';
            break;
        case 4:
            // backgroundImage.style.transform = `translate(-${ imageWidth * .42 }px)`;
            backgroundImage.style.transform = "translate(-" + ((imageWidth * .51) - (screenWidth / 2)) + "px)";
            endContainer.style.transform = 'translate(100%)';
            break;
        case 5:
            // backgroundImage.style.transform = `translate(-${ imageWidth * .54 }px)`;
            backgroundImage.style.transform = "translate(-" + ((imageWidth * .63) - (screenWidth / 2)) + "px)";
            endContainer.style.transform = 'translate(100%)';
            break;
        case 6:
            // backgroundImage.style.transform = `translate(-${ imageWidth * .66 }px)`;
            backgroundImage.style.transform = "translate(-" + ((imageWidth * .75) - (screenWidth / 2)) + "px)";
            endContainer.style.transform = 'translate(100%)';
            break;
        case 7:
            backgroundImage.style.transform = "translate(-" + (imageWidth - screenWidth) + "px)";
            endContainer.style.transform = 'translate(100%)';
            break;
        case 8:
            backgroundImage.style.transform = "translate(-" + (imageWidth - screenWidth) + "px)";
            endContainer.style.transform = 'translate(100%)';
            break;
        case 9:
            backgroundImage.style.transform = "translate(-" + (imageWidth - (screenWidth / 5)) + "px)";
            endContainer.style.transform = 'translate(0)';
            break;
        default:
    }
}
function updateStepMap(currentStep) {
    for (var i = 0; i < steps.length; i++) {
        steps[i].classList.remove("active");
    }
    for (var i = 0; i < steps.length; i++) {
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
            setTimeout(function () {
                leftArrow.style.display = 'flex';
                leftArrow.style.opacity = '1';
            }, 1000);
        }
    }
    if (currentStep === 9) {
        rightArrow.style.opacity = '0';
        rightArrow.style.display = 'none';
    }
    else {
        setTimeout(function () {
            rightArrow.style.display = 'flex';
            rightArrow.style.opacity = '1';
        }, 1000);
    }
}
function changeText(currentStep) {
    for (var i = 0; i < textDivs.length; i++) {
        textDivs[i].style.opacity = '0';
        textDivs[i].style.display = 'none';
    }
    var _loop_2 = function (i) {
        if (parseInt(textDivs[i].dataset.showOn) === currentStep) {
            setTimeout(function () {
                textDivs[i].style.opacity = '1';
                textDivs[i].style.display = 'block';
            }, 1000);
        }
    };
    for (var i = 0; i < textDivs.length; i++) {
        _loop_2(i);
    }
}
function displayStepCountText(currentStep) {
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
        setTimeout(function () {
            body.appendChild(stepTextDiv_1);
        }, 1000);
    }
}
handleClick('0');
