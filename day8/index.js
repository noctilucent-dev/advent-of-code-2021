const fs = require("fs");

let raw = fs.readFileSync("input.txt", "utf8").toString();

// set true to use sample data and draw map
let DEBUG = !!process.env.DEBUG;

if (DEBUG) {
    raw = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
    edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
    fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
    fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
    aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
    fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
    dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
    bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
    egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
    gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

    // raw = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;
}

function log(l) {
    if (DEBUG) {
        console.log(l);
    }
}

function parseLine(line) {
    let [signals, digits] = line.trim().split(" | ").map(v => v.trim().split(" "));
    return [
        signals,
        digits
    ];
}

function part1(lines) {
    return lines.reduce((p, l) => {
        let [signals, digits] = parseLine(l);
        log(digits);
        const simpleDigits = digits.filter(d => d.length === 2 || d.length === 3 || d.length === 4 || d.length === 7);
        log(simpleDigits);
        return p + simpleDigits.length;
    }, 0);
}

const alphabet = "abcdefg".split("");

function newOptions() {
    return {
        a: new Set([...alphabet]),
        b: new Set([...alphabet]),
        c: new Set([...alphabet]),
        d: new Set([...alphabet]),
        e: new Set([...alphabet]),
        f: new Set([...alphabet]),
        g: new Set([...alphabet])
    };
}

const segments = [
    "abcefg".split(""),
    "cf".split(""),
    "acdeg".split(""),
    "acdfg".split(""),
    "bcdf".split(""),
    "abdfg".split(""),
    "abdefg".split(""),
    "acf".split(""),
    "abcdefg".split(""),
    "abcdfg".split("")
];

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

function reduce6s(options, signals) {
    const [x, y, z] = signals.filter(s => s.length === 6).map(s => new Set(s.split("")));
    log(`Reducing 6s on ${x}, ${y} and ${z}`);
    const common = intersection(x, intersection(y, z));
    const toIntersect = ["a","b", "f", "g"];

    log(`Intersecting ${common} from:`);
    log(toIntersect);

    toIntersect.forEach(i => {
        options[i] = intersection(options[i], common);
    });

    log(`New options:`);
    log(options);
}

function reduce5s(options, signals) {
    const [x, y, z] = signals.filter(s => s.length === 5).map(s => new Set(s.split("")));
    log(`Reducing 5s on ${x}, ${y} and ${z}`);
    const common = intersection(x, intersection(y, z));
    const toIntersect = ["a","d","g"];

    log(`Intersecting ${common} from:`);
    log(toIntersect);

    toIntersect.forEach(i => {
        options[i] = intersection(options[i], common);
    });

    log(`New options:`);
    log(options);
}

function reduceSingles(options) {
    let keepGoing = true;
    while(keepGoing) {
        keepGoing = false;
        alphabet.forEach(i => {
            const elems = Array.from(options[i]);
            if (elems.length === 1) {
                log(`${i} has single option ${elems[0]}`);
                difference(alphabet, new Set([i])).forEach(j => options[j].delete(elems[0]));
            } else {
                keepGoing = true;
            }
        });
    }
}

function reduceOptions(options, digit) {
    let toFilter, toIntersect;
    if (digit.length === 2) {
        log(`Digit is 1`);
        toIntersect = segments[1];
        toFilter = difference(alphabet, segments[1]);
    } else if (digit.length === 3) {
        log(`Digit is 7`);
        toIntersect = segments[7];
        toFilter = difference(alphabet, segments[7]);
    } else if (digit.length === 4) {
        log(`Digit is 4`);
        toIntersect = segments[4];
        toFilter = difference(alphabet, segments[4]);
    } else if (digit.length === 7) {
        log(`Digit is 8`);
        toIntersect = segments[8];
        toFilter = difference(alphabet, segments[8]);
    } else if (digit.length === 6) {
        log(`Digit is 0, 6 or 9`);
        toIntersect = [];
        toFilter = difference(alphabet, union(segments[0], union(segments[6], segments[9])));
    } else if (digit.length === 5) {
        log(`Digit is 2, 3 or 5`);
        toIntersect = [];
        toFilter = difference(alphabet, union(segments[2], union(segments[3], segments[5])));
    } else {
        log(`Digit ${digit} unsure`);
        return;
    }

    log(`Removing ${digit} from:`);
    log(toFilter);

    toFilter.forEach(f => {
        log(`Filtering ${f}`);
        digit.split("").forEach(d => {
            options[f].delete(d);
        });
    });

    log(`Intersecting ${digit} from:`);
    log(toIntersect);

    toIntersect.forEach(i => {
        options[i] = intersection(options[i], digit.split(""));
    });

    log(`New options:`);
    log(options);
}

function mapDigit(mapping, digit) {
    let mapped = digit.split("").map(s => mapping[s]);
    mapped.sort();
    mapped = mapped.join("");
    return segments.findIndex(s => s.join("") === mapped);
}

function part2(lines) {
    let sum = 0;
    for (let i=0; i<lines.length; i++) {
        let [signals, digits] = parseLine(lines[i]);
        
        // Deduce possible segment
        let options = newOptions();
        signals.forEach(s => reduceOptions(options, s));
        reduce5s(options, signals);
        reduce6s(options, signals);
        reduceSingles(options);

        const mapping = {};
        alphabet.forEach(i => mapping[Array.from(options[i])[0]] = i);
        log("")
        log(mapping);
        const mappedDigits = digits.map(d => mapDigit(mapping, d));
        log(mappedDigits);
        const num = parseInt(mappedDigits.join(""));
        log(num);
        sum += num;
    }
    return sum;
}

const lines = raw.trim().split("\n");

//console.log(part1(lines));
console.log(part2(lines));