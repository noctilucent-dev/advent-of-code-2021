const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();

// set true to use sample data and draw map
let DEBUG = !!process.env.DEBUG;

if (DEBUG) {
    raw = `3,4,3,1,2`;
}

function log(l) {
    if (DEBUG) {
        console.log(l);
    }
}

function part1(fish) {
    function tick() {
        const babies = [];
        for (let i=0; i<fish.length; i++) {
            if (fish[i] === 0) {
                babies.push(8);
                fish[i] = 6;
            } else {
                fish[i]--;
            }
        }
        fish.push(...babies);
    }

    log(`Initial state: ${fish}`);

    for (let day=1; day<=80; day++) {
        tick();
        log(`Day ${day}: ${fish}`);
    }

    return fish.length;
}

function part2(fish) {
    const timerCounts = [0,0,0,0,0,0,0,0,0];

    for (let timer=0; timer<=6; timer++) {
        timerCounts[timer] = fish.filter(f => f === timer).length;
    }

    function tick() {
        for (let timer=0; timer<=8; timer++) {
            timerCounts[timer-1] = timerCounts[timer];
        }
        timerCounts[8] = timerCounts[-1];
        timerCounts[6] += timerCounts[-1];
    }

    log(`Initial state: ${timerCounts}`);

    for (let day=1; day<=256; day++) {
        tick();
        log(`Day ${day}: ${timerCounts}`);
    }

    timerCounts[-1] = 0;
    return timerCounts.reduce((p, c) => p + c);
}

const fish = raw.trim().split(",").map(Number);

console.log(part1([...fish]));
console.log(part2([...fish]));