// from HackerRank > https://www.hackerrank.com/challenges/sock-merchant/problem

// using their example
let ar = [10, 20, 20, 10, 10, 30, 50, 10, 20]
let n = ar.length;

const isTrue = (val) => {
    if (val === true) {
        return true;
    }
}

const checkConstraints = (ar, n) => {
    //    let n = ar.length;
    // duplicate the original array to find indexes of duplicate elements
    let testArr = ar.slice(0);
    let iChecker = [];
    // check constraint for i 
    ar.forEach((item) => {
        let i = testArr.indexOf(item);
        testArr.splice(i, 1, 'a')
        if (0 <= i && i < n) {
            iChecker.push(true)
        }
        return iChecker;
    })
    if (1 <= n && n <= 100 && iChecker.every(isTrue)) {
        return true;
    } else {
        console.log('Error!')
    }
}

const pairSocks = (ar) => {
    let pairCnt = 0;
    ar.forEach((sock) => {
        let sockIndex = ar.indexOf(sock);
        for (let j = (sockIndex + 1); j < ar.length; j++) {
            if (sock === ar[j]) {
                ar.splice(j, 1)
                ar.splice(sockIndex, 1, 'a')
                pairCnt++;
                break;
            }
        }
    })
    return pairCnt;
}

const sockMerchant = (ar, n) => {
    if (checkConstraints(ar, n)) {
        return pairSocks(ar)
    } else {
        console.log('Constraints aren\'t met');
    }
}