let { raw, DEBUG, log } = require("../util");

if (DEBUG) {
    raw = `
    6,10
    0,14
    9,10
    0,3
    10,4
    4,11
    6,0
    6,12
    4,1
    0,13
    10,12
    3,4
    3,0
    8,4
    1,10
    2,14
    8,10
    9,0

    fold along y=7
    fold along x=5`;
}

function parseInput(raw) {
    const lines = raw.trim().split("\n");
    const coords = [];
    let i = 0;
    while (true) {
        if (lines[i].trim() === "") break;
        coords.push(lines[i].split(",").map(Number));
        i++;
    }

    const folds = [];
    for (i=i+1; i<lines.length; i++) {
        const r = /fold along (\w)=(\d+)/
        const [_, axis, num] = lines[i].match(r);
        folds.push([axis, parseInt(num)]);
    }

    return {
        coords,
        folds
    };
}

function draw(paper) {
    const space = DEBUG ? "." : " ";
    return paper.map(l => l.map(e => e ? "#" : space).join("")).join("\n");
}

function getPaper(coords) {
    let maxX = -1;
    let maxY = -1;
    coords.forEach(([x, y]) => {
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    })
    log (`Paper size: (0,0) -> (${maxX},${maxY})`);

    const paper = [];
    for (let y=0; y<=maxY; y++) {
        paper[y] = [];
        for (let x=0; x<=maxX; x++) {
            paper[y][x] = 0;
        }
    }
    
    coords.forEach(([x,y]) => paper[y][x] = 1);

    return paper;
}

function foldHorizontal(paper, line) {
    for (let y=line+1; y<paper.length; y++) {
        const toMerge = paper[line - (y-line)];
        for (let x=0; x<paper[y].length; x++) {
            toMerge[x] |= paper[y][x];
        }
    }
    paper.splice(line);
}

function foldVertical(paper, column) {
    for (let x=column+1; x<paper[0].length; x++) {
        for (let y=0; y<paper.length; y++) {
            const targetX = column - (x - column);
            paper[y][targetX] |= paper[y][x];
        }
    }
    paper.forEach(l => l.splice(column));
}

function part1(coords, folds) {
    const paper = getPaper(coords);
    log("Initial paper:");
    log(draw(paper));
    log("\n");

    if (folds[0][0] === "y") {
        foldHorizontal(paper, folds[0][1]);
    } else {
        foldVertical(paper, folds[0][1]);
    }
    log("After first fold:")
    log(draw(paper));
    log("\n");

    if (DEBUG) {
        if (folds[1][0] === "y") {
            foldHorizontal(paper, folds[1][1]);
        } else {
            foldVertical(paper, folds[1][1]);
        }
        log("After two folds:")
        log(draw(paper));
        log("\n");
    }

    return paper.reduce((p, c) => p + c.filter(e => e).length, 0);
}

function part2(coords, folds) {
    const paper = getPaper(coords);

    folds.forEach(([axis, num]) => {
        if (axis === "y") foldHorizontal(paper, num);
        else foldVertical(paper, num);
    })

    return draw(paper);
}



const {coords, folds} = parseInput(raw);

console.log(part1(coords, folds));
console.log(part2(coords, folds));