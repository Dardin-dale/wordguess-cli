var word = require('./word.js');
var letter = require('./letter.js');
var inquirer = require('inquirer');
var fs = require('fs');

var words = [];
//reads and gets all of the possible words in the word bank
fs.readFile('wordbank.txt', 'utf8', function(err, data) {
    if (err) throw err;
    words = data.split(',');
    game(words);
})
 
//game variables
var test;
var numGames = 1;
var wins = 0;
var remain = 10;
var guessed = [];
var newGame = true;
var left;


//plays the game 
function game () { 
    if (newGame) {
        newGame = false;
        test = new word(words[Math.floor(Math.random()*words.length)]);
        left = test.numRemain();
    }
    console.log('Guessed: ' + guessed);
    console.log('Guesses Remaining: ' + remain);
    console.log(test + '\n');
    inquirer.prompt([
        {
            message: 'What Letter do you want to guess?',
            name: 'guess',
            validate: function (input) {
                if (input.length > 1 || !input.match(/[a-zA-Z]/i)) {
                    return "Please pick a letter";
                } else if (guessed.indexOf(input) != -1) {
                    return "You've already guessed that letter";
                }
                return true;
            }
        }
    ]).then(function(res) {
        var guess = res.guess;
        test.check(guess);
        console.log('\n');
        if (test.isGuessed() || remain == 1) {
            endGame();
        } else {
            // handles if guess was correct or not
            if (test.numRemain() == left) {
              guessed.push(guess);
              remain --;   
            } else {
              left = test.numRemain();
            }
            
            game();
        }
    })
    
    
}

//Runs end of game functions
function endGame () {
    console.log(test.toString());
    if (remain === 1) {
        console.log('Sorry! You Lose.'); 
    } else {
        console.log('Congrats! You win!')
        wins ++;
    }
    console.log('Games Played: '+ numGames);
    console.log('Wins: '+ wins);
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to play again?',
            name: 'play'
        }
     ]).then(function(data){
         if (data.play) {
            test = new word(words[Math.floor(Math.random()*words.length)]);
            remain = 10;
            guessed = [];
            numGames ++;
            newGame = true;
            game();
         } else {
            console.log('Thanks for Playing!');
         }

     });
}

// game(words);