// FROM CODEWARS: https://www.codewars.com/kata/56606694ec01347ce800001b
// Implement a method that accepts 3 integer values a, b, c. 
// The method should return true if a triangle can be built with the sides of given length 
// and false in any other case.
// (In this case, all triangles must have surface greater than 0 to be accepted).

// pseudo-code
// 1 check if all three values as greater than 0 (else, throw error)
// 2 check if the sum of two sides is greater than the size of the third if any possible combination (triangle condition / math)
//  a. combine sides 2 by 2
//  b. compare to third
//  c. use a combination formula to make all possible combinations
// 3 if condition is met, return true

const isTriangle = (a, b, c) => {
    let sides = [a, b, c]
    if (sides.includes(0)) {
        return false;
    }
    sides.sort((a, b) => a - b);
    console.log("sides: " + sides)
    if (sides[0] + sides[1] > sides[2]) {
        return true;
    } else {
        return false;
    }
}
console.log(isTriangle(1, 2, 2))