// from HackerRank > https://www.hackerrank.com/challenges/counting-valleys/problem

let path = 'DDUUUUDD';
let steps = path.length;

// check if path only up and down
const checkPath = (path) => {
    let allUorD = [];
    // check each step
    for (let i = 0; i < path.length; i++) {
        if (path[i] !== 'U' && path[i] !== 'D') {
            allUorD.push(false);
        } else {
            allUorD.push(true);
        }
    }
    // check all steps are either up or down
    return allUorD.every((x) => x === true)
}

// check if step are between 2 and 10^6
const checkSteps = (steps) => {
    if (2 <= steps && steps <= (10 ** 6)) {
        return true;
    } else {
        return false;
    }
}

// map path str to num arr (+1 up and -1 down)
const pathToArr = (path) => {
    let pathArr = [];
    for (let i = 0; i < path.length; i++) {
        pathArr.push(path[i])
    }
    let pathMap = pathArr.map((item) => {
        if (item === 'U') {
            return +1;
        } else {
            return -1;
        }
    })
    return pathMap;
}
const countingValleys = (steps, path) => {
    let result;
    if (checkPath(path) && checkSteps(steps)) {
        let pathMap = pathToArr(path)
        let pathUorD = 0;
        let pathCnt = 0;
        let finalCnt = 0;
        // when pathCnt is 0 after UP, we've come out of a valley, so finalCnt++
        for (let i = 0; i < path.length; i++) {
            // account for start counting going up a hill
            if (i === 0 && path[i] === 'U') {
                pathUorD += pathMap[i];
                // if doenst start uphill, then go find a valley along the way...
            } else if (path[i] === 'U' && pathUorD === -1) {
                pathUorD += pathMap[i];
                finalCnt++
                // keep going if you don't find a valley
            } else {
                pathUorD += pathMap[i];
            }
            pathCnt++
        }
        return result = finalCnt;
        // if constraints are not met 
    } else {
        console.log('Error!')
    }
    return result;
}
countingValleys(steps, path);