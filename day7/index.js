const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();

// set true to use sample data and draw map
let DEBUG = !!process.env.DEBUG;

if (DEBUG) {
    raw = `16,1,2,0,4,2,7,1,2,14`;
}

function log(l) {
    if (DEBUG) {
        console.log(l);
    }
}

function part1(crabs) {
    crabs.sort();
    let bestFuel = Number.MAX_VALUE;
    for (let position = 0; position <= crabs[crabs.length-1]; position++) {
        let fuel = crabs.reduce((p, c) => p + Math.abs(c - position), 0);
        if (fuel < bestFuel) {
            bestFuel = fuel;
        }
    }
    return bestFuel;
}

function part2(crabs) {
    crabs.sort();
    let bestFuel = Number.MAX_VALUE;
    for (let position = 0; position <= crabs[crabs.length-1]; position++) {
        let fuel = crabs.reduce((p, c) => {
            const distance = Math.abs(c - position);
            // Use formula for triangular numbers to calculate fuel cost
            const fuel = (distance * (distance + 1)) / 2;
            return p + fuel;
        }, 0);
        if (fuel < bestFuel) {
            bestFuel = fuel;
        }
    }
    return bestFuel;
}

const crabs = raw.trim().split(",").map(Number);

console.log(part1([...crabs]));
console.log(part2([...crabs]));
