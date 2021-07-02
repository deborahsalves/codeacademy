// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

/* ------- PART 1 ------- */

//pseudo-code
// 0 function findInvalidCards() will iterate through an array of arrays (credit card numbers) and return the INVALID ones (negation of checking)
// 1 reverse original array (instead of iterating back to front)
// 2 iterate through the array and, at the odd indexes, double the value at that index (check digit is index 0)
// 3  A. if double is greater than 9, subtract 9
//    B. else, leave as is
// 4 sum up all items in the index
// 5  A. if modulo 10 is 0 (sum % 10), return VALID
//    B. else, NOT valid

// 1 reverse original array (instead of iterating back to front). Got the idea from @stormy at the Discord # 
const reverseAndCopy = (arr) => {
    let copyArr = arr.slice(0)
    let reversedArr = copyArr.reverse();
    console.log("reversed: " + reversedArr)
    return reversedArr;
}

// 2 iterate through the array and, at the odd indexes, double the value at that index (check digit is index 0)
const doubleOdds = (arr) => {
    let newArr = [];
    arr.map((digit) => {
        let index = (arr.indexOf(digit))
        let newDigit;
        if (index === 0) {
            arr[index] = 'a'; // change the number in the original array so indexOf works properly
            newArr.push(digit);
        } else if (index % 2 === 1) {
            newDigit = digit * 2;
            arr[index] = 'a';
            newArr.push(newDigit);
        } else {
            arr[index] = 'a';
            newArr.push(digit);
        }
        return newArr;
    })
    console.log("doubled: " + newArr)
    return newArr;
}

// 3  A. if double is greater than 9, subtract 9
const adjustDoubles = (arr) => {
    let newArr = [];
    arr.map((digit) => {
        let newDigit;
        if (digit > 9) {
            newDigit = digit - 9;
            newArr.push(newDigit);
        } else {
            // 3  B. else, leave as is
            newDigit = digit
            newArr.push(newDigit);
        }
        return newArr;
    })
    console.log("adjusted: " + newArr)
    return newArr;
}

// 4 sum up all items in the index
const sumAlldigits = (arr) => {
    let finalSum = 0;
    arr.forEach((digit) => {
        finalSum += digit;
        return finalSum
    })
    console.log("finalSum: " + finalSum)
    return finalSum;
}

// 5  A. if modulo 10 is 0 (sum % 10), return VALID
const checkSum = (num) => {
    let validation;
    if (num % 10 === 0) {
        console.log("validation: valid")
        return validation = "valid";
    } else {
        //    B. else, NOT valid
        console.log("validation: invalid")
        return validation = "invalid";
    }
}

// 0 function findInvalidCards() will iterate through an array of arrays (credit card numbers) and return the INVALID ones (negation of checking)
const validateCred = (arr) => {
    let isValid;
    let reversed = reverseAndCopy(arr);
    let doubled = doubleOdds(reversed);
    let adjusted = adjustDoubles(doubled);
    let theSum = sumAlldigits(adjusted);
    let theValidity = checkSum(theSum);
    if (theValidity === 'invalid') {
        isValid = false;
    } else if (theValidity === 'valid') {
        isValid = true;
    } else {
        console.log("Error! theValitidy has to be true or false");
    }
    console.log("isValid is " + isValid)
    return isValid;
}

const findInvalidCards = (nestedArr) => {
    let isInvalid = [];
    nestedArr.forEach((subArr) => {
        let isValid = validateCred(subArr);
        if (!(isValid)) {
            isInvalid.push(subArr);
        }
        return isInvalid;
    })
    console.log("isInvalid array: " + isInvalid);
    return isInvalid;
}


/* TESTING */

let test = [1, 5, 3];
let noAdjust = doubleOdds(reverseAndCopy(test));
console.log("noAdjust array is " + noAdjust);
let wAdjust = adjustDoubles(noAdjust);
console.log("w adjust" + wAdjust);
let theSum = sumAlldigits(wAdjust);
console.log("the sum of all digits is " + theSum);
let check = checkSum(theSum);
console.log("ask checking: is this card valid? " + check);
console.log("make sure original is still \n   " + test);

let test2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
let testingTest2 = validateCred(test2);
let onlyValid = [valid1, valid2, valid3, valid4, valid5];
let onlyInvalid = [invalid1, invalid2, invalid3, invalid4, invalid5];
let testingValid = findInvalidCards(onlyInvalid);
let batchInvalid = findInvalidCards(batch);

console.log(batchInvalid)

/* ------- PART 2 ------- */

const everyInvalidCardCompany = (nestedArr) => {
    let companies = [];
    nestedArr.forEach((arr) => {
        let firstDigit = arr[0];
        if (firstDigit !== 3 && firstDigit !== 4 && firstDigit !== 5 && firstDigit !== 6) {
            console.log("Company not found");
        } else {
            switch (firstDigit) {
                case 3:
                    console.log("Amex");
                    companies.push("Amex (American Express)");
                    break;
                case 4:
                    console.log("Visa");
                    companies.push("Visa");
                    break;
                case 5:
                    console.log("Master");
                    companies.push("Mastercard");
                    break;
                case 6:
                    console.log("Discover");
                    companies.push("Discover");
                    break;
            }
        }
        return companies;
    });
    console.log("companies: " + companies);
    return companies;
}

const findDuplicates = (arrCards, arrCompanies) => {
    let uniqueCompanies = [];
    arrCompanies.forEach((company) => {
        let index = arrCards.indexOf(company);
        uniqueCompanies.push(arrCards[index])
    })
    console.log("uniqueCompanies at return " + uniqueCompanies);
    return uniqueCompanies;
}

const idInvalidCardCompanies = (nestedArr) => {
    let duplicateCompanies = everyInvalidCardCompany(nestedArr);
    let finalCardCompanies = findDuplicates(duplicateCompanies, companies);
    return finalCardCompanies;
}

let companies = ["Amex (American Express)", "Visa", "Mastercard", "Discover"];

let idCompanies = idInvalidCardCompanies(batchInvalid)
console.log(idCompanies)


/* ------- PART 3 ------- */

const strToArr = (str) => {
    let splitedStrArr = str.split('');
    let arr = [];
    splitedStrArr.forEach((chr) => {
        arr.push(Number(chr));
    })
    return arr;
}
let myArr = strToArr('30553613994955');
console.log(myArr)

/* ------- PART 4 ------- */

// Create a function that will convert invalid numbers into valid numbers.
// 1. take de modulo sum and check how much we got left to round (% 10 = 0)
// 2. take the reversed and check the first EVEN > 0 to see if it can be added to the number.
//  a. if yes, break;
//  b. if not, take the second odd, so on, so forth

const leftOfSum = (num) => {
    return 10 - (num % 10);
}

const addToEvens = (arr, left) => {
    let updatedLeft = left;
    let i = 2;
    while (updatedLeft > 0 && i < arr.length) {
        let currentDigit = arr[i]; // 7 *** 9 *** 1
        let thisSum = currentDigit + updatedLeft; // 7 + 5 = 12 *** 9 + 3 = 12 *** 1 + 3 = 4
        if (thisSum > 9) {
            thisLeft = Math.abs(10 - thisSum); // (10 - 12) = 2 *** (10 - 12) = 2
            let newDigit = currentDigit + thisLeft; // 7 + 2 = 9; *** 9 + 2 = 11
            if (newDigit > 9) {
                thisLeft = 0;
            } else {
                arr.splice(i, 1, newDigit);
            }
            updatedLeft -= thisLeft; // 5 - 2 = 3 *** [] ***
        } else {
            updatedLeft = 0;
            arr.splice(i, 1, thisSum);
        }
        i += 2;
    }
    return arr;
}

const turnValid = (arr) => {
    let reversed = reverseAndCopy(arr);
    let doubled = doubleOdds(reversed);
    let adjusted = adjustDoubles(doubled);
    let theSum = sumAlldigits(adjusted);
    let theValidity = checkSum(theSum);
    if (theValidity === 'invalid') {
        reversed = reverseAndCopy(arr);
        console.log("reversed inside if " + reversed)
        let theLeft = leftOfSum(theSum);
        let newArr = addToEvens(reversed, theLeft);
        return arr = reverseAndCopy(newArr);
    } else if (theValidity === 'valid') {
        return arr;
    } else {
        console.log("Error! theValitidy has to be true or false");
    }
}

let valid6 = turnValid(strToArr('36059918204581'));
console.log(validateCred(valid6));