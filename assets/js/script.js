
$(document).ready(function () {
    addListenersAll();
});

function addListenersAll() {
    $('#offcanvasNavbar').on('show.bs.offcanvas', () => toggleNavBar('show'));
    $('#offcanvasNavbar').on('hide.bs.offcanvas', () => toggleNavBar('hide'));
    let vh = window.innerHeight;
    vh *= 0.9;
    $('#top-bg-img')[0].style.height = vh + 'px';
    $(window).on('scroll', addRevealElementsListener);
}

function toggleNavBar(state) {
    if (state === 'hide') {
        $('.nav-link').addClass('text-white');
    } else {
        $('.nav-link').removeClass('text-white');
    }
}

function addRevealElementsListener() {
    const revealElements = $('.reveal-wrap');

    const vh = window.innerHeight;
    revealElements.each(function () {
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).outerHeight();
        const scrollTop = $(window).scrollTop();
        const scrollBottom = scrollTop + vh;

        if (elementTop < scrollBottom + 100 && elementBottom > scrollTop) {
            $(this).addClass('reveal');
        }
    });
}

window.go_to_cv = function () {
    window.open("https://drive.google.com/file/d/17emMlVaYCCEqZ0LEHXOcbEcGct1KNPqs/view?usp=sharing", '_blank');
}
