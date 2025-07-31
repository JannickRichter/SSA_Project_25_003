window.addEventListener('load', () => {
    // Initialize the latest post link when the page loads
    setLatestPostLinkHero();
    setPostLinks();
});

//Latest Post Link Initializer
function setLatestPostLinkHero() {
    var linkBox = document.querySelector('.blog-hero-latestpost-btn');
    var postURL = "https://site-solution.webflow.io/blog/" + linkBox.getAttribute('post-sublink')

    linkBox.href = postURL;
    document.querySelector('.blog-hero-blog-heading-link-box').href = postURL;
    document.querySelector('.blog-hero-subtitle-link-box').href = postURL;
}

function setPostLinks() {
    document.querySelectorAll('.blog-gallery-item').forEach((item) => {
        var postURL = "https://site-solution.webflow.io/blog/" + item.getAttribute('post-sublink')

        item.getElementsByClassName('blog-gallery-btn')[0].href = postURL;
        item.getElementsByClassName('blog-gallery-preview-wrapper')[0].href = postURL;
        item.getElementsByClassName('blog-gallery-heading-link-box')[0].href = postURL;
        item.getElementsByClassName('blog-gallery-subtitle-link-box')[0].href = postURL;
    });
}
