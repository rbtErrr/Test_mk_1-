var SlotGame = SlotGame || {};


SlotGame.letterCheck1 = false;
SlotGame.letterCheck2 = false;

SlotGame.letterCheck3 = false;
SlotGame.letterCheck4 = false;

SlotGame.Letter = function (state, x, y, data, animationTime) {
    Phaser.Sprite.call(this, state.game, x, y, data.asset);
    this.state = state;
    this.game = state.game;
    this.state = state;
    this.row = data.row;
    this.col = data.col;
    this.animationTime = animationTime;
    this.anchor.setTo(0.5);
    this.scale.setTo(0.7);
    this.data.asset = data.asset;
    this.winCheck = true;


    this.rotateAnimation();

};

SlotGame.Letter.prototype = Object.create(Phaser.Sprite.prototype);
SlotGame.Letter.prototype.constructor = SlotGame.Letter;

SlotGame.Letter.prototype.rotateAnimation = function () {
       this.t = this.animations.add('rotate');
        this.rotate = this.animations.play('rotate', 12, true);

};


SlotGame.Letter.prototype.reset = function (x, y, data) {
    Phaser.Sprite.prototype.reset.call(this, x, y);
    this.loadTexture(data.asset);
    this.row = data.row;
    this.col = data.col;
};

SlotGame.Letter.prototype.win = function () {
    this.winCheck = false;

    if (this.data.asset === 'letter1') {
        SlotGame.Letter.letterCheck1 = true;
        // this.loadTexture('number1');

    } else if (this.data.asset === 'letter2') {
        SlotGame.letterCheck2 = true;


        // this.loadTexture('number2');

    } else if (this.data.asset === 'letter3') {
        SlotGame.letterCheck3 = true;


        // this.loadTexture('number3');

    } else if (this.data.asset === 'letter4') {
        SlotGame.letterCheck4 = true;


        // this.loadTexture('number4');

    }

};

SlotGame.Letter.prototype.stop1 = function () {
    this.winCheck = false;
};




SlotGame.Letter.prototype.update = function () {
    // this.rotateAnimation();
    Phaser.State.prototype.update.call();
        if(this.winCheck){

        this.y += 2;

        if (this.y > 560) {
            this.y = -100;
        }

        }else if(!this.winCheck){
            this.y = this.position.y;
        }


};





