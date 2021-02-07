export function lazyload() {

    const images = document.querySelectorAll('[data-lazy]');

    function loadImages(item) {

        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
            windowScroll = document.documentElement.scrollTop || document.body.scrollTop,
            elemRect = windowScroll + item.getBoundingClientRect().top,
            windowCordStart = windowScroll,
            windowCordEnd = windowHeight + windowScroll,
            elemCordStart = windowScroll + item.getBoundingClientRect().top,
            elemCordEnd = elemRect + item.clientHeight;

        if (elemCordStart - 400 <= windowCordEnd && windowCordStart <= elemCordEnd + 600 && !item.classList.contains('is-loaded')) {
            item.classList.add('is-loaded');

            if (item.localName == "img") {
                item.setAttribute('src', item.dataset.lazy);
            } else {
                item.style.backgroundImage = `url(${item.dataset.lazy})`;
            }
        }
    }

    images.forEach(function(item) {
        loadImages(item);
        window.addEventListener('scroll', function() {
            loadImages(item);
        });
    });

}