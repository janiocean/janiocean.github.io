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

const frames = {
    sleep_still: "files/frames/sleep_1.webp",
    sleep_stratch: "files/frames/sleep_2.webp",
    awake_yawn: "files/frames/sleep_3.webp",
    awake_still: "files/frames/sleep_4.webp",
}

function switchFrame(frame) {
    if (myavatar.src == frame) return;
    myavatar.src = frame;
}


// MAIN FUNCTION LOOP
function playAvatarAnimationCycle() {
    const SEQUENCE_LIBRARY = {
        SLEEP_LOOP: {
            duration: 7000,
            draw (progress) {
                switchFrame(frames.sleep_still);
                progress = progress % (1 / 7) * 7;
                progress = easeInOutBack(progress);
                myavatar.style.scale = (1 + Math.sin(progress * Math.PI) * 0.05) + " " + (1 - Math.sin(progress * Math.PI) * 0.05);
            }
        },
        WAKE_UP: {
            duration: 3000,
            draw (progress) { // WAKE UP
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
            }
        },
        AWAKE_LOOP: {
            duration: 4000,
            draw(progress) { // AWAKE LOOP
                switchFrame(frames.awake_still);
                progress = progress % (1 / 5) * 5;
                progress = easeInOutBack(progress);
                myavatar.style.scale = (1 + Math.sin(progress * Math.PI) * 0.05) + " " + (1 - Math.sin(progress * Math.PI) * 0.05);
            }
        },
        GO_TO_SLEEP: {
            duration: 1000,
            draw(progress) { // GO TO SLEEP
                progress = progress * 2;
                let x, y;

                if (progress < 1) {
                    switchFrame(frames.awake_still);
                    progress = map(0, 1, progress);
                    x = 1 - 1 * easeInBack(progress);
                    y = 1 - 0.3 * easeInBack(progress);
                }
                else {
                    switchFrame(frames.sleep_still);
                    progress = map(1, 2, progress);
                    x = 1 * easeOutBack(progress);
                    y = 0.9 + 0.1 * easeOutBack(progress);
                }
                myavatar.style.scale = x + " " + y;
            }
        }
    };
    // STATES ANIMATION
    const STATES_SEQUENCE = [
        SEQUENCE_LIBRARY.GO_TO_SLEEP,
        SEQUENCE_LIBRARY.SLEEP_LOOP,
        SEQUENCE_LIBRARY.WAKE_UP,
        SEQUENCE_LIBRARY.AWAKE_LOOP,
    ];
    let currentStateID = 0;

    function startState() {
        // Calculate new state
        let myState = STATES_SEQUENCE[currentStateID];

        let start = performance.now();

        requestAnimationFrame(function animateState(time) {
            let progress = (time - start) / myState.duration;
            if (progress > 1) progress = 1;

            myState.draw(progress);

            if (progress < 1)
                requestAnimationFrame(animateState);
            else {
                // Update current Days
                currentStateID = currentStateID + 1;
                if (currentStateID >= STATES_SEQUENCE.length) {
                    currentStateID = 0;
                    // next Day
                }

                startState();
            }
        });
    };
    startState();
};

playAvatarAnimationCycle();