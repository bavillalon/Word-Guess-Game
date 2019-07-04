//declare variables. word to guess is where i store the selected word from the array of objects containing the hints and words to guess
//currentletterguess is ised to store the letter from the user.
//user guesses is used to store the past guesses.
//printtoscreen is use to print print the parts of the word the user has guessed.
//I think the rest are pretty much self explanatory.
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
var hintForWord="";
var indexOfWord=0;
var alpha=false;


//this is a function to print the values of the game to the HTML. 
//i needed the nbsp to make a space in the html between the underscores and keep the extra spaces between multi worded answers since html reduces the total spaces.
function printf(){
    var temp1=printToScreen.split("");
    var temp2=incorrectGuesses.split("");
    document.getElementById('hangmanImage').src="assets/images/Hangman-"+strikes+".png";
document.getElementById('gameStatus').innerHTML=gameStatus;
document.getElementById("currentLetterGuess").innerHTML="Player guessed: " + currentLetterGuess;
document.getElementById("printToScreen").innerHTML="Progress: " + temp1.join("&nbsp");
document.getElementById("incorrectGuesses").innerHTML="Incorrect Guesses: " + temp2.join("&nbsp");
document.getElementById("wins").innerHTML="Wins: " + wins;
document.getElementById("losses").innerHTML="Losses: "+ losses;
document.getElementById("hint").innerHTML=hintForWord;
}

//array of objects with the word to guess and the hints associated with them
var wordData=[{name:"Edgar Allan Poe",hint:"Quote: I became insane with long intervals of horrible sanity."},{name:"candle",hint:"Always wax, yet always wane: I melt, succumbed to the flame. Lighting darkness, with fate unblest, I soon devolve to shapeless mess."},
{name:"darkness",hint:"The more there is of me, the less you see"},{name:"time",hint:"This thing all things devours; Birds, beasts, trees, flowers; Gnaws iron, bites steel; Grinds hard stones to meal; Slays king, ruins town, And beats mountain down."},
{name:"Nevermore",hint:"...quoth the raven."},]

//I could have made this a function and I should have but I didn't have time or the planning.
//this selects a word and hint from the array of objects
indexOfWord=Math.floor(Math.random()*wordData.length);
wordToGuess=wordData[indexOfWord].name;
hintForWord=wordData[indexOfWord].hint;
for(var i=0;i<wordToGuess.length; i++){
    if (wordToGuess[i]===" "){
        printToScreen+=" ";
    }
    else{
    printToScreen+="_";
    }
}

newWord=false;

printf();

document.onkeyup=function(event){
    //setting the user input to lowercase and checking to see if it's a single letter or a special character. anything other than a letter will be rejected.
    //alpha is a boolean to check to see if the character is a letter ot not. 
    usedLetter=false;
    currentLetterGuess = event.key.toLowerCase();
    alpha=(currentLetterGuess.length===1) && ((currentLetterGuess.charCodeAt(0)>64&&currentLetterGuess.charCodeAt(0)<91)||(currentLetterGuess.charCodeAt(0)>96&&currentLetterGuess.charCodeAt(0)<123));
    
//script only runs if it's a letter.
    if(alpha){
        //checkitn to see if the letter has been guessed. this is a basic switch. if the letter shows up in the array or string, the boolean usedletter will show as true.
    for(var i=0; i<userGuesses.length;i++){
        usedLetter=usedLetter||(userGuesses[i]===currentLetterGuess);
    }

    //only enters the loop if the letter hasn't been used. if it hasn't I add it to the en fof the user guesses string.
    //after I check to see if the guess was a good guess by going through the word string I got randomly from the array of objects.
    // if the letter was used then the else displays the error that it was used already.
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
                // if the guess wasn't good, it addds it to incorrect guesses.
                if(!goodGuess){
                    incorrectGuesses=incorrectGuesses.concat(currentLetterGuess);
                    strikes++;
                    gameStatus="Ooooo bad luck there..."
                }
            }
            else{
                gameStatus="You've already guessed that letter!"
            }


//if you lose then then we clear the variables and start again. 
     if(strikes===6){
        gameStatus="You lost the last game. A new game just started"
        currentLetterGuess="";
        newWord=true;
        printToScreen="";
        incorrectGuesses="";
        strikes=0;
        userGuesses="";
        losses++;
        hintForWord="";
        if(newWord){
            indexOfWord=Math.floor(Math.random()*wordData.length);
            wordToGuess=wordData[indexOfWord].name;
            hintForWord=wordData[indexOfWord].hint;
            for(var i=0;i<wordToGuess.length; i++){
                if (wordToGuess[i]===" "){
                    printToScreen+=" ";
                }
                else{
                    printToScreen+="_";
                }
            }

            newWord=false;
        }
    }
    else if(printToScreen===wordToGuess){
        gameStatus="You won. Play again to see if your luck continues..."
        currentLetterGuess="";
        newWord=true;
        printToScreen="";
        incorrectGuesses="";
        strikes=0;
        userGuesses="";
        wins++;
        hintForWord="";
        if(newWord){
            indexOfWord=Math.floor(Math.random()*wordData.length);
            wordToGuess=wordData[indexOfWord].name;
            hintForWord=wordData[indexOfWord].hint;
            for(var i=0;i<wordToGuess.length; i++){
                if (wordToGuess[i]===" "){
                    printToScreen+=" ";
                }
                else{
                    printToScreen+="_";
                }
            }

            newWord=false;
        }
    }
    }
    else{
        gameStatus="Invalid character. Please select a letter.";
        currentLetterGuess="";
    }

    
    //PRINT ALL THE THINGS
    printf();
}


