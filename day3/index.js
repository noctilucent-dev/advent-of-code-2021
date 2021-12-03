const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();
// raw = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`;

const numbers = raw.trim().split("\n");

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
    //console.log(gamma);
    //console.log(epsilon);
    return gamma * epsilon;
}

function getCounts(numbers, j) {
    
    let onesCount = numbers.filter(n => n[j] === "1").length;
    let zerosCount = numbers.filter(n => n[j] === "0").length;

    //console.log(`0: ${zerosCount}, 1: ${onesCount}`);

    const mostCommon = onesCount >= zerosCount ? "1" : "0";
    const leastCommon = zerosCount <= onesCount ? "0" : "1";

    return [mostCommon, leastCommon];
}

function filterBit(numbers, i, v) {
    return numbers.filter(n => v[i] === v);
}

function part2(numbers) {   
    let o2Ratings = [...numbers];
    let co2Ratings = [...numbers];
    //console.log(co2Ratings);
    for(let i=0; i<numbers[0].length; i++) {
        if (o2Ratings.length > 1) {
            let [mostCommon] = getCounts(o2Ratings, i);
            //console.log(mostCommon);
            o2Ratings = o2Ratings.filter(r => r[i] === mostCommon);
        }
        if (co2Ratings.length > 1) {
            let [, leastCommon] = getCounts(co2Ratings, i)
            //console.log(leastCommon);
            co2Ratings = co2Ratings.filter(r => r[i] === leastCommon);
        }
        //console.log(co2Ratings);
    }

    let o2 = parseInt(o2Ratings[0], 2);
    let co2 = parseInt(co2Ratings[0], 2);

    //console.log(co2);

    return o2 * co2;
}

console.log(part1(numbers));
console.log(part2(numbers));