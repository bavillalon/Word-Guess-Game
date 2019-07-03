var words=["apple","banana", "panda","bear","Michael Scott","Dwight Schrute"];
var wordToGuess="";
var currentLetterGuess="";
var userGuesses="_";
var printToScreen="";
var incorrectGuesses="";
var lenOfWord=0;
var goodGuess=false;
var usedLetter=false;
var strikes=0;
var gameStatus="";
var newWord=true;
var wins=0;
var losses=0;


wordToGuess=words[Math.floor(Math.random()*words.length)];
for(var i=0;i<wordToGuess.length; i++){
    if (wordToGuess[i]===" "){
        printToScreen+=" ";
    }
    else{
    printToScreen+="_";
    }
}
newWord=false;

document.getElementById('hangmanImage').src="assets/images/Hangman-"+strikes+".png";
document.getElementById('gameStatus').innerHTML=gameStatus;
document.getElementById("currentLetterGuess").innerHTML="Player guessed: " + currentLetterGuess;
document.getElementById("printToScreen").innerHTML="Progress: " + printToScreen;
document.getElementById("incorrectGuesses").innerHTML="Incorrect Guesses: " + incorrectGuesses;
document.getElementById("wins").innerHTML="Wins: " + wins;
document.getElementById("losses").innerHTML="Losses: "+ losses;

document.onkeyup=function(event){
    usedLetter=false;
    currentLetterGuess = event.key.toLowerCase();
    
    for(var i=0; i<userGuesses.length;i++){
        usedLetter=usedLetter||userGuesses[i]===currentLetterGuess;
    }


    if(currentLetterGuess.length===1&&(currentLetterGuess!=" ")){
        if( (strikes!=6) && (printToScreen!=wordToGuess) ){
            if(!usedLetter){
                userGuesses=userGuesses.concat(currentLetterGuess);
                goodGuess=false;
                for(var i=0; i<wordToGuess.length; i++){
                    if(currentLetterGuess===wordToGuess[i].toLowerCase()){
                        printToScreen=printToScreen.substring(0,i)+wordToGuess[i]+printToScreen.substring(i+1);
                        goodGuess=true;
                        gameStatus="Good guess!"
                    }
                }

                if(!goodGuess){
                    incorrectGuesses=incorrectGuesses.concat(currentLetterGuess);
                    strikes++;
                    gameStatus="Ooooo bad luck there..."
                }
            }
            else{
                gameStatus="You've already guessed that letter!"
            }
        }
    }

     if(strikes===6){
        gameStatus="You lost the last game. A new game just started"
        currentLetterGuess="";
        newWord=true;
        printToScreen="";
        incorrectGuesses="";
        strikes=0;
        userGuesses="";
        losses++;
        if(newWord){
            wordToGuess=words[Math.floor(Math.random()*words.length)];
            console.log(wordToGuess);
            for(var i=0;i<wordToGuess.length; i++){
                if (wordToGuess[i]===" "){
                    printToScreen+=" ";
                }
                else{
                printToScreen+="_";
                }
            }
            newWord=true;
        }
    }
    else if(printToScreen===wordToGuess){
        gameStatus="This is a win win win situation! Play again to see if your luck continues"
        currentLetterGuess="";
        newWord=true;
        printToScreen="";
        incorrectGuesses="";
        strikes=0;
        userGuesses="";
        wins++;
        if(newWord){
            wordToGuess=words[Math.floor(Math.random()*words.length)];
            console.log(wordToGuess);
            for(var i=0;i<wordToGuess.length; i++){
                if (wordToGuess[i]===" "){
                    printToScreen+=" ";
                }
                else{
                printToScreen+="_";
                }
            }
            newWord=true;
        }
    }

    
    document.getElementById('hangmanImage').src="assets/images/Hangman-"+strikes+".png";
    document.getElementById('gameStatus').innerHTML=gameStatus;
    document.getElementById("currentLetterGuess").innerHTML="Player guessed: " + currentLetterGuess;
    document.getElementById("printToScreen").innerHTML="Progress: " + printToScreen;
    document.getElementById("incorrectGuesses").innerHTML="Incorrect Guesses: " + incorrectGuesses;
    document.getElementById("wins").innerHTML="Wins: " + wins;
    document.getElementById("losses").innerHTML="Losses: "+ losses;
}


