const SECTIONS = {
    sleep: ["sleep"],
    morning: ["shower", "breakfast", "yoga"],
    street: ["skate", "metro", "walk"],
    study: ["study", "laptop", "craft", "book"],
    lunch: ["lunch", "park", "cafe"],
    evening: ["bicycle", "cafe", "art", "guitar"],
    lateEvening: ["cinema", "dance", "climb", "games"],
}

let machine = {
    start() {
        this.dayOfTheWeek = 0;
        this.sectionID = 0;
        this.playState();
    },
    nextState() {
        this.sectionID += 1;
        if (this.sectionID == this.collectionOfSectionSequence[this.collectionID].length) {
            this.sectionID = 0;
            this.dayOfTheWeek = (this.dayOfTheWeek + 1) % 7;
            this.collectionID = (this.dayOfTheWeek >= 5) ? 1 : 0;
        }
        if (this.dayOfTheWeek == 6 && this.sectionID == 3) return;//TODO remove
        this.playState();
    },
    playState() {
        let range = this.collectionOfSectionSequence[this.collectionID][this.sectionID].length;
        console.log(`DAY ${this.dayOfTheWeek + 1} TIME ${this.sectionID} - ${this.collectionOfSectionSequence[this.collectionID][this.sectionID][Math.floor(Math.random() * range)]}`);
        this.nextState();
    },
    sectionID: 0,
    dayOfTheWeek: 0,
    collectionID: 0,
    collectionOfSectionSequence: [
        [ // working
            SECTIONS.morning,
            SECTIONS.street,
            SECTIONS.study,
            SECTIONS.lunch,
            SECTIONS.study,
            SECTIONS.street,
            SECTIONS.evening,
            SECTIONS.lateEvening,
            SECTIONS.sleep,
        ],
        [ // weekend
            SECTIONS.morning,
            SECTIONS.street,
            SECTIONS.evening,
            SECTIONS.street,
            SECTIONS.sleep,
        ],
    ],
}
    


machine.start() // start the process and initialize
// machine.nextState() // automaticly analize current timezone