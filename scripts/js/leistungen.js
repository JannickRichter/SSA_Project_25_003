//Events
window.addEventListener("DOMContentLoaded", function () {
    stepTicker();
});
document.querySelectorAll('.overview-list-btn').forEach(btn => {
    btn.addEventListener('click', openOverviewBox.bind(null, btn));
});
document.querySelectorAll('.leist-detailed-close-btn').forEach(btn => {
    btn.addEventListener('click', closeOverviewBox);
});

//Ticker
const tickerInner = document.querySelector('.leist-showcase-list-outerwrapper');
const tickerList = tickerInner.querySelector('.leist-showcase-list-wrapper');
// Liste kopieren, um nahtlosen Loop zu ermöglichen
const clone = tickerList.cloneNode(true);
tickerInner.appendChild(clone);

// Animationsparameter
const tickerSpeed = 0.5; // Pixel pro Frame
let tickerPos = 0;

function stepTicker() {
    tickerPos -= tickerSpeed;
    // Wenn die erste Liste komplett ausgeblendet ist, zurücksetzen
    if (Math.abs(tickerPos) >= tickerList.offsetWidth) {
        tickerPos = 0;
    }
    tickerInner.style.transform = `translateX(${tickerPos}px)`;
    requestAnimationFrame(stepTicker);
}

//Overview Color
const overviewUpper = document.querySelector('.overview-section-upper-wrapper');
const overviewLower = document.querySelector('.overview-section-lower-wrapper');
const lightColor = "rgba(237, 200, 148, 0.4)";
overviewUpper.querySelectorAll('.overview-list-item').forEach((item, i) => {
    if (i % 2 !== 0) {
        item.style.backgroundColor = lightColor;
    }
});
overviewLower.querySelectorAll('.overview-list-item').forEach((item, i) => {
    if (i % 2 == 0) {
        item.style.backgroundColor = lightColor;
    }
});

//Overview
var boxOpened = "";
function openOverviewBox(btn) {
    document.querySelectorAll('.leistung-detailed-item-wrapper').forEach(box => {
        if (box.getAttribute('btn-link') === btn.getAttribute('btn-link')) {
            const section = document.querySelector('.leist-detailed-section');
            boxOpened = box.getAttribute('btn-link');
            section.style.display = 'flex';
            setTimeout(() => {
                section.classList.add('leist-detailed-shown');
                box.style.display = 'flex';
                setTimeout(() => {
                    if (boxOpened !== box.getAttribute('btn-link')) {
                        return;
                    }
                    box.classList.add('leist-detailed-item-shown');
                }, 200);
            }, 1);
        }
    });
}

function closeOverviewBox() {
    document.querySelectorAll('.leistung-detailed-item-wrapper').forEach(box => {
        if (boxOpened === box.getAttribute('btn-link')) {
            boxOpened = "";
            box.classList.remove('leist-detailed-item-shown');
            setTimeout(() => {
                if (boxOpened === box.getAttribute('btn-link')) {
                    return;
                }
                const section = document.querySelector('.leist-detailed-section');
                box.style.display = 'none';
                section.classList.remove('leist-detailed-shown');
                setTimeout(() => {
                    if (boxOpened === box.getAttribute('btn-link')) {
                        return;
                    }
                    section.style.display = 'none';
                }, 201);
            }, 201);
        }
    });

}
