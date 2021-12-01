const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();
// raw = `199
// 200
// 208
// 210
// 200
// 207
// 240
// 269
// 260
// 263`;
const depths = raw.trim().split("\n").map(Number);

function part1(depths) {
    let increasing = 0;
    for(let i=1; i<depths.length; i++) {
        if (depths[i] > depths[i-1]) increasing++;
    }
    return increasing;
}

function part2(depths) {
    let increasing = 0;
    let previousWindow = depths[0] + depths[1] + depths[2];
    for(let i=1; i<depths.length - 2; i++) {
        const currentWindow = depths[i] + depths[i+1] + depths[i+2];
        //console.log(`Previous window = ${previousWindow}`);
        //console.log(`Current window = ${currentWindow}`);
        if (currentWindow > previousWindow) {
            increasing++;
        }
        previousWindow = currentWindow;
    }
    return increasing;
}

console.log(part1(depths));

console.log(part2(depths));

// 1702 too low