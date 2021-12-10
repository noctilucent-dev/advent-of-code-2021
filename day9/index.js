let { raw, DEBUG, log } = require("../util");

if (DEBUG) {
    raw = `
    2199943210
    3987894921
    9856789892
    8767896789
    9899965678`;
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

function findLowPoints(heightMap) {
    const lowPoints = [];
    for (let y=0; y<heightMap.length; y++) {
        for (let x=0; x<heightMap[0].length; x++) {
            const adjacentCoords = getAdjacent(x, y, heightMap);
            const anyLower = adjacentCoords.find(([ax, ay]) => heightMap[ay][ax] <= heightMap[y][x]);
            if (!anyLower) {
                lowPoints.push([x, y]);
            }
        }
    }
    return lowPoints;
}

function findBasin(x, y, heightMap) {
    log(`Finding basin [${x},${y}]`);
    heightMap = [...heightMap.map(l => [...l])];
    heightMap[y][x] = -1;
    while (true) {
        log(heightMap);
        let growing = false;
        for (let y=0; y<heightMap.length; y++) {
            for (let x=0; x < heightMap[y].length; x++) {
                if (heightMap[y][x] > -1) continue;

                // left
                if (x > 0 && heightMap[y][x-1] > -1 && heightMap[y][x-1] < 9) {
                    heightMap[y][x-1] = -1;
                    growing = true;
                }

                // right
                if (x < heightMap[y].length - 1 && heightMap[y][x+1] > -1 && heightMap[y][x+1] < 9) {
                    heightMap[y][x+1] = -1;
                    growing = true;
                }

                // up
                if (y > 0 && heightMap[y-1][x] > -1 && heightMap[y-1][x] < 9) {
                    heightMap[y-1][x] = -1;
                    growing = true;
                }

                // down
                if (y < heightMap.length - 1 && heightMap[y+1][x] > -1 && heightMap[y+1][x] < 9) {
                    heightMap[y+1][x] = -1;
                    growing = true;
                }
            }
        }
        if (!growing) {
            break;
        }
    }

    log(heightMap);
    const size = heightMap.reduce((p, row) => p + row.filter(v => v === -1).length, 0);
    log(`Size ${size}`);

    return size;
}

function part1(heightMap) {
    const lowPoints = findLowPoints(heightMap);
    return lowPoints.reduce((p, [x, y]) => p + heightMap[y][x] + 1, 0);
}

function part2(heightMap) {
    const lowPoints = findLowPoints(heightMap);
    const sizes = lowPoints.map(([x, y]) => findBasin(x,y,heightMap));
    sizes.sort((a, b) => b - a);
    return sizes.slice(0,3).reduce((p, c) => p * c, 1);
}

const heightMap = raw.trim().split("\n").map(l => l.trim().split("").map(Number));

log(heightMap);

console.log(part1(heightMap));
console.log(part2(heightMap));