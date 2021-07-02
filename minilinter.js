// from Code Academy > https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-ii/modules/fecp-learn-javascript-syntax-iterators/projects/mini-linter
let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

const storyWords = story.split(' ');

let overusedWords = ['really', 'very', 'basically'];

let unnecessaryWords = ['extremely', 'literally', 'actually'];

// pseudocode: filter storyWORDS
// that are != from all every unWord  

// filters OUT the unnecessay words
let betterWords = storyWords.filter((word) => {
    if (!(unnecessaryWords.includes(word))) {
        return word;
    }
});

// counts de overused words (manually...)
let reallyCnt = 0;
let veryCnt = 0;
let basicallyCnt = 0;
let maybeDont = betterWords.forEach((word) => {
    if (word === 'really') {
        return reallyCnt++;
    } else if (word === 'very') {
        return veryCnt++;
    } else if (word === 'basically') {
        return basicallyCnt++;
    }
});
console.log(`You got some overused words: \n${overusedWords[0]}: ${reallyCnt} \n${overusedWords[1]}: ${veryCnt} \n${overusedWords[2]}: ${basicallyCnt}\n`)

// counts the number of senteces
// considers only sentences ending in . or ! 
let sentenceCnt = 0;
betterWords.forEach((word) => {
    if (word[word.length - 1] === '.') {
        sentenceCnt++;
    } else if (word[word.length - 1] === '!') {
        sentenceCnt++;
    }
});
console.log(sentenceCnt);

// reports the number of words and sentences
// plus the counts for overused words
const report = (numWords, sentenceCnt, numOver) => {
    console.log(`Your text has ${numWords.length} words and ${sentenceCnt} sentences. \nHowever, you might want to rethink some overused words. \n${numOver[0]}: ${reallyCnt} \n${numOver[1]}: ${veryCnt} \n${numOver[2]}: ${basicallyCnt}.`)
};
console.log(report(storyWords, sentenceCnt, overusedWords));
console.log(betterWords.join(' '));


// challenge
// "Here are some ideas:
// 1. For the overused words, remove it every other time it appears.
// 2. Write a function that finds the word that appears the greatest number of times.
// 3. Replaced overused words with something else.


// 1 remove overused word every other time it appears
// I. find the index of every overused word
//    a. map overused words
//    b. find their indexes in the map and turn it to null so next instance can have a differente index
// II. find the even instances of each overused word
// III. pop even indexes from the string

// I.a. start by mapping out the other words, so the overusedones keep their position/index within the original string
const mapsOverused = betterWords.map((word) => {
    if (!(overusedWords.includes(word))) {
        return 0;
    } else {
        return word;
    }
});
console.log(mapsOverused);

// I.b find index in map, push it to indexes array and turn word to null so next instance can be found with indexof (only catches first instance)
let indexesOverused = [];
const findIndexes = mapsOverused.forEach((word) => {
    if (word !== 0) {
        //    console.log([word, mapsOverused.indexOf(word)])
        indexesOverused.push([word, mapsOverused.indexOf(word)]);
        mapsOverused[mapsOverused.indexOf(word)] = 0;
        return indexesOverused
    }
});
console.log(indexesOverused);

let indexTres = [];
// find even instances of overused words
// pega a palavra, compara com td os itens da array q tb têm a palavra, e daí retorna uma array com os indexes de cada instância, pra dps pegar as ímpar par nessa nova array de indexes

let testeIndexes = indexesOverused.slice();
testeIndexes.push(testeIndexes[2])
testeIndexes.slice(2, 3) // isso aqui tá errado, por isso que não tá indo, tem q ver a sintaxe pra remover um elemento específico a partir do index
console.log(testeIndexes);



/*
const findDuplicates = indexesOverused.forEach((subArr) => {
  for (let i = 0; i < indexesOverused.length; i++) {
    if (subArr[0] === indexesOverused[i][0]) {
      indexesOverused.push(indexesOverused[i])
      indexesOverused.shift(indexesOverused[i])
      return indexTres.push([subArr[0], i,indexesOverused[i][1]]);
    }
  }
});
*/
console.log(indexTres);
/*
const preEvens = indexesOverused.map((subArr) => {
  if (indexesOverused.includes(subArr)) {
    return numIndexes.push([subArr[0], indexesOverused.indexOf(subArr)])
  }
});
console.log(numIndexes);
*/