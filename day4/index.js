let { raw, log } = require("../util");

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

function parseBoards(lines) {
    let boards = [];

    for (let i=2; i<lines.length; i+=6) {
        boards.push(new Board(lines.slice(i, i + 5)));
    }

    return boards;
}

function part1(draws, boards) {
    let winner;
    for(let i=0; i<draws.length; i++) {
        boards.forEach(b => b.mark(draws[i]));
        winner = boards.find(b => b.bingo());
        if (winner) {
            log("First winner:")
            log(winner.rows);
            return winner.score(draws[i]);
        }
    }

}

function part2(draws, boards) {
    for(let i=0; i<draws.length; i++) {
        const last = boards.length < 2 ? boards[0] : undefined;
        boards.forEach(b => b.mark(draws[i]));
        boards = boards.filter(b => !b.bingo());
        if (last && boards.length === 0) {
            log("Last winner:")
            log(last.rows);
            return last.score(draws[i]);
        }
    }
}

const lines = raw.trim().split("\n");
const draws = lines[0].split(",");

const p1 = part1(draws, parseBoards(lines));
const p2 = part2(draws, parseBoards(lines));
console.log(`Part 1: ${p1}`);
console.log(`Part 2: ${p2}`);
