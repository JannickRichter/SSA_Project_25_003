var breakpoint = null;
var lastbreakpoint = null;
var navOpen = false;
var navBarPrepared = false;
var isTouch;

setBreakpoint();
setTouch();
setUpNavBar();

var menueFrame = document.querySelector('.hero-nav-burger-menu-wrapper');
window.addEventListener('resize', () => {
    setBreakpoint();
    setTouch();
    setUpNavBar();
    if (navOpen) {
        adjustNavIcon();
    }
});
menueFrame.addEventListener('click', () => {
    if (!navOpen) {
        openNavMenue();
    }
});
document.querySelector(".nav-mobile-close-button").addEventListener('click', () => {
    if (navOpen) {
        closeNavMenue();
    }
});
document.querySelector(".footer-text-btn").addEventListener("mouseenter", (btn) => {
    document.querySelector(".footer-text-upper-btn-text").classList.add("footer-text-upper-btn-text-selected");
});
document.querySelector(".footer-text-btn").addEventListener("mouseleave", (btn) => {
    document.querySelector(".footer-text-upper-btn-text").classList.remove("footer-text-upper-btn-text-selected");
});

//Framework

function setBreakpoint() {
    lastbreakpoint = breakpoint;
    if (window.innerWidth > 991) {
        breakpoint = 'desktop';
    } else if (window.innerWidth > 767) {
        breakpoint = 'tablet';
    } else if (window.innerWidth > 478) {
        breakpoint = 'mobile-l';
    } else {
        breakpoint = 'mobile';
    }
}

function setTouch() {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        isTouch = true;
    } else {
        isTouch = false;
    }
}

//Nav Allg

function setUpNavBar() {
    if (breakpoint == "desktop") {
        setTimeout(() => {
            navBar = document.getElementsByClassName('nav-bar')[0];
            navBar.style.height = navBar.offsetHeight + 'px';
            navBarPrepared = true;
        }, 1)
    }
}

//Nav Search

var searchTrigger = document.getElementsByClassName('link-box-search-wrapper')[0];
searchTrigger.addEventListener('mouseenter', () => {
    var searchIcon = document.querySelectorAll('.nav-hero-search-icon')[1];
    var searchBox = document.querySelector('.link-box-search-wrapper');
    var searchBar = document.querySelector('.nav-search-outer-wrapper');

    searchIcon.classList.add('nav-hero-search-icon-hover');
    searchBox.style.width = 'auto';
    searchBar.style.display = 'flex';
    setTimeout(() => {
        searchIcon.style.display = 'none';
        searchBar.classList.add('nav-search-outer-wrapper-hover');
    }, 150);
});
searchTrigger.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!searchTrigger.matches(':hover')) {
            var searchIcon = document.querySelectorAll('.nav-hero-search-icon')[1];
            var searchBox = document.querySelector('.link-box-search-wrapper');
            var searchBar = document.querySelector('.nav-search-outer-wrapper');

            searchIcon.style.display = 'inline-block';
            searchBox.style.width = '52px';
            searchBar.classList.remove('nav-search-outer-wrapper-hover');

            setTimeout(() => {
                searchIcon.classList.remove('nav-hero-search-icon-hover');
                searchBar.style.display = 'none';
            }, 150);
        }
    }, 800);
});

//Nav Dropdown
const newestPostLink = "https://site-solution.webflow.io/blog/" + document.getElementById('link-structure-newest-post').getAttribute('post-sublink').toString();
document.getElementById('link-structure-newest-post').href = newestPostLink;

document.querySelectorAll('.link-box').forEach((linkBox) => {
    linkBox.addEventListener('mouseenter', displayNavDropdown.bind(this, linkBox));
    linkBox.addEventListener('mouseleave', hideNavDropdown.bind(this, linkBox));
});

function displayNavDropdown(linkBox) {
    if (!navBarPrepared) {
        return;
    }
    //var arrow = linkBox.querySelector('.nav-link-down-icon');
    var dropdown = linkBox.querySelector('.nav-link-structure-wrapper');

    //arrow.style.display = 'block';

    if (dropdown != null) {
        dropdown.style.display = 'flex';
        linkBox.querySelectorAll('.link-structure-box').forEach((link) => {
            link.style.display = 'block';
        });
    }

    setTimeout(() => {
        //arrow.classList.add('nav-link-down-icon-shown');

        if (dropdown != null) {
            linkBox.querySelectorAll('.link-structure-box').forEach((link, index) => {
                setTimeout(() => {
                    link.classList.add('link-structure-box-shown');
                }, index * 150);
            });
        }
    }, 1);
}

function hideNavDropdown(linkBox) {
    if (!navBarPrepared) {
        return;
    }
    //var arrow = linkBox.querySelector('.nav-link-down-icon');
    var dropdown = linkBox.querySelector('.nav-link-structure-wrapper');

    //arrow.classList.remove('nav-link-down-icon-shown');

    if (dropdown != null) {
        linkBox.querySelectorAll('.link-structure-box').forEach((link) => {
            link.classList.remove('link-structure-box-shown');
        });
    }

    setTimeout(() => {
        if (!linkBox.matches(':hover')) {
            //arrow.style.display = 'none';

            if (dropdown != null) {
                dropdown.style.display = 'none';

                linkBox.querySelectorAll('.link-structure-box').forEach((link) => {
                    link.style.display = 'none';
                });
            }
        }
    }, 201);
}

//Nav Mobile

function openNavMenue() {
    if (breakpoint === 'desktop') {
        return;
    }

    var timestemp = 100;
    var menueIcon = document.querySelector('.hero-nav-burger-menu-wrapper > img');
    var navLink = document.querySelectorAll('.nav-mobile-link');
    var closeBtn = document.querySelector('.nav-mobile-close-wrapper');

    if (breakpoint == 'mobile') {
        var siteIcon = document.querySelector('.hero-nav-logo-mobile');
        siteIcon.classList.add('site-icon-large-mobile');

        setTimeout(() => {
            siteIcon.style.display = 'none';
        }, 150)
    }

    menueIcon.classList.add('hero-nav-burger-menu-icon-off');
    menueFrame.classList.add('hero-nav-burger-menu-wrapper-large');
    navLink.forEach((link) => {
        link.style.display = 'flex';
    });
    closeBtn.style.display = 'flex';
    setTimeout(() => {
        navLink[0].classList.add('nav-mobile-elements-shown');
    }, 1);
    setTimeout(() => {
        closeBtn.classList.add('nav-mobile-elements-shown');
    }, 2 * timestemp);
    setTimeout(() => {
        navLink[1].classList.add('nav-mobile-elements-shown');
    }, 3 * timestemp);
    setTimeout(() => {
        navLink[2].classList.add('nav-mobile-elements-shown');
    }, 4 * timestemp);
    setTimeout(() => {
        navLink[3].classList.add('nav-mobile-elements-shown');
    }, 5 * timestemp);
    setTimeout(() => {
        navLink[4].classList.add('nav-mobile-elements-shown');
    }, 6 * timestemp);
    setTimeout(() => {
        navLink[5].classList.add('nav-mobile-elements-shown');
        navOpen = true;
    }, 7 * timestemp);

    setTimeout(() => {
        menueIcon.style.display = 'none';
    }, 150);

}

function closeNavMenue() {
    if (breakpoint == 'desktop') {
        return;
    }

    var menueIcon = document.querySelector('.hero-nav-burger-menu-wrapper > img');
    var navLink = document.querySelectorAll('.nav-mobile-link');
    var closeBtn = document.querySelector('.nav-mobile-close-wrapper');
    var siteIcon = document.querySelector('.hero-nav-logo-mobile');

    if (siteIcon.classList.contains('site-icon-large-mobile')) {
        siteIcon.style.display = 'inline-block';
        setTimeout(() => {
            siteIcon.classList.remove('site-icon-large-mobile');
        }, 1);
    }

    navLink.forEach((link) => {
        link.classList.remove('nav-mobile-elements-shown');
    });
    closeBtn.classList.remove('nav-mobile-elements-shown');

    setTimeout(() => {
        navLink.forEach((link) => {
            link.style.display = 'none';
        });
        closeBtn.style.display = 'none';

        menueIcon.style.display = 'inline-block';
        setTimeout(() => {
            menueIcon.classList.remove('hero-nav-burger-menu-icon-off');
            menueFrame.classList.remove('hero-nav-burger-menu-wrapper-large');
            navOpen = false;
        }, 1);
    }, 150);
}

function adjustNavIcon() {
    var siteIcon = document.querySelector('.hero-nav-logo-mobile');
    if (breakpoint == 'mobile' && navOpen && !siteIcon.classList.contains('site-icon-large-mobile')) {
        siteIcon.classList.add('site-icon-large-mobile');

        setTimeout(() => {
            siteIcon.style.display = 'none';
        }, 150)
    }
}

//Termin Nav Bar Popup
document.querySelectorAll('.link-box-termin-popup').forEach((box) => {
    box.addEventListener('click', () => {
        Calendly.initPopupWidget({ url: 'https://calendly.com/jannickrichter2007/ersttermin' });
        return false;
    });
});