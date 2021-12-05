const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();

// raw = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`;

const lines = raw.trim().split("\n");

const coords = lines.map(l => {
    const [start, end] = l.split(" -> ");
    const [x1, y1] = start.split(",").map(Number);
    const [x2, y2] = end.split(",").map(Number);

    if (x1 + y1 < x2 + y2) {
        return [
            x1, y1,
            x2, y2
        ];
    } else {
        return [
            x2, y2,
            x1, y1
        ];
    }
});

function getMax(rows) {
    let x = 0;
    let y = rows.length - 1;
    for (let row=0; row<rows.length; row++) {
        if (!rows[row]) continue;
        if (rows[row].length > x) x = rows.length - 1;
    }
    return [x, y];
}

function draw(rows) {
    const [maxX, maxY] = getMax(rows);
    console.log(`x: 0 - ${maxX}, y: 0 - ${maxY}`);
    for (let row=0; row<=maxY; row++) {
        let l = "";
        for (let col=0; col<=maxX; col++) {
            if (rows[row]) {
                l += rows[row][col] || ".";
            } else {
                l += ".";
            }
        }
        console.log(l);
    }
}

function part1(coords) {
    const rows = [];

    for(let i=0; i<coords.length; i++) {
        const [x1, y1, x2, y2] = coords[i];
        console.log(`${x1},${y1} -> ${x2},${y2}`);

        if (!rows[y1]) rows[y1] = [];
        if (!rows[y2]) rows[y2] = [];

        if (x1 === x2) {
            console.log("column");
            // column
            for (let y=y1; y<=y2; y++) {
                if (!rows[y]) {
                    rows[y] = [];
                }
                if (rows[y][x1]) {
                    rows[y][x1]++;
                } else {
                    rows[y][x1] = 1;
                }
            }
        } else if (y1 === y2) {
            console.log("row");
            if (!rows[y1]) rows[y1] = [];

            for (let x=x1; x<=x2; x++) {
                if (rows[y1][x]) {
                    rows[y1][x]++;
                } else {
                    rows[y1][x] = 1;
                }
            }
        }
        //draw(rows);
    }

    return rows.flat().filter(v => v > 1).length;
}

function mark(rows, x, y) {
    if (!rows[y]) rows[y] = [];
    if (rows[y][x]) rows[y][x]++;
    else rows[y][x] = 1;
}

function part2(coords) {
    const rows = [];

    for(let i=0; i<coords.length; i++) {
        let [x1, y1, x2, y2] = coords[i];
        console.log(`${x1},${y1} -> ${x2},${y2}`);

        if (!rows[y1]) rows[y1] = [];
        if (!rows[y2]) rows[y2] = [];

        if (x1 === x2) {
            console.log("column");
            // column
            for (let y=y1; y<=y2; y++) {
                mark(rows, x1, y);
            }
        } else if (y1 === y2) {
            console.log("row");
            for (let x=x1; x<=x2; x++) {
                mark(rows, x, y1);
            }
        } else {
            if (x2 > x1 && y2 > y1) {
                console.log("down/right");
                for (let i=0; i<=x2-x1; i++) {
                    mark(rows, x1+i, y1+i);
                }
            } else if (x2 < x1 && y2 > y1) {
                console.log("down/left");
                for (let i=0; i<=x1-x2; i++) {
                    mark(rows, x1-i, y1+i);
                }
                
            } else if (x2 > x1 && y2 < y1) {
                console.log("up/right");
                for (let i=0; i<=x2-x1; i++) {
                    mark(rows, x1+i, y1-i);
                }
            } else {
                console.log("up / left");
                for (let i=0; i<=x2-x1; i++) {
                    mark(rows, x1-i, y1-i);
                }
            }
        }
        //draw(rows);
    }

    return rows.flat().filter(v => v > 1).length;
}

// console.log(part1(coords));
console.log(part2(coords));