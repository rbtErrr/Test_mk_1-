var SlotGame = SlotGame || {};


SlotGame.Slot1 = function (state, rows, cols) {
    // this.Phaser.Sprite.call();
    this.state = state;
    this.grid = [];
    this.rows = rows;
    this.cols = cols;

    var i, j;
    for (i = 0; i < this.rows; i++) {
        this.grid.push([]);

        for (j = 0; j < this.cols; j++) {
            this.grid[i].push(0);
        }
    }

    this.populateSlot();
    this.consoleLog();
};

SlotGame.Slot1.prototype = Object.create(Phaser.Sprite.prototype);
SlotGame.Slot1.prototype.constructor = SlotGame.Slot1;

SlotGame.Slot1.prototype.populateSlot = function () {
    var i, j, variations;
    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.cols; j++) {
            variations = Math.floor(Math.random() * 4) + 1;
            this.grid[i][j] = variations;
        }
    }


};

SlotGame.Slot1.prototype.consoleLog = function () {
    var i, j;
    var prettyString = '';
    prettyString += '\n';

    for (j = 0; j < this.cols; j++) {
        prettyString += ' -';
    }

    for (i = 0; i < this.rows; i++) {
        prettyString += '\n';
        for (j = 0; j < this.cols; j++) {
            prettyString += ' ' + this.grid[i][j];
        }
    }
    console.log(prettyString);
};

SlotGame.Slot1.prototype.isChained = function (position) {
    var isChained = false;
    var row = position.row;
    var col = position.col;
    var letter = this.grid[position.row][position.col];

    if (letter === this.grid[row][col + 1] && letter === this.grid[row][col + 2]) {
        isChained = true;
    }

    return isChained;
};

SlotGame.Slot1.prototype.findChain = function () {
    var chained = [];
    var i, j;
    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.cols; j++) {
            if (this.isChained({row: i, col: j})) {
                chained.push({row: i, col: j});
                chained.push({row: i, col: +1});
                chained.push({row: i, col: +2});
                break;
            }
        }
    }

    console.log(chained);
    return chained;
};

SlotGame.Slot1.prototype.clearChains = function () {
    var chainedLetter = this.findChain();
    //set all find chaines to zero
    chainedLetter.forEach(function (letter) {
        // this.grid[letter.row][letter.col] = 0;
        this.state.getLettersFromColRow(letter).win();

    }, this);

    this.stop();

//    kill the block object
};

SlotGame.Slot1.prototype.stop = function () {
    var i, j;
    var getDataFromGreed = [];
    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.cols; j++) {

            getDataFromGreed.push({row: i, col: j});
        }
    }

    getDataFromGreed.forEach(function (letter) {
        // this.grid[letter.row][letter.col] = 0;

        this.state.getLettersFromColRow(letter).stop1();

    }, this);
}
;


//
// SlotGame.Slot1.prototype.dropBlock = function (sourceRow, targetRow, col) {
//     this.grid[targetRow][col] = this.grid[sourceRow][col];
//     this.grid[sourceRow][col] = 0;
//
//     this.state.dropBlockSp(sourceRow, targetRow, col);
// };
