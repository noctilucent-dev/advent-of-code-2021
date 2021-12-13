let { raw, DEBUG, deepClone, log } = require("../util");

if (DEBUG) {
    raw = `
    5483143223
    2745854711
    5264556173
    6141336146
    6357385478
    4167524645
    2176841721
    6882881134
    4846848554
    5283751526`;
}

const cartesian =
  (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

const adjacentVectors = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
];

function getAllCoords(map) {
    let coords = [];
    for (let y=0; y<octopuses.length; y++) {
        for (let x=0; x<octopuses[y].length; x++) {
            coords.push([x,y]);
        }
    }
    return coords;
}

function print(octopuses) {
    return octopuses.map(l => l.join("")).join("\n");
}

function getAdjacent(x, y, map) {
    return adjacentVectors
        .map(([dx, dy]) => [x+dx, y+dy])
        .filter(([ax, ay]) => ax >=0 && ay >= 0 && ax < map[0].length && ay < map.length);
}

function step(octopuses) {
    octopuses = deepClone(octopuses);
    let flashes = 0;
    
    const coords = getAllCoords(octopuses);
    coords.forEach(([x,y]) => octopuses[y][x]++);

    while (true) {
        const toFlash = coords.filter(([x,y]) => octopuses[y][x] > 9);
        if (toFlash.length === 0) break;
        flashes += toFlash.length;

        log(`${toFlash.length} octopuses flashing`);
        toFlash.forEach(([x,y]) => {
            getAdjacent(x,y,octopuses)
                .forEach(([ax,ay]) => {
                    if (octopuses[ay][ax] > 0) {
                        octopuses[ay][ax]++;
                    }
                });
        });
        log(`Resetting flashed octopuses`)
        toFlash.forEach(([x,y]) => octopuses[y][x] = 0);
        //log(print(octopuses));
    }
    return {
        octopuses,
        flashes
    };
}

function part1(octopuses) {
    let totalFlashes = 0;
    for (let i=0; i<100; i++) {
        log(`Step ${i}`);
        log(print(octopuses));
        const result = step(octopuses);
        octopuses = result.octopuses;
        totalFlashes += result.flashes;
    }
    return totalFlashes;
}

function part2(octopuses) {
    let count = 0;
    while (true) {
        count++;
        log(`Step ${count}`);
        const result = step(octopuses);
        octopuses = result.octopuses;
        log(print(octopuses));
        if (result.flashes === 100) {
            return count;
        }
    }
}

const octopuses = raw.trim().split("\n").map(l => l.trim().split("").map(Number));

console.log(part1(deepClone(octopuses)));
console.log(part2(deepClone(octopuses)));