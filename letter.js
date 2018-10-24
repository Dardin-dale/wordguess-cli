
var Letter = function(char) {
    this.val = String(char);
    this.guessed = this.val === " ";
    this.toString = function() {
        if(this.val === " ") {
            return " ";
        }
        if (this.guessed) {
            return this.val;
        } else {
            return "_";
        }
    }
    this.guess = function (char) {
        if (char === this.val) {
            this.guessed = true;
        }
    }

}

module.exports = Letter;

// var b = new Letter('b');
// var p = new Letter('p');
// console.log(p + b + p);