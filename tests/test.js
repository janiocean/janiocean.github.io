function animate({timing, draw, duration, animateafter}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
        else {
            animateafter();
        }
    })
}

function ease(timeFraction) {
    return timeFraction < 0.5 ? 2 * timeFraction * timeFraction : 1 - Math.pow(-2 * timeFraction + 2, 2) / 2;
}

function easeInOutBack(timeFraction) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return timeFraction < 0.5
    ? (Math.pow(2 * timeFraction, 2) * ((c2 + 1) * 2 * timeFraction - c2)) / 2
    : (Math.pow(2 * timeFraction - 2, 2) * ((c2 + 1) * (timeFraction * 2 - 2) + c2) + 2) / 2;
}

function linear(timeFraction) {
    return timeFraction;
}

animate({
    duration: 500,
    timing: easeInOutBack,
    draw(progress) {
        myavatar.style.transform = "skew(" + progress * 30 + "deg)";
        myavatar.style.scale = (progress * 0.1 + 1) + " " + (1 - progress * 0.1);
        if (progress < 0.15) {
            myavatar.src = "frames/sleep_1.webp";
        }
        else {
            myavatar.src = "frames/sleep_2.webp";
        }
    },
    animateafter() {
        animate({
            duration: 500,
            timing: ease,
            draw(progress) {
                myavatar.style.transform = "skew(" + (30 -progress * 60) + "deg)";
                myavatar.style.scale = (1.1 - progress * 0.3) + " " + (0.9 + progress * 0.4);
                if (progress < 0.15) {
                    myavatar.src = "frames/sleep_2.webp";
                }
                else {
                    myavatar.src = "frames/sleep_3.webp";
                }
            },
            animateafter() {
                animate({
                    duration: 2000,
                    timing: linear,
                    draw(progress) {
                        myavatar.style.transform = "skew(" + (-30 + Math.sin(progress * 12) * 5) + "deg)";
                        myavatar.style.scale = (0.8 + progress * 0.2) + " " + (1.3 - progress * 0.3)
                    },
                    animateafter() {
                        animate({
                            duration: 500,
                            timing: easeInOutBack,
                            draw(progress) {
                                if (progress > 0.1) {
                                    myavatar.src = "frames/sleep_4.webp";
                                }
                                myavatar.style.transform = "skew(" + (-30 + Math.sin(12) * 5 + progress * 40) + "deg)";
                                myavatar.style.scale = (1 + progress * 0.1) + " " + (1 - progress * 0.1);
                            }
                        });
                    }
                })
            }
        });
    }
})
