const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();

// set true to use sample data and draw map
let DEBUG = !!process.env.DEBUG;

if (DEBUG) {
    raw = `2199943210
    3987894921
    9856789892
    8767896789
    9899965678`;
}

function log(l) {
    if (DEBUG) {
        console.log(l);
    }
}

function getAdjacent(x, y, heightMap) {
    const height = heightMap.length;
    const width = heightMap[0].length;

    const adjacentCoords = [];
    if (x > 0) {
        adjacentCoords.push([x-1, y]);
    }
    if (y > 0) {
        adjacentCoords.push([x, y-1]);
    }
    if (x < width - 1) {
        adjacentCoords.push([x+1, y]);
    }
    if (y < height - 1) {
        adjacentCoords.push([x, y+1]);
    }
    return adjacentCoords;
}

function part1(heightMap) {
    const lowPoints = [];
    for (let y=0; y<heightMap.length; y++) {
        for (let x=0; x<heightMap[0].length; x++) {
            const adjacentCoords = getAdjacent(x, y, heightMap);
            const anyLower = adjacentCoords.find(([ax, ay]) => heightMap[ay][ax] <= heightMap[y][x]);
            if (!anyLower) {
                lowPoints.push(heightMap[y][x]);
            }
        }
    }
    return lowPoints.reduce((p, c) => p + c + 1, 0);
}

const heightMap = raw.trim().split("\n").map(l => l.trim().split("").map(Number));

log(heightMap);

console.log(part1(heightMap));