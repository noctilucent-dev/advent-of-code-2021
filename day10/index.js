const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();

// set true to use sample data and draw map
let DEBUG = !!process.env.DEBUG;

if (DEBUG) {
    raw = `
    [({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    {([(<{}[<>[]}>{[]{[(<()>
    (((({<>}<{<{<>}{[]{[]{}
    [[<[([]))<([[{}[[()]]]
    [{[{({}]{}}([{[{{{}}([]
    {<[[]]>}<{[{[{[]{()[[[]
    [<(<(<(<{}))><([]([]()
    <{([([[(<>()){}]>(<<{{
    <{([{{}}[<[[[<>{}]]]>[]]`;

    raw = `
    [({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    (((({<>}<{<{<>}{[]{[]{}
    {<[[]]>}<{[{[{[]{()[[[]
    <{([{{}}[<[[[<>{}]]]>[]]`;
}

function log(l) {
    if (DEBUG) {
        console.log(l);
    }
}

const key = {
    '[': ']',
    '(': ')',
    '<': '>',
    '{': '}'
};

function part1(lines) {
    const points = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    let score = 0;
    for (let i=0; i<lines.length; i++) {
        const symbols = lines[i].split("");
        const stack = [];
        for (let j=0; j<symbols.length; j++) {
            const s = symbols[j];
            if (Object.getOwnPropertyNames(key).includes(s)) {
                stack.push(s);
                continue;
            }
            const previous = stack.pop();
            if (key[previous] === s) continue;

            score += points[s];
            break;
        }
    }
    return score;
}

function part2(lines) {
    const points = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    };
    const allScores = [];

    lineLoop:
    for (let i=0; i<lines.length; i++) {
        const symbols = lines[i].split("");
        const stack = [];
        symbolLoop:
        for (let j=0; j<symbols.length; j++) {
            const s = symbols[j];
            if (Object.getOwnPropertyNames(key).includes(s)) {
                stack.push(s);
                continue symbolLoop;
            }
            if (key[stack.pop()] === s) continue symbolLoop;
            continue lineLoop;
        }

        let score = 0;
        while (stack.length > 0) {
            score *=5;
            score += points[key[stack.pop()]];
        }
        log(score);
        allScores.push(score);
    }

    allScores.sort((a, b) => a - b);
    log(allScores);
    
    return allScores[Math.floor(allScores.length / 2)];
}

const lines = raw.trim().split("\n").map(l => l.trim());

console.log(part1(lines));
console.log(part2(lines));
