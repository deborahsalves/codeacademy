// from Code Academy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-ii/modules/fecp-challenge-project-mysterious-organism/projects/mysterious-organism

// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};

function pAequorFactory(num, bases) {
    this.specimenNum = num;
    this.dna = bases;
    this.mutate = function() {
        let randNum = Math.floor(Math.random() * 15)
        let randBase = returnRandBase();
        if (randBase !== this.dna[randNum]) {
            this.dna.splice(randNum, 1, randBase);
        } else {
            this.mutate();
        }
        return this.dna;
    };
    this.compareDNA = function(pAequor) {
        let cnt = 0;
        let copy = this.dna.slice(0)
        copy.map((eachBase) => {
            let i = copy.indexOf(eachBase)
            if (eachBase === pAequor["dna"][i]) {
                cnt++;
                copy.splice(i, 1, 'counted');
            } else {
                copy.splice(i, 1, 'not equal');
            }
        })
        let perc = Number(((cnt / 15) * 100).toFixed(2));
        // THIS CONSOLE.LOG IS THE REQUIRED OUTPUT
        console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${perc}% DNA in common.`);
        return perc;
    };
    this.willLikelySurvive = function() {
        let cnt = 0;
        this.dna.forEach((base) => {
            if (base === 'C' || base === 'G') {
                cnt++;
            }
        });
        let perc = cnt / 15;
        if (perc >= 0.6) {
            return true;
        } else {
            return false;
        }
    };
    this.complementStrand = function() {
        let complemented = [];
        this.dna.map((base) => {
            switch (base) {
                case 'A':
                    complemented.push('T');
                    break;
                case 'C':
                    complemented.push('G');
                    break;
                case 'G':
                    complemented.push('C');
                    break;
                case 'T':
                    complemented.push('A');
                    break;
            }
        })
        return complemented;
    };
}

const createBunch = (numOfspecimen) => {
    let batch = [];
    let i = 0
    while (batch.length < numOfspecimen) {
        let specimen = new pAequorFactory(i, mockUpStrand());
        if (specimen.willLikelySurvive()) {
            batch.push(specimen);
        }
        i++;
    }
    return batch;
}

const compareBunch = (arr) => {
    let comparisons = [];
    arr.forEach((spec) => {
        arr.map((specN) => {
                if (!(spec.specimenNum === specN.specimenNum)) {
                    let perc = spec.compareDNA(specN)
                    comparisons.push({ perc: perc, thisSpec: spec.specimenNum, comparedTo: specN.specimenNum });
                } else {}
            })
            // end of forEach
    })
    return comparisons;
}

const findDoubled = (arr) => {
    let result = [];
    result.push(arr[0]);
    let percsOnly = [];
    for (let i = 1; i < arr.length; i++) {
        percsOnly = result.map(item => item.perc);
        if (percsOnly.includes(arr[i].perc)) {
            result.push(arr[i])
            console.log("this item: " + arr[i].perc);
        } else {
            result.push(arr[i])
            console.log("this item: " + arr[i].perc);
            for (let j = i + 1; j < arr.length - i; j++) {
                if (arr[i].perc === arr[j].perc) {
                    console.log("this item J: " + arr[j].perc);
                    result.push(arr[j]);
                } else {
                    break;
                }
            }
            break;
        }
    }
    return result;
}

const mostRelated = (arr) => {
    let specsMostRelated = [];

    // compare every sample
    comparisons = compareBunch(arr);

    // eliminate duplicates (since A compared to B is the same as B compared to A)
    const filtered = comparisons.filter(comparison => comparison.thisSpec < comparison.comparedTo);

    // sort w more relation to the beginning of the array
    filtered.sort(function(a, b) { return b.perc - a.perc });

    // find if there's coincidence amongst 2 highest values
    specsMostRelated = findDoubled(filtered);

    // console result (for testing)
    specsMostRelated.forEach(item => console.log("this perc: " + item.perc))

    return specsMostRelated;
}

const printEach = (arr, param) => {
    arr.forEach((item) => {
        console.log("print this item: " + item[param]);
    })
}

/* TESTING */
/*
let bichin1 = new pAequorFactory(1, mockUpStrand())
let bichin2 = new pAequorFactory(2, mockUpStrand())
let arr = ['G', 'C', 'T', 'G', 'T', 'T', 'G', 'T', 'T', 'G', 'T', 'A', 'T', 'A', 'C'];
console.log("dna", bichin1.dna);
console.log("mutation", bichin1.mutate());
console.log("compareDNA ", bichin1.compareDNA(bichin2));
console.log("survival ", bichin1.willLikelySurvive());
let testSubjects = createBunch(5);
let testRelated = mostRelated(testSubjects);
printEach(testRelated, "perc");
*/