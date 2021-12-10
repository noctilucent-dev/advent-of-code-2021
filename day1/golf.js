const d = require("fs").readFileSync("input.txt").toString().trim().split("\n").map(Number);
console.log(d.reduce((p, c, i, a) => p + (i > 0 && c > a[i-1]), 0));
console.log(d.reduce((p, c, i, a) => p + (i > 2 && c > a[i-3]), 0));