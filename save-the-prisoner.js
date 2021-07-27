// FROM HACKERRANK > https://www.hackerrank.com/challenges/save-the-prisoner/problem

// -- t is the number of test cases --
// n is the number of prisoners
// m is the number of pieces of candy
// s is the chair that first receives the candy
// return the S that receives the last piece of candy

// pseudo-code
// 1 create an array of chairs
// 2 loops through the chairs for the amount of sweets times
// 3 return the chair number


const matchConstraints = (n, m, s) => {
    if (1 <= n && n <= 10**9 && 1 <= m && m <= 10**9 && 1 <= s && s <= n) {
            return true;
        } else {
            return false;
        }
}

const saveThePrisoner = (n, m, s) => {
    let i = (n - s) + 1;
    console.log('f: ' + i)
    if (m < i) {
        console.log('less candy than ppl');
        console.log('result: ' + ((s + m) - 1));
        return (s + m) - 1; 
    } else {
        let remainingSweets = m - i;
        console.log('r: ' + remainingSweets);
        let rounds = remainingSweets % n;
        console.log('rounds: ' + rounds);
        const result = rounds === 0 ? n : rounds;
        return result;
    }
}

/* TESTING */

// console.log(saveThePrisoner(4, 6, 2)) // output 3
// console.log(saveThePrisoner(5, 2, 1)) // output 2
// console.log(saveThePrisoner(5, 2, 2)) // output 3
// console.log(saveThePrisoner(7, 19, 2)) // output 6
// console.log(saveThePrisoner(3, 7, 3)) // output 3
// console.log(saveThePrisoner(3, 8, 2)) // output 3
// console.log(saveThePrisoner(352926151, 380324688, 94730870)) // output 122129406
// console.log(saveThePrisoner(94431605, 679262176, 5284458)) // output 23525398
// console.log(saveThePrisoner(499999999, 999999997, 2)) // output 499999999
// console.log(saveThePrisoner(499999999, 999999998, 2)) // output 1
// console.log(saveThePrisoner(999999999, 999999999, 1)) // output 999999999
