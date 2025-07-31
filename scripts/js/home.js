var leistungenSelection = 5;

initializeBreakpointSwiper();
setEvaluationContainerHeight();
setUpPreLeistungen();
setUpHoverBGBox();

//Events

var heroTransWrapper = document.querySelector('.hero-trans-box-wrapper');
document.querySelectorAll('.leistungen-peak-faecher-heading-item').forEach((item) => {
    item.addEventListener('click', onPreLeistungBtnClick.bind(this, item));
    item.addEventListener('mouseenter', hoverBoxIn.bind(this, item));
    item.addEventListener('mouseleave', setUpHoverBGBox.bind(this, item));
});
window.addEventListener('resize', () => {
    setTransBoxWidth();
    initializeBreakpointSwiper();
    setEvaluationContainerHeight();
    setUpHoverBGBox();
    if (breakpoint == "desktop") {
        updateCTABG();
        setUpCTABtn();
        ctaParagraph.style.display = "none";
    } else {
        ctaParagraph.style.display = "block";
    }
});
heroTransWrapper.addEventListener('mouseenter', () => {
    openTransBox();
});
heroTransWrapper.addEventListener('mouseleave', () => {
    closeTransBox();
});
document.querySelectorAll('.leistungen-peak-image-wrapper-cms').forEach((img) => {
    img.addEventListener('click', () => onPreLeistungImgClick(img));
});

// Scroll-Eventlistener (debounced durch AnimationFrame)
document.addEventListener("scroll", () => {
    handleGradientScroll();
});

//Tans Box Butto

function setTransBoxWidth() {
    var openBox = document.querySelector(".hero-trans-button");
    if (breakpoint === 'mobile') {
        openBox.style.display = "none";
        return;
    } else {
        if (openBox.style.display === "none") {
            openBox.style.display = "block";
        }
    }
    var ctaBox = document.querySelector(".hero-trans-box-cta");

    openBox.style.width, openBox.style.heigth = ctaBox.offsetWidth + "px";
}

function openTransBox() {
    var openBox = document.querySelector(".hero-trans-button");
    if (breakpoint === 'mobile') {
        return;
    }
    openBox.classList.add("trans-box-btn-shown");
}

function closeTransBox() {
    if (breakpoint === 'mobile') {
        return;
    }
    var openBox = document.querySelector(".hero-trans-button");
    openBox.classList.remove("trans-box-btn-shown");
}

// Pre Leistungen

function setUpPreLeistungen() {
    document.querySelectorAll('.leistungen-peak-image-wrapper-cms').forEach((img, index) => {
        img.style.zIndex = index;
    });
    document.querySelector('[text-item="5"]').classList.add('pre-leistungen-box-selected');
    var img = document.querySelector('[img-item="5"]');
    img.classList.add('leistungen-peak-image-wrapper-cms-selected');
    img.style.cursor = 'auto';
}

function onPreLeistungImgClick(img) {
    // Entferne die ausgewählte Klasse von allen Bildern
    document.querySelectorAll('.leistungen-peak-image-wrapper-cms-selected').forEach((x) => {
        x.classList.remove('leistungen-peak-image-wrapper-cms-selected');
        x.style.cursor = 'pointer';
    });

    // Markiere das geklickte Bild als ausgewählt
    img.classList.add('leistungen-peak-image-wrapper-cms-selected');
    img.style.cursor = 'auto';

    // Entferne die ausgewählte Klasse von allen Textboxen
    document.querySelectorAll('.pre-leistungen-box-selected').forEach((x) => {
        x.classList.remove('pre-leistungen-box-selected');
    });

    // Korrekte Extraktion der Zahl aus der Bild-ID
    const index = img.getAttribute('img-item');
    leistungenSelection = parseInt(index);
    setUpHoverBGBox();
    const textBox = document.querySelector("[text-item='" + index.toString() + "']");
    textBox.classList.add('pre-leistungen-box-selected');
}

function onPreLeistungBtnClick(btn) {

    // Korrekte Extraktion der Zahl aus der Bild-ID
    const index = btn.getAttribute('heading-item');
    leistungenSelection = parseInt(index);
    var img = document.querySelector('[img-item="' + index.toString() + '"]');

    // Entferne die ausgewählte Klasse von allen Bildern
    document.querySelectorAll('.leistungen-peak-image-wrapper-cms-selected').forEach((x) => {
        x.classList.remove('leistungen-peak-image-wrapper-cms-selected');
        x.style.cursor = 'pointer';
    });

    // Markiere das geklickte Bild als ausgewählt
    img.classList.add('leistungen-peak-image-wrapper-cms-selected');
    img.style.cursor = 'auto';

    // Entferne die ausgewählte Klasse von allen Textboxen
    document.querySelectorAll('.pre-leistungen-box-selected').forEach((x) => {
        x.classList.remove('pre-leistungen-box-selected');
    });
    const textBox = document.querySelector("[text-item='" + index.toString() + "']");
    textBox.classList.add('pre-leistungen-box-selected');

    setUpHoverBGBox();
}

function setUpHoverBGBox(itemHoverOut) {
    var hoverBox = document.querySelector('.leistungen-peak-heading-bg-switch');
    var item = document.querySelector('[heading-item="' + leistungenSelection + '"]');
    var itemRect = item.getBoundingClientRect();
    var outerWrapperRect = document.querySelector('.leistungen-peak-faecher-heading-outer-wrapper').getBoundingClientRect();

    hoverBox.style.width = itemRect.width + "px";
    hoverBox.style.height = itemRect.height + "px";
    hoverBox.style.left = (itemRect.left - outerWrapperRect.left) + "px";
    hoverBox.style.top = (itemRect.top - outerWrapperRect.top) + "px";

    document.querySelectorAll('.leistungen-peak-faecher-heading').forEach((x) => {
        if (x.parentElement.getAttribute('heading-item') != leistungenSelection) {
            x.style.color = "black";
        }
    });

    if (itemHoverOut != null && parseInt(itemHoverOut.getAttribute('heading-item')) != leistungenSelection) {
        itemHoverOut.querySelector('.leistungen-peak-faecher-heading').style.color = "black";
    }

    item.querySelector('.leistungen-peak-faecher-heading').style.color = "#F1F1CF";

}

function hoverBoxIn(item) {
    var hoverBox = document.querySelector('.leistungen-peak-heading-bg-switch');
    var itemRect = item.getBoundingClientRect();
    var outerWrapperRect = document.querySelector('.leistungen-peak-faecher-heading-outer-wrapper').getBoundingClientRect();

    hoverBox.style.width = itemRect.width + "px";
    hoverBox.style.height = itemRect.height + "px";
    hoverBox.style.left = (itemRect.left - outerWrapperRect.left) + "px";
    hoverBox.style.top = (itemRect.top - outerWrapperRect.top) + "px";

    item.querySelector('.leistungen-peak-faecher-heading').style.color = "#F1F1CF";
}

//CTA
var ctaBox = document.querySelector('.cta-button-section-bg');
var ctaBoxCover = document.querySelector('.cta-button-section-bg-cover');
var ctaOuterWrapper = document.querySelector('.cta-button-section').getBoundingClientRect();
var ctaParagraph = document.querySelector('.cta-button-paragraph');

if (breakpoint == "desktop") {
    updateCTABG();
    setUpCTABtn();
    ctaBox.addEventListener('mouseenter', ctaHoverIn);
    ctaBox.addEventListener('mouseleave', ctaHoverOut);

    ctaParagraph.style.display = "none";
}

function setUpCTABtn() {
    setTimeout(() => {
        var ctaBtn = document.querySelector('.cta-button');
        ctaBtn.style.height = ctaBox.innerHeight + "px";
        ctaBtn.style.width = ctaBox.innerHeight + "px";
    }, 2);
}

function updateCTABG() {
    setTimeout(() => {
        ctaBoxCover.style.height = ctaBox.offsetHeight + "px";
    }, 1);
}

function ctaHoverIn() {
    ctaParagraph.style.display = "block";
    setTimeout(() => {
        ctaParagraph.classList.add('cta-paragraph-shown');
        updateCTABG();
    }, 1);
}

function ctaHoverOut() {
    ctaParagraph.classList.remove('cta-paragraph-shown');
    setTimeout(() => {
        ctaParagraph.style.display = "none";
        updateCTABG();
    }, 400);
}

// Reference Gradient

function handleGradientScroll() {
    const rect = references.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Check if the element is in the viewport
    if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollFraction = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        updateGradient(scrollFraction);
    }
}

function updateGradient(scrollFraction) {
    const start = 1;
    const end = 85;
    const gradientPosition = start + (end - start) * scrollFraction;
    references.style.backgroundImage = `linear-gradient(230deg, #EA967C ${gradientPosition}%, #A6181A)`;
}

// Referenzen Swiper

let startX;
let startY;
let isSwiping = false;

function handleSwipeStart(event) {
    isSwiping = true;
    startX = event.touches ? event.touches[0].clientX : event.clientX;
    startY = event.touches ? event.touches[0].clientY : event.clientY;
}

function handleSwipeMove(event) {
    if (!isSwiping) return;

    const moveX = event.touches ? event.touches[0].clientX : event.clientX;
    const moveY = event.touches ? event.touches[0].clientY : event.clientY;

    const diffX = moveX - startX;
    const diffY = moveY - startY;

    // Check if swipe is more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
            swipeRight();
            isSwiping = false;
        } else if (diffX < -50) {
            swipeLeft();
            isSwiping = false;
        }
    }
}

function handleSwipeEnd() {
    isSwiping = false;
}

// Event-Listener für mobile Geräte und Tablets (Touch Events)
document.addEventListener("touchstart", handleSwipeStart, { passive: true });
document.addEventListener("touchmove", handleSwipeMove, { passive: true });
document.addEventListener("touchend", handleSwipeEnd, { passive: true });

// Event-Listener für Desktop (Mouse Events)
document.addEventListener("mousedown", handleSwipeStart);
document.addEventListener("mousemove", handleSwipeMove);
document.addEventListener("mouseup", handleSwipeEnd);

document.querySelectorAll(".reference-slider-btn-left").forEach((btn) => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();  // Verhindert das Scrollen der Seite
        swipeRight();
    });
});
document.querySelectorAll(".reference-slider-btn-right").forEach((btn) => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();  // Verhindert das Scrollen der Seite
        swipeLeft();
    });
});

function initializeBreakpointSwiper() {
    if (breakpoint == "mobile-l" || breakpoint == "mobile") {
        if (lastbreakpoint == "desktop" || lastbreakpoint == "tablet" || lastbreakpoint == null) {
            var cur_left = document.getElementsByClassName("reference-box-left")[0];

            cur_left.classList.remove("reference-box-left");
            cur_left.classList.add("reference-box-hidden"); // Klasse für Unsichtbarkeit
            cur_left.style.transform = "translate(-110%, 0)";
            cur_left.style.opacity = 0;
            setTimeout(() => {
                cur_left.style.display = "none";
            }, 400); // Unsichtbar nach Übergang
        }

    } else if (breakpoint == "desktop" || breakpoint == "tablet") {
        if (lastbreakpoint == "mobile-l" || lastbreakpoint == "mobile") {
            var cur_right = document.getElementsByClassName("reference-box-right")[0];
            var next_left_id;

            if ((parseInt(cur_right.id.charAt(cur_right.id.length - 1)) + 1) >= 5) {
                next_left_id = "reference-box-0";
            } else {
                next_left_id = "reference-box-" + (parseInt(cur_right.id.charAt(cur_right.id.length - 1)) + 1).toString();
            }

            var next_left = document.getElementById(next_left_id);

            next_left.classList.remove("reference-box-hidden");
            next_left.style.display = "flex";  // Sichtbar machen
            next_left.style.transition = "0s";  // Sofort sichtbar
            next_left.style.transform = "translate(-110%, 0)";
            next_left.style.opacity = 0;
            setTimeout(() => {
                next_left.style.transition = "0.4s ease";
                next_left.style.removeProperty('transform');
                next_left.style.opacity = 1;
                next_left.classList.add("reference-box-left");  // Neue linke Box
            }, 1);
        }

    }
}

function swipeLeft() {

    if (breakpoint == "desktop" || breakpoint == "tablet") {
        var cur_left = document.getElementsByClassName("reference-box-left")[0];
        var cur_right = document.getElementsByClassName("reference-box-right")[0];
        var next_right_id;

        // Bestimme das nächste Element auf der rechten Seite
        if ((parseInt(cur_right.id.charAt(cur_right.id.length - 1)) + 1) >= 5) {
            next_right_id = "reference-box-0";
        } else {
            next_right_id = "reference-box-" + (parseInt(cur_right.id.charAt(cur_right.id.length - 1)) + 1).toString();
        }
        var next_right = document.getElementById(next_right_id);
        //Price El

        // Linkes Element verschieben und unsichtbar machen
        cur_left.classList.remove("reference-box-left");
        cur_left.classList.add("reference-box-hidden"); // Klasse für Unsichtbarkeit
        cur_left.style.transform = "translate(-110%, 0)";
        cur_left.style.opacity = 0;
        setTimeout(() => { cur_left.style.display = "none"; }, 400); // Unsichtbar nach Übergang

        // Rechtes Element wird nach Links verschoben
        cur_right.classList.remove("reference-box-right");
        cur_right.classList.add("reference-box-left");

        // Neues Element von rechts hinzufügen und animieren
        next_right.classList.remove("reference-box-hidden");
        next_right.style.display = "flex";  // Sichtbar machen
        next_right.style.transition = "0s";  // Sofort sichtbar
        next_right.style.transform = "translate(110%, 0)";
        next_right.style.opacity = 0;
        setTimeout(() => {
            next_right.style.transition = "0.4s ease";
            next_right.style.removeProperty('transform');
            next_right.style.opacity = 1;
            next_right.classList.add("reference-box-right");  // Neue rechte Box
        }, 1);

        setTimeout(() => {
            if (next_right.classList.contains("reference-box-right") || next_right.classList.contains("reference-box-left")) {
                next_right.style.display = "flex";
            }
        }, 402);

    } else if (breakpoint == "mobile-l" || breakpoint == "mobile") {
        var cur_active = document.getElementsByClassName("reference-box-right")[0];
        var next_h;

        // Bestimme das nächste Element auf der rechten Seite
        if ((parseInt(cur_active.id.charAt(cur_active.id.length - 1)) + 1) >= 5) {
            next_h = "reference-box-0";
        } else {
            next_h = "reference-box-" + (parseInt(cur_active.id.charAt(cur_active.id.length - 1)) + 1).toString();
        }
        var next = document.getElementById(next_h);
        //Price El

        // Element wird unsichtbar gemacht nach links
        cur_active.classList.remove("reference-box-right");
        cur_active.classList.add("reference-box-hidden");
        cur_active.style.transform = "translate(-110%, 0)";
        cur_active.style.opacity = 0;
        setTimeout(() => { cur_active.style.display = "none"; }, 400); // Unsichtbar nach Übergang


        // Neues Element von rechts hinzufügen und animieren
        next.style.display = "flex";  // Sichtbar machen
        next.style.transition = "0s";  // Sofort sichtbar
        next.style.transform = "translate(110%, 0)";
        next.style.opacity = 0;
        setTimeout(() => {
            next.style.transition = "0.4s ease";
            next.style.removeProperty('transform');
            next.style.opacity = 1;
            next.classList.add("reference-box-right");  // Neue rechte Box
        }, 1);
    }
}

function swipeRight() {

    if (breakpoint == "desktop" || breakpoint == "tablet") {
        var cur_left = document.getElementsByClassName("reference-box-left")[0];
        var cur_right = document.getElementsByClassName("reference-box-right")[0];
        var next_left_id;

        // Bestimme das nächste Element auf der linken Seite
        if ((parseInt(cur_left.id.charAt(cur_left.id.length - 1)) - 1) <= -1) {
            next_left_id = "reference-box-4";
        } else {
            next_left_id = "reference-box-" + (parseInt(cur_left.id.charAt(cur_left.id.length - 1)) - 1).toString();
        }
        var next_left = document.getElementById(next_left_id);
        //Price Boxes

        // Rechtes Element verschieben und unsichtbar machen
        cur_right.classList.remove("reference-box-right");
        cur_right.classList.add("reference-box-hidden"); // Klasse für Unsichtbarkeit
        cur_right.style.transform = "translate(110%, 0)";
        cur_right.style.opacity = 0;
        setTimeout(() => { cur_right.style.display = "none"; }, 400); // Unsichtbar nach Übergang

        // Linkes Element wird nach rechts verschoben
        cur_left.classList.remove("reference-box-left");
        cur_left.classList.add("reference-box-right");

        // Neues Element von links hinzufügen und animieren
        next_left.classList.remove("reference-box-hidden");
        next_left.style.display = "flex";  // Sichtbar machen
        next_left.style.transition = "0s";  // Sofort sichtbar
        next_left.style.transform = "translate(-110%, 0)";
        next_left.style.opacity = 0;
        setTimeout(() => {
            next_left.style.transition = "0.4s ease";
            next_left.style.removeProperty('transform');
            next_left.style.opacity = 1;
            next_left.classList.add("reference-box-left");  // Neue linke Box
        }, 1);

        setTimeout(() => {
            if (next_left.classList.contains("reference-box-right") || next_left.classList.contains("reference-box-left")) {
                next_left.style.display = "flex";
            }
        }, 402);

    } else if (breakpoint == "mobile-l" || breakpoint == "mobile") {
        var cur_active = document.getElementsByClassName("reference-box-right")[0];
        var next_h;

        // Bestimme das nächste Element auf der linken Seite
        if ((parseInt(cur_active.id.charAt(cur_active.id.length - 1)) - 1) <= 0) {
            next_h = "reference-box-4";
        } else {
            next_h = "reference-box-" + (parseInt(cur_active.id.charAt(cur_active.id.length - 1)) - 1).toString();
        }
        var next = document.getElementById(next_h);
        //Price Boxes

        // Element wird unsichtbar gemacht nach rechts
        cur_active.classList.remove("reference-box-right");
        cur_active.classList.add("reference-box-hidden");
        cur_active.style.transform = "translate(110%, 0)";
        cur_active.style.opacity = 0;
        setTimeout(() => { cur_active.style.display = "none"; }, 400); // Unsichtbar nach Übergang


        // Neues Element von links hinzufügen und animieren
        next.style.display = "flex";  // Sichtbar machen
        next.style.transition = "0s";  // Sofort sichtbar
        next.style.transform = "translate(-110%, 0)";
        next.style.opacity = 0;
        setTimeout(() => {
            next.style.transition = "0.4s ease";
            next.style.removeProperty('transform');
            next.style.opacity = 1;
            next.classList.add("reference-box-right");  // Neue linke Box
        }, 1);
    }
}

//Evaluation Star Initializer

document.querySelectorAll('.reference-box-evaluation-wrapper').forEach(wrapper => {
    const rating = parseInt(wrapper.getAttribute('rating'), 10);
    const stars = wrapper.querySelectorAll('.reference-box-evaluation-star');

    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('reference-box-evaluation-star-red'); // z.B. goldener Stern
        }
    });
});

//Evaluation Container Height Initializer

function setEvaluationContainerHeight() {
    var height = 0;
    document.querySelectorAll('.reference-box-inner-wrapper').forEach((wrapper) => {
        if (wrapper.offsetHeight > height) {
            height = wrapper.offsetHeight;
        }
    });

    var evaluationContainer = document.getElementsByClassName('reference-box-wrapper')[0];

    if ((height + window.offsetHeight * 0.2) > evaluationContainer.offsetHeight) {
        evaluationContainer.style.height = (height + window.offsetHeight * 0.2).toString + "px";
    }
}