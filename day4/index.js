const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();

// raw = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7`;



class Board {
    constructor(lines) {
        this.rows = lines.map(l => l.trim().split(/\s+/));
    }

    mark(num) {
        for (let row=0; row<5; row++) {
            for (let col=0; col<5; col++) {
                if (this.rows[row][col] === num) {
                    this.rows[row][col] = "*"; 
                }
            }
        }
    }

    bingo() {
        for (let row=0; row<5; row++) {
            if (this.rows[row].join("") === "*****") {
                return true;
            }
        }
        for (let col=0; col<5; col++) {
            let joined = this.rows.map(row => row[col]).join("");
            if (joined === "*****") {
                return true;
            }
        }
        return false;
    }

    score(lastDraw) {
        let sumUnmarked = 0;
        for (let row=0; row<5; row++) {
            for (let col=0; col<5; col++) {
                if (this.rows[row][col] !== "*") {
                    sumUnmarked += Number(this.rows[row][col]); 
                }
            }
        }
        return sumUnmarked * lastDraw;
    }
}

function parseBoard(lines) {
    return new Board(lines);
}

const lines = raw.trim().split("\n");

const draws = lines[0].split(",");

let boards = [];

for (let i=2; i<lines.length; i+=6) {
    boards.push(parseBoard(lines.slice(i, i + 5)));
}

console.log(draws);
console.log(boards);

function part1(draws, boards) {
    let winner;
    for(let i=0; i<draws.length; i++) {
        boards.forEach(b => b.mark(draws[i]));
        winner = boards.find(b => b.bingo());
        if (winner) {
            console.log(winner);
            return winner.score(draws[i]);
        }
    }

}

console.log(part1(draws, boards));