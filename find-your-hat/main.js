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
        this._currentField = '';
        this._currentPosition = [0, 0]; // row, column (x,y)
    }

    set field(arr) {
        this._field = '';
        for (let i = 0; i < this.numberOfrows; i++) {
            for (let j = 0; j < this.numberOfcolumns; j++){
                this._field += arr[i][j];
            }
            this._field += '\n';
        }
        return this._field;

    }
    currentField(positionArr){
        let currentArr = this.originalArr;
        positionArr.forEach((position) => {
            let x = position[0];
            let y = position[1];
            currentArr[x][y] = '*';
        })
        this.field = currentArr;
        return this._field;
    }

    currentPosition(direction) {
        switch(direction) {
            case 'D':
                this._currentPosition[0] += 1;
                this.previousPositions.push(this._currentPosition);
                this.currentField(this.previousPositions);
                break;
            case 'U':
                this._currentPosition[0] -= 1;
                this.previousPositions.push(this._currentPosition);
                this.currentField(this.previousPositions);
                break;
            case 'R':
                this._currentPosition[1] += 1;
                this.previousPositions.push(this._currentPosition);
                this.currentField(this.previousPositions);
                break;
            case 'L':
                this.currentPosition[1] -= 1;
                this.previousPositions.push(this._currentPosition);
                this.currentField(this.previousPositions);
                break;
        }
        return this._currentField;
    }

    makeMove(direction) {
        this.currentPosition(direction);
        this.print();
    }

    print() {
        if (!this._field) {
            this.field = this.originalArr;
            console.log(this._field);
        } else {
            console.log(this._field);
        }
    }

}


/*** PLAYABLE ****/

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

myField.print();
let nextMove = prompt('Where to? ');
myField.makeMove(nextMove);
nextMove = prompt('And now? ');
myField.makeMove(nextMove);
nextMove = prompt('And now? ');
myField.makeMove(nextMove);
