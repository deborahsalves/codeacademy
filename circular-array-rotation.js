// FROM HACKERANK > https://www.hackerrank.com/challenges/circular-array-rotation/problem

const matchConstraints = (arr, k, queries) => {
    let n = arr.length;
    let q = queries.length;
    if (1 <= n && n <= 10**5 && //a[i] I didnt get
        1 <= k && k <= 10**5 && 1 <= q && q <= 500 // && queries[i] I also didnt get
        ) {
            return true;
        } else {
            return false;
        }
}

const rotateArr = (arr, k) => {
    let copiedArr = arr.slice();
    let rotationsDone = 0;
    let length = arr.length
    do {
        console.log('rotations B4 rotation ' + rotationsDone);
        let item = copiedArr[length - 1];
        console.log('item ' + item);
        copiedArr.pop();
        console.log('copiedArr after pop ' + copiedArr);
        copiedArr.unshift(item);
        console.log('copiedArr after unshift ' + copiedArr);
        rotationsDone++
        console.log('rotations after rotation ' + rotationsDone);
    }
    while (rotationsDone < k)
    return copiedArr;
}

const circularArrayRotation = (arr, k, queries) => {
    if(!matchConstraints(arr, k, queries)){
        return null;
    }
    let rotatedArr = rotateArr(arr, k);
    console.log('rotatedArr: ' + rotatedArr);
    let result = [];
    queries.forEach((query) => {
        console.log('this query i: ' + query);
        result.push(rotatedArr[query]);
        console.log('element in B at index i: ' + rotatedArr[query]);
        console.log('result at this point: ' + result)
    })
    console.log('result' + result)
    return result;
}
console.log(circularArrayRotation([1, 2, 3], 2, [0,1,2]))