
$(document).ready(function () {
    addListenersAll();
    loadData();
});

function addListenersAll() {
    $('#offcanvasNavbar').on('show.bs.offcanvas', () => toggleNavBar('show'));
    $('#offcanvasNavbar').on('hide.bs.offcanvas', () => toggleNavBar('hide'));
    let vh = window.innerHeight;
    vh *= 0.9;
    $('#top-bg-img')[0].style.height = vh + 'px';
    $(window).on('scroll', addRevealElementsListener);

    $('#about-btn').on('click', () => {
        $('#offcanvasNavbar').offcanvas('hide');
        $('.offcanvas-backdrop').remove();
        setTimeout(() => {
            $('#about-section')[0].scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
    // $('#about-btn').on('click', () => {
    //     $('#offcanvasNavbar').offcanvas('hide').on('hidden.bs.offcanvas', () => {
    //         $('#about-section')[0].scrollIntoView({behavior: 'smooth'});
    //         // Remove the event listener to prevent it from firing multiple times
    //         $('#offcanvasNavbar').off('hidden.bs.offcanvas');
    //     });
    // })
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


function loadData() {
    return fetch('data.json').then(response => response.json()).then(data => {
        // Front Page
        $('#name').text(data.name);
        $('#quote').text(data.quote);

        // About
        $('#front_page_description').html(data.front_page_description);

        // Services
        services_section = $('#services-section');
        template = $('.service');
        services_section.empty();
        data.services.forEach(service => {
            let serviceElement = template.clone();
            serviceElement.find('.service-logo').attr('src', service.logo_path);
            serviceElement.find('.service-title').text(service.title);
            serviceElement.find('.service-description').text(service.description);
            services_section.append(serviceElement);
        });

        // Skills
        skills_section = $('#skill-section');
        template = $('.skill');
        skills_section.empty();
        data.skills.forEach(skill => {
            let skillElement = template.clone();
            skillElement.find('.skill-percentage').html(skill.percentage + '<sup class="text-white fs-1">%</sup>');
            skillElement.find('.skill-title').text(skill.name);
            skills_section.append(skillElement);
        });

        // Experience
        experience_section = $('#experience-section').find('#experience-contents');
        template_1 = $('.experience-1');
        template_2 = $('.experience-2');
        experience_section.empty();
        data.experience.forEach((experience, index) => {
            let experienceElement = index % 2 === 0 ? template_1.clone() : template_2.clone();
            experienceElement.find('.experience-logo').attr('src', experience.logo_path);
            experienceElement.find('.experience-title').text(experience.organization);
            duration = `From ${experience.from} to ${experience.to}`;
            experienceElement.find('.experience-duration').text(duration);
            experienceElement.find('.experience-position').text(experience.position);
            experienceElement.find('.experience-mode').text(experience.mode);
            experienceElement.find('.experience-location').text(experience.location);
            experience_section.append(experienceElement);
        });

        // Projects
        projects_section = $('#project-section');
        template = $('.project');
        projects_section.empty();
        data.projects.forEach(project => {
            let projectElement = template.clone();
            projectElement.find('.project-img').attr('src', project.image_path);
            projectElement.find('.project-title').text(project.title);
            projectElement.find('.project-description').text(project.description);
            projectElement.find('.project-link').attr('href', project.url).attr('target', '_blank');
            projectElement.find('.project-tools').text(project.tools);
            projectElement.find('.project-date').text(project.date);
            projects_section.append(projectElement);
        });

        // contact
        $('#email').text(data.email);
        $('#email').on('click', () => window.location.href = 'mailto:' + data.email);
        $('#phone-1').text(data.mobile);
        $('#phone-2').text(data.mobile_2);
        mobile = data.mobile.replace('+', '').replace(/-/g, '');
        mobile_2 = data.mobile_2.replace('+', '').replace(/-/g, '');
        $('#phone-1').on('click', () => window.open(`tel:${mobile}`, '_blank'));
        $('#phone-2').on('click', () => window.open(`tel:${mobile_2}`, '_blank'));
        $('#whatsapp-btn').on('click', () => {
            window.open(`https://wa.me/${mobile}`, '_blank');
        });
        $('#linkedin-btn').on('click', () => window.open(data.linkedin, '_blank'));
        $('#facebook-btn').on('click', () => window.open(data.facebook, '_blank'));
        $('#instagram-btn').on('click', () => window.open(data.instagram, '_blank'));
        $('#github-btn').on('click', () => window.open(data.github, '_blank'));

    }).catch(err => {
        console.error(err);
    });
}
