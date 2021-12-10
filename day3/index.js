let { raw, DEBUG, log } = require("../util");

if (DEBUG) {
    raw = `
    00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010`;
}

function part1(numbers) {
    let oneCounts = [];
    let zeroCounts = [];
    for(let i=0; i<numbers.length; i++) {
        for(let j=0; j<numbers[i].length; j++) {
            if (numbers[i][j] === "1") {
                if (!oneCounts[j]) oneCounts[j] = 0;
                oneCounts[j]++;
            } else {
                if (!zeroCounts[j]) zeroCounts[j] = 0;
                zeroCounts[j]++;
            }
        }
    }
    let gamma = parseInt(oneCounts.map((v, i) => v > zeroCounts[i] ? "1" : "0").join(""), 2);
    let epsilon = parseInt(oneCounts.map((v, i) => v < zeroCounts[i] ? "1" : "0").join(""), 2);;
    log(gamma);
    log(epsilon);
    return gamma * epsilon;
}

function getCounts(numbers, j) {
    
    let onesCount = numbers.filter(n => n[j] === "1").length;
    let zerosCount = numbers.filter(n => n[j] === "0").length;

    log(`0: ${zerosCount}, 1: ${onesCount}`);

    const mostCommon = onesCount >= zerosCount ? "1" : "0";
    const leastCommon = zerosCount <= onesCount ? "0" : "1";

    return [mostCommon, leastCommon];
}

function part2(numbers) {   
    let o2Ratings = [...numbers];
    let co2Ratings = [...numbers];
    log(co2Ratings);
    for(let i=0; i<numbers[0].length; i++) {
        if (o2Ratings.length > 1) {
            let [mostCommon] = getCounts(o2Ratings, i);
            log(mostCommon);
            o2Ratings = o2Ratings.filter(r => r[i] === mostCommon);
        }
        if (co2Ratings.length > 1) {
            let [, leastCommon] = getCounts(co2Ratings, i)
            log(leastCommon);
            co2Ratings = co2Ratings.filter(r => r[i] === leastCommon);
        }
        log(co2Ratings);
    }

    let o2 = parseInt(o2Ratings[0], 2);
    let co2 = parseInt(co2Ratings[0], 2);

    log(co2);

    return o2 * co2;
}

const numbers = raw.trim().split("\n").map(l => l.trim());

console.log(part1(numbers));
console.log(part2(numbers));