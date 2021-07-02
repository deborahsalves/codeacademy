// from HackerRank > https://www.hackerrank.com/challenges/jumping-on-the-clouds/problem

// pseudo-code:
// 1 get user current position
// 2 get thunderhead clouds
// 3 make thunderhead clouds a no-go
// 4 check if next step is safe or no go
//  a. if possible, jumpTwo
//  b. otherwise, jumpOne
// 5 count the # of jumps

let c = [0, 1, 0, 0, 0, 1, 0];

// check constraints
const checkN = (n) => {
    if (2 <= n && n <= 100) {
        return true;
    } else {
        return false;
    }
}
const checkC = (c) => {
    let allCs = [];
    for (let i = 0; i < c.length; i++) {
        if (cloudTypes.includes(c[i])) {
            allCs.push(true);
        } else {
            allCs.push(false);
        }
    }
    return allCs.every(x => x === true);
}

// constraint: landings at start and end
const checkLandings = (c, n) => {
    if (c[0] === c[n - 1] && c[n - 1] === 0) {
        return true;
    } else {
        return false;
    }
}

const checkConditions = (c, n) => {
    if (checkN && checkC && checkLandings) {
        return true;
    } else {
        return false;
    }
}

// number clouds from c array
const numberClouds = (c) => {
    let copy = c.slice(0);
    let numberedClouds = [];
    c.forEach((cloud) => {
        let i = copy.indexOf(cloud);
        copy.splice(i, 1, 'a');
        numberedClouds.push((i + 1))
    })
    return numberedClouds;
}

// get forbidden clouds (thunderheads)
const getThunderheads = (c) => {
    let forbiddenClouds = [];
    for (let i = 0; i < c.length; i++) {
        if (c[i] === 1) {
            forbiddenClouds.push(i)
        }
    }
    return forbiddenClouds;
}

// set game allowed moves
const jumpOne = (x) => x += 1;
const jumpTwo = (x) => x += 2;

// check next step
const checkNextStepTwo = (currentCloud, c, forbiddenClouds) => {
    if (!(forbiddenClouds.includes(c.indexOf(c[currentCloud + 1])))) {
        // step is safe, return TRUE
        return true;
    } else {
        // next step is forbidden, return FALSE
        return false;
    }
}

const checkNextStepOne = (currentCloud, c, forbiddenClouds) => {
    if (!(forbiddenClouds.includes(c.indexOf(c[currentCloud])))) {
        // step is safe, return TRUE
        return true;
    } else {
        // next step is forbidden, return FALSE
        return false;
    }
}
const takeJump = (currentCloud, c, forbiddenClouds, jumpCnt) => {
    const cloudTypes = [0, 1];
    // it's always faster if player can go 2x2
    if (checkNextStepTwo(currentCloud, c, forbiddenClouds)) {
        currentCloud = jumpTwo(currentCloud);
        // if not possible, jump just 1
    } else if (checkNextStepOne(currentCloud, c, forbiddenClouds)) {
        currentCloud = jumpOne(currentCloud)
            // throw error
    } else {
        console.log("Error! Either a jump of either one or two ought to be possible")
    }
    return currentCloud;
}

const jumpingOnClouds = (c) => {
    let n = c.length;
    let jumpCnt = [];
    let gameResult;
    // check if constraints are met 
    if (checkConditions) {
        let numberedClouds = numberClouds(c);
        let currentCloud = numberedClouds[0];
        let forbiddenClouds = getThunderheads(c);
        // run jumps
        while (currentCloud < n) {
            currentCloud = takeJump(currentCloud, c, forbiddenClouds, jumpCnt);
            jumpCnt++;
            gameResult = jumpCnt;
        }
    } else {
        console.log("Error! Initial conditions are not met")
    }
    return gameResult;
}
console.log(jumpingOnClouds(c))