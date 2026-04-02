function easeInOutQuart(value) {
return value < 0.5 ? 8 * value * value * value * value : 1 - Math.pow(-2 * value + 2, 4) / 2;
}

function easeInOutBack(value) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return value < 0.5
    ? (Math.pow(2 * value, 2) * ((c2 + 1) * 2 * value - c2)) / 2
    : (Math.pow(2 * value - 2, 2) * ((c2 + 1) * (value * 2 - 2) + c2) + 2) / 2;
}

function easeInBack(value) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return c3 * value * value * value - c1 * value * value;
}

function easeOutBack(value) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
}

function map(min, max, value) {
    return (value - min) / (max - min);
}

let ANIMATION_ID;

const frames = {
    sleep_still: "frames/sleep_1.webp",
    sleep_stratch: "frames/sleep_2.webp",
    awake_yawn: "frames/sleep_3.webp",
    awake_still: "frames/sleep_4.webp"
}

function switchFrame(frame) {
    if (myavatar.src == frame) return;
    myavatar.src = frame;
}

function animate({duration, draw, isLooped = false, after = null}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let progress = (time - start) / duration;
        if (progress > 1) progress = 1;

        draw(progress);

        if (progress == 1) {
            if (isLooped)
                start = performance.now();
            else if (after != null)
                after();
        }
        if (isLooped || progress < 1) {
            ANIMATION_ID = requestAnimationFrame(animate);
        }
    })
}



let sleep_loop = function() {animate({
    isLooped: true,
    duration: 1000,
    draw(progress) {
        switchFrame(frames.sleep_still);
        progress = easeInOutBack(progress);
        myavatar.style.scale = (1 + Math.sin(progress * Math.PI) * 0.05) + " " + (1 - Math.sin(progress * Math.PI) * 0.05);
    }
});};

let awake_loop = function() {animate({
    isLooped: true,
    duration: 1000,
    draw(progress) {
        switchFrame(frames.awake_still);
        progress = easeInOutBack(progress);
        myavatar.style.scale = (1 + Math.sin(progress * Math.PI) * 0.05) + " " + (1 - Math.sin(progress * Math.PI) * 0.05);
    }
});};


myavatar.onclick = function () {
    cancelAnimationFrame(ANIMATION_ID);
    animate({
    duration: 3000,
    draw(progress) {
        progress = progress * 5;

        if (progress < 1) {
            progress = map(0, 1, progress);
            myavatar.style.transform = "skew(" + (easeInBack(progress) * 20) + "deg)";
            if (progress < 0.8)
                switchFrame(frames.sleep_still);
            else
                switchFrame(frames.sleep_stratch);
            
        }
        else if (progress < 2) {
            progress = map(1, 2, progress);
            myavatar.style.transform = "skew(" + (20 -easeInBack(progress) * 30) + "deg)";
        }
        else if (progress < 4) {
            progress = map(2, 4, progress);
            switchFrame(frames.awake_yawn);
            myavatar.style.transform = "skew(" + (-5 - 5 * Math.cos(progress * 4 * Math.PI)) + "deg)";
        }
        else {
            progress = map(4, 5, progress);
            myavatar.style.transform = "skew(" + ((-5 - 5 * Math.cos(Math.PI * 4)) * (1 - easeOutBack(progress))) + "deg";
            if (progress > 0.1)
                switchFrame(frames.awake_still);
        }
        // TODO: Improve animation not only with skew animation pleEASE
        // myavatar.style.transform = "skew(" + progress * 30 + "deg)";
        // myavatar.style.scale = (progress * 0.1 + 1) + " " + (1 - progress * 0.1);
    },
    after: awake_loop
});};


sleep_loop();