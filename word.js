 var letter = require('./letter.js');

 var Word = function (letters) {
    this.val = [];
    for (var i = 0; i<letters.length; i++) {
        this.val.push(new letter(letters[i]));
    };
    
    this.toString = function () {
        return this.val.join(' ');
    }
    this.check = function (guess) {
        for(var char in this.val) {
            this.val[char].guess(guess);
        }
    };
    //checks if whole word has been guessed or not yet
    this.isGuessed = function () {
        for (var char in this.val) {
            if (!this.val[char].guessed) {
                return false;
            }
        }
        return true;
    };
    //returns the number of remaining letters
    this.numRemain = function () {
        var count = 0;
        for (var i =0; i < this.val.length; i++){
            if (!this.val[i].guessed) {
                count++;
            } 
        }
        return count;
    }
 }

module.exports = Word;