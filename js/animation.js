document.addEventListener('DOMContentLoaded', (event) => {
    gsap.registerPlugin(ScrollTrigger);

    const landingTl = gsap.timeline({
        defaults: {
            ease: 'power3.out'
        }
    });

    // Landing Page Load Animation
    landingTl.from('.hero_main_image', {
            scale: 1.1,
            opacity: 0,
            duration: 2,
            ease: 'power1.inOut'
        })
        .from('.hero_main_logo', {
            y: 30,
            opacity: 0,
            duration: 1,
            rotation: -10
        }, '-=1.5')
        .from('.hero_main_slogan', {
            x: 20,
            opacity: 0,
            duration: 1
        }, '-=0.8')
        .from('.hero_main_divider', {
            scaleX: 0,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out'
        }, '-=0.6')
        .from('.hero_nav_title', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, '-=0.8')
        .from('.hero_nav_link', {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8
        }, '-=0.6')
        .from('.social_overlay_wrap', {
            y: 20,
            opacity: 0,
            duration: 1
        }, '-=0.4');

    // Parallax Landing Page Image
    gsap.to('.hero_main_image', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero_main_wrap',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Header Main Load Animation
    const headerTl = gsap.timeline({
        defaults: {
            ease: 'power3.out'
        }
    });

    headerTl.from('.header_main_image', {
            scale: 1.1,
            opacity: 0,
            duration: 1.5
        })
        .from('.header_main_title', {
            y: 50,
            opacity: 0,
            duration: 1
        }, '-=1')
        .from('.hamburger_menu_button', {
            scale: 0,
            opacity: 0,
            rotation: 180,
            duration: 0.8
        }, '-=0.8');

    // Projects Scroll Reveal
    const projectsTrigger = document.querySelectorAll('.projects_item_wrap');

    projectsTrigger.forEach((project) => {
        const projectTl = gsap.timeline({
            scrollTrigger: {
                trigger: project,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            defaults: {
                ease: 'power3.out'
            }
        });

        // Animate Image
        projectTl.from(project.querySelector('.animate-image'), {
                y: 80,
                opacity: 0,
                duration: 1.2
            })

            // Animate Text
            .from(project.querySelector('.animate-text'), {
                y: 50,
                opacity: 0,
                duration: 1
            }, '-=0.7');
    });

    // Project Page Load Animation
    const projectPageTl = gsap.timeline({
        defaults: {
            ease: 'power3.out',
            duration: 1.2
        }
    });

    const sliderItems = document.querySelectorAll('.project_slider_item');
    const sliderControls = document.querySelector('.slider_controls_wrap');
    const activeContent = document.querySelector('.project_content_contain.is-active');

    if (activeContent) {
        gsap.set(activeContent, {
            autoAlpha: 1
        });

        const contentElements = activeContent.querySelectorAll('.project_content_eyebrow, .project_content_title, .project_content_text');

        const projectPageTl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration: 1.2
            },
            onComplete: () => {
                gsap.set(activeContent, {
                    clearProps: 'all'
                });
            }
        });

        projectPageTl.from(sliderItems, {
                clipPath: 'inset(100% 0% 0% 0%)',
                opacity: 0,
                duration: 1.4,
                stagger: 0.2
            })
            .from(contentElements, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15
            }, '<0.5')
            .from(sliderControls, {
                x: -20,
                opacity: 0,
                duration: 1
            }, '<0.2');
    }

    // Visual Gallery Animation
    const headerDuration = 1.5;

    function galleryAnimation() {
        let mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: no-preference)', () => {
            ScrollTrigger.batch('.visual_gallery_image', {
                start: 'top 85%',
                onEnter: batch => {
                    const currentTime = gsap.globalTimeline.time();
                    const initialDelay = currentTime < headerDuration ? headerDuration - currentTime : 0;

                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        delay: initialDelay,
                        ease: 'power3.out',
                        stagger: {
                            each: 0.15,
                            grid: 'auto'
                        },
                        overwrite: true
                    });
                },
                once: true
            });
        });
    }

    galleryAnimation();
});