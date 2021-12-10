let { raw } = require("../util");

function part1(depths) {
    let increasing = 0;
    for(let i=1; i<depths.length; i++) {
        if (depths[i] > depths[i-1]) increasing++;
    }
    return increasing;
}

function part2(depths) {
    let increasing = 0;
    for(let i=3; i<depths.length; i++) {
        // We only need to compare the number coming into the window
        // with the number being removed
        if (depths[i] > depths[i-3]) {
            increasing++;
        }
    }
    return increasing;
}

const depths = raw.trim().split("\n").map(Number);

console.log(part1(depths));
console.log(part2(depths));