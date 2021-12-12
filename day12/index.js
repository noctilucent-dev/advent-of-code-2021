let { raw, DEBUG, log } = require("../util");

if (DEBUG) {
    raw = `
    start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end`;
}

function parseGraph(lines) {
    const graph = {};
    lines.forEach(l => {
        const [start, end] = l.trim().split("-");

        if (!graph[start]) graph[start] = [];
        if (!graph[end]) graph[end] = [];
        graph[start].push(end);
        graph[end].push(start);
    });
    return graph;
}

function isBigCave(name) {
    return name.toUpperCase() === name;
}

function recurseSearch(graph, path) {
    const last = path[path.length-1];
    if (last === "end") {
        log(path);
        return [path];
    }

    const childPaths = graph[last]
        .filter(c => isBigCave(c) || !path.includes(c))
        .map(c => recurseSearch(graph, [...path,c]))
        .flat();

    return childPaths;
}

function part1(graph) {
    const allPaths = recurseSearch(graph, ["start"]);
    log(allPaths);
    return allPaths.length;
}

const graph = parseGraph(raw.trim().split("\n"));
log(graph);

console.log(part1(graph));