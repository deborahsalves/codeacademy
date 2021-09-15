const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field2DArr){
        this.originalArr = field2DArr;
        this._field = '';
        this.numberOfrows = field2DArr.length;
        this.numberOfcolumns = field2DArr[0].length;
        this.previousPositions = [[0, 0]]; // row, column (x,y)
        this._currentPosition = [0, 0]; // row, column (x,y)
    }

    get field() {
        return this._field;
    }

    set field(arr) {
        this._field = '';   // reset field to rebuild based on current arr
        for (let i = 0; i < this.numberOfrows; i++) {
            for (let j = 0; j < this.numberOfcolumns; j++){
                this._field += arr[i][j];
            }
            this._field += '\n';
        }
        return this._field;

    }

    // builds field based on previous user moves
    currentField(positionArr){
        let currentArr = this.originalArr;  // copied original arr
        positionArr.forEach((position) => { // gets each previous position to retrace steps
            let x = position[1];
            let y = position[0];
            if (x < 0) {
                currentArr[x+1][y] // ignore last move and print previous value
            } else if (x >= this.numberOfcolumns) {
                currentArr[x-1][y] // ignore last move and print previous value
            } else if (y < 0) {
                currentArr[x][y+1] // ignore last move and print previous value
            } else if (y >= this.numberOfrows) {
                currentArr[x][y-1] // ignore last move and print previous value
            } else{
                currentArr[x][y] = pathCharacter;
            }
        })
        this.field = currentArr;
        return this._field;
    }

    // calculates new position based on user choice
    currentPosition(direction) {
        switch(direction) {
            case 'D':
                this._currentPosition[1] += 1;
                this.previousPositions.push(this._currentPosition);
                break;
            case 'U':
                this._currentPosition[1] -= 1;
                this.previousPositions.push(this._currentPosition);
                break;
            case 'R':
                this._currentPosition[0] += 1;  // shift position to one column to the Right
                this.previousPositions.push(this._currentPosition); // saves user move to allow for current field to be built
                break;
            case 'L':
                this._currentPosition[0] -= 1;
                this.previousPositions.push(this._currentPosition);
                break;
        }
        return this._currentPosition;
    }

    // checks to see if user landed on grass, hole, hat or out of arena
    currentTerrain(arr) {
        let x = arr[0];
        let y = arr[1];
        let ySum = (this.numberOfcolumns * y) + y;
        let theTerrain = ySum + x;
        return this._field[theTerrain];
    }

    // moves the player onto their chosen tile
    makeMove(direction) {
        let pos = this.currentPosition(direction);
        let promptMessages = ['Where to? ', 'Oops, you\'ve stepped out of the arena, you loose :( ', 'Oops, you fell on a hole, you loose :( ', 'You found your hat, you win! :) '];
        let choosePrompt;
        let terrain = this.currentTerrain(pos)
        if (terrain === hat) { 
            this.currentField(this.previousPositions);
            this.print();
            choosePrompt = 3;
        } else if (terrain === hole) { // in the hole, user loses
            this.currentField(this.previousPositions);
            this.print();
            choosePrompt = 2;
        } else if (terrain != hat && terrain != hole && terrain != fieldCharacter && terrain != pathCharacter) { // out of boundaries, user loses
            this.currentField(this.previousPositions);
            this.print();
            choosePrompt = 1;
        } else { // regular move, user goes on
            this.currentField(this.previousPositions);
            this.print();
            choosePrompt = 0;
        }
        let nextMove = prompt(promptMessages[choosePrompt]).toUpperCase();
        return this.makeMove(nextMove);
    }

    // prints starting/current field
    print() {
        if (!this._field) {
            this.field = this.originalArr;
            console.log(this._field);
        } else {
            console.log(this._field);
        }
    }

    // generates a random field based on given width and height
    static generateField(w, h, percent) {
        let randomField = []; // assembles columns into rows to build field
        // picks a spot to put the hat
        let hatX = Math.floor(Math.random() * (w-1));
        let hatY = Math.floor(Math.random() * (h-1));
        for (let i = 0; i < h; i++) { // creates a row array (y pos)
            let aColumn = [];
            for (let j = 0; j < w; j++) { // creates each element of column to-be array (x pos)
                let aTile;
                if (i === 0 && j === 0) { // element at [0,0] is the starting point
                    aTile = pathCharacter;
                } else if (i === hatY && j === hatX) { // skips pos at which the hat was placed
                    aTile = hat;
                } else { // fills other tiles of the field
                    let randIndex = Math.floor(Math.random() * 2)
                    switch(randIndex) {
                        case 0:
                            aTile = hole;
                            break;
                        case 1:
                            aTile = fieldCharacter;
                            break;
                    }
                }
                aColumn.push(aTile);
            }
            randomField.push(aColumn);
        }
        return randomField;
    }


}

const startGame = (fieldArr) => {
    const myField = new Field(fieldArr);
    myField.print();
    let nextMove = prompt('Where to? ').toUpperCase()
    myField.makeMove(nextMove);
}

startGame(Field.generateField(4,4));


