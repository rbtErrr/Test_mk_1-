var SlotGame = SlotGame || {};

SlotGame.game = new Phaser.Game(1000, 487, Phaser.AUTO);

SlotGame.GameState = {
    init: function () {

        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.stage.backgroundColor = 'eee8aa';
        // this.game.stage.backgroundColor = 'fff';

        this.NUM_ROWS = 3;
        this.NUM_COLS = 3;
        this.ANIMATION_TIME = 2000;

    },

    preload: function () {
        this.game.load.image('background', 'assets/images/Background.png');
        this.game.load.image('gameMachine', 'assets/images/gameMachine.png');


        this.game.load.image('letter1', 'assets/images/j.png');
        this.game.load.image('letter2', 'assets/images/q.png');
        this.game.load.image('letter3', 'assets/images/k.png');
        this.game.load.image('letter4', 'assets/images/a.png');

        this.game.load.image('number1', 'assets/images/3.png');
        this.game.load.image('number2', 'assets/images/4.png');
        this.game.load.image('number3', 'assets/images/5.png');
        this.game.load.image('number4', 'assets/images/6.png');

        this.game.load.image('winline', 'assets/images/winline.png');


        this.game.load.image('spinBtn', 'assets/images/Spin.png');


    },

    create: function () {

        this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 20, 'background');
        this.background.anchor.setTo(0.5);
        this.background.scale.setTo(0.9);

        this.gameMachine = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameMachine');
        this.gameMachine.scale.setTo(0.9);
        this.gameMachine.anchor.setTo(0.5);

        this.letters = this.add.group();

        this.spinBtn = this.add.button(this.game.world.centerX + 430, this.game.world.centerY, 'spinBtn', this.startSpin, this);
        this.spinBtn.anchor.setTo(0.5);

        this.slot1 = new SlotGame.Slot1(this, this.NUM_ROWS, this.NUM_COLS);

        this.winline = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'winline');
        this.winline.anchor.setTo(0.5);
        this.winline.scale.setTo(0.9, 1);
        this.winline.alpha = 0;

        this.number1 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'number1');
        this.number1.anchor.setTo(0.5);
        this.number1.alpha = 0;

        this.number2 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'number2');
        this.number2.anchor.setTo(0.5);
        this.number2.alpha = 0;

        this.number3 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'number3');
        this.number3.anchor.setTo(0.5);
        this.number3.alpha = 0;

        this.number4 = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'number4');
        this.number4.anchor.setTo(0.5);
        this.number4.alpha = 0;



        // this.createLetter(this, 300, 300, {asset: 'letter1'});
        this.drawBoard();





        this.dropBlockSp();



    },

    createLetter: function (state, x, y, data) {
        var letter = this.letters.getFirstExists(false);
        if (!letter) {
            this.letter = new SlotGame.Letter(this, x, y, data, this.ANIMATION_TIME);
            this.letters.add(this.letter);
        }
        else {
            this.letter.reset(x, y, data);
        }

        return letter;
    },

    drawBoard: function () {
        var i, j, square, x, y, data;

        var squareBitmap = this.add.bitmapData(220, 220);
        squareBitmap.ctx.fillStyle = 'red';
        squareBitmap.ctx.fillRect(0, 0, 220, 220);

        for (i = 0; i < this.NUM_ROWS; i++) {
            for (j = 0; j < this.NUM_COLS; j++) {
                x = 276 + j * (220 + 6);
                y = 150 + i * (220 + 6);

                square = this.add.sprite(x, y, squareBitmap);
                square.anchor.setTo(0.5);
                square.alpha = 0;

                this.createLetter(this, x, y, {
                    asset: 'letter' + this.slot1.grid[i][j],
                    row: i,
                    col: j
                }, this.ANIMATION_TIME);
            }
        }

        // this.game.world.bringToTop(this.background);
        this.game.world.bringToTop(this.gameMachine)
    },

    startSpin: function () {
        console.log("spin");
    },

    getLettersFromColRow: function (position) {
        var foundLetter;

        this.letters.forEach(function (letter) {
            if (letter.row === position.row && letter.col === position.col) {
                foundLetter = letter;
            }
        }, this);
        return foundLetter;
    },
    // source - start position, target - finished drop position
    dropBlockSp: function (sourceRow, targetRow, col) {
        var letter = this.getLettersFromColRow({row: sourceRow, col: col});

        if (letter) {
            this.alert("win");
        }
        //
        // var blockMovement = this.game.add.tween(block);
        // blockMovement.to({y: targetY}, this.ANIMATON_TIME);
        // blockMovement.start();
    },

    winAnimation: function () {
        if(!this.letters.children[0].winCheck){
            this.winLineAnimation = this.game.add.tween(this.winline);
            this.winLineAnimation.to({alpha: 1}, 500);
            this.winLineAnimation.start();
        }

        if( SlotGame.letterCheck1){
            this.lineAnimation1 = this.game.add.tween(this.number1);
            this.lineAnimation1.to({alpha: 1}, 500);
            this.lineAnimation1.start();
        }else if(SlotGame.letterCheck2){
            this.lineAnimation2 = this.game.add.tween(this.number2);
            this.lineAnimation2.to({alpha: 1}, 500);
            this.lineAnimation2.start();
        }else if(SlotGame.letterCheck3){
            this.lineAnimation3 = this.game.add.tween(this.number3);
            this.lineAnimation3.to({alpha: 1}, 500);
            this.lineAnimation3.start();
        }else if(SlotGame.letterCheck4){
            this.lineAnimation4 = this.game.add.tween(this.number4);
            this.lineAnimation4.to({alpha: 1}, 500);
            this.lineAnimation4.start();
        }
    },



    update: function () {
        this.winAnimation();

    }
};

SlotGame.game.state.add('GameState', SlotGame.GameState);
SlotGame.game.state.start('GameState');