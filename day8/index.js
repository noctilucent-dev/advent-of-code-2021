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

const lines = raw.trim().split("\n");

function log(l) {
    if (DEBUG) {
        console.log(l);
    }
}

/*
 * Useful set functions, taken from Mozilla Wiki (under public domain):
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
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


function parseLine(line) {
    let [signals, digits] = line.trim().split(" | ").map(v => v.trim().split(" "));
    return [
        signals,
        digits
    ];
}

/*
 * Part 1
 */
(function() {
    function part1(lines) {
        return lines.reduce((p, l) => {
            let [signals, digits] = parseLine(l);
            log(digits);
            const simpleDigits = digits.filter(d => d.length === 2 || d.length === 3 || d.length === 4 || d.length === 7);
            log(simpleDigits);
            return p + simpleDigits.length;
        }, 0);
    }

    console.log(part1(lines));
})();

/*
 * Part 2
 */
(function() {
    const segmentList = "abcdefg".split("");

    function newOptions() {
        return {
            a: new Set(segmentList),
            b: new Set(segmentList),
            c: new Set(segmentList),
            d: new Set(segmentList),
            e: new Set(segmentList),
            f: new Set(segmentList),
            g: new Set(segmentList)
        };
    }

    const numberSegments = [
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

    /**
     * Filters the specified options by considering the segements common to digits with 6 segments
     */
    function reduce6s(options, signals) {
        const [x, y, z] = signals.filter(s => s.length === 6).map(s => new Set(s.split("")));
        log(`Reducing 6s on ${x}, ${y} and ${z}`);
        const common = intersection(x, intersection(y, z));
        const toIntersect = ["a","b","f","g"];

        log(`Intersecting ${common} from:`);
        log(toIntersect);
        toIntersect.forEach(i => {
            options[i] = intersection(options[i], common);
        });

        log(`New options:`);
        log(options);
    }

    /**
     * Filters the specified options by considering the segements common to digits with 5 segments
     */
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

    /**
     * Filters the specified options by identifying segments with a single possible value.
     * Operate iteratively untill all segments have a single possibility.
     */
    function reduceSingles(options) {
        let keepGoing = true;
        while(keepGoing) {
            keepGoing = false;
            segmentList.forEach(i => {
                const elems = Array.from(options[i]);
                if (elems.length === 1) {
                    log(`${i} has single option ${elems[0]}`);
                    difference(segmentList, new Set([i])).forEach(j => options[j].delete(elems[0]));
                } else {
                    // Keep going until there is only 1 possibility for each segment
                    keepGoing = true;
                }
            });
        }
    }

    /**
     * Uses rules for the unique digits (1, 4, 7 and 8) to filter the specified options.
     */
    function reduceOptions(options, digit) {
        let toFilter, toIntersect;
        if (digit.length === 2) {
            log(`Digit is 1`);
            toIntersect = numberSegments[1];
            toFilter = difference(segmentList, numberSegments[1]);
        } else if (digit.length === 3) {
            log(`Digit is 7`);
            toIntersect = numberSegments[7];
            toFilter = difference(segmentList, numberSegments[7]);
        } else if (digit.length === 4) {
            log(`Digit is 4`);
            toIntersect = numberSegments[4];
            toFilter = difference(segmentList, numberSegments[4]);
        } else if (digit.length === 7) {
            log(`Digit is 8`);
            toIntersect = numberSegments[8];
            toFilter = difference(segmentList, numberSegments[8]);
        } else {
            log(`Digit ${digit} unsure`);
            return;
        }

        // We can remove the segments in this digit as options from some
        log(`Removing ${digit} from:`);
        log(toFilter);
        toFilter.forEach(f => {
            log(`Filtering ${f}`);
            digit.split("").forEach(d => {
                options[f].delete(d);
            });
        });

        // We can remove other options from the segments in this digit
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
        return numberSegments.findIndex(s => s.join("") === mapped);
    }

    function part2(lines) {
        let sum = 0;
        for (let i=0; i<lines.length; i++) {
            let [signals, digits] = parseLine(lines[i]);
            
            // Deduce possible segments
            // segement => posible provided segments
            let options = newOptions();
            signals.forEach(s => reduceOptions(options, s));
            reduce5s(options, signals);
            reduce6s(options, signals);
            reduceSingles(options);

            // Reverse the mapping (provided segement => intended segment)
            const mapping = {};
            segmentList.forEach(i => mapping[Array.from(options[i])[0]] = i);
            log(mapping);

            // Map the provided digits to the intended numbers
            const mappedDigits = digits.map(d => mapDigit(mapping, d));
            log(mappedDigits);

            // Convert to a number, and add to running total
            const num = parseInt(mappedDigits.join(""));
            log(num);
            sum += num;
        }

        return sum;
    }


    console.log(part2(lines));
})();