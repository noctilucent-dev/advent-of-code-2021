let { raw, DEBUG } = require("../util");

if (DEBUG) {
    raw = `
    forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`;
}

function part1(instructions) {
    let depth = 0;
    let horizontal = 0;

    for(let i=0; i<instructions.length; i++) {
        let [c, v] = instructions[i].split(" ");
        v = Number(v);
        if (c === "forward") {
            horizontal += v;
        } else if (c === "down") {
            depth += v;
        } else if (c === "up") {
            depth -= v;
        } else {
            throw new Error(`Unrecognised instruction ${c}`);
        }
    }

    return horizontal * depth;
}

function part2(instructions) {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;

    for(let i=0; i<instructions.length; i++) {
        let [c, v] = instructions[i].split(" ");
        v = Number(v);
        if (c === "forward") {
            horizontal += v;
            depth += aim * v;
        } else if (c === "down") {
            aim += v;
        } else if (c === "up") {
            aim -= v;
        } else {
            throw new Error(`Unrecognised instruction ${c}`);
        }
    }

    return horizontal * depth;
}

const instructions = raw.trim().split("\n").map(l => l.trim());

console.log(part1(instructions));
console.log(part2(instructions));