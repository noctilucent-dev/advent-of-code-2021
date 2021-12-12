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

const graph = parseGraph(raw.trim().split("\n"));
log(graph);

(function() {
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

    console.log(part1(graph));
})();

(function() {
    function recurseSearch(graph, path) {
        const last = path[path.length-1];
        if (last === "end") {
            log(path);
            return [path];
        }

        const childPaths = graph[last]
            .filter(c => {
                if (c === "start") return false;
                if (isBigCave(c)) return true;
                if (!path.includes(c)) return true;
                if (path.filter((item, index) => !isBigCave(item) && path.indexOf(item) !== index).length === 0) {
                    return true;
                }
                return false;
            })
            .map(c => recurseSearch(graph, [...path,c]))
            .flat();

        return childPaths;
    }

    function part2(graph) {
        const allPaths = recurseSearch(graph, ["start"]);
        log(allPaths);
        return allPaths.length;
    }

    console.log(part2(graph));
})();