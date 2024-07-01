// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



let oldScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: oldScrabbleScorer
      
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let letterScore = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         letterScore = letterScore + Number(pointValue);
		 }
 
	  }
	}
   
	return letterScore;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  return userWord = input.question("Let's play some scrabble! Enter a word: ");
};

let newPointStructure = transform(oldPointStructure);

let simpleLetterScorer ={
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};
function simpleScorer(word){
   
      let tempArr = word.toUpperCase().split("");
      let letterScore = 0;
   
      for(let i = 0; i < tempArr.length; i++){
         letterScore++;
      }
      
      return letterScore;
   
}

let vowelScorer = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.", 
   
   
   scorerFunction : vowelBonusScorer

};

function vowelBonusScorer(word){
   let Vowels = "AEIOU";
   let letterScore = 0;

      for(let i = 0; i < word.length; i++){
         if(Vowels.indexOf(word[i].toUpperCase()) !== -1){
            letterScore += 3;
         }else{letterScore++;}
      }
         
         return letterScore;
   }

let newScrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

function scrabbleScorer(word){
  
   //console.log(newPointStructure);
   let letterScore = 0;
   word = word.toLowerCase();
   
   
      for(let i = 0; i < word.length; i++){
         for(item in newPointStructure){
            if(item === word[i]){
               letterScore = letterScore + newPointStructure[item];
            }
         }//end of nested for
      }//end of main for
      return letterScore;
   }//end of function

let userWord = '';

const scoringAlgorithms = [simpleLetterScorer, vowelScorer,newScrabbleScorer];

function scorerPrompt() {
   let validInput = false;
   let num = input.question(`\nPlease select a mode to score your word!

0 = ${scoringAlgorithms[0].name}
${scoringAlgorithms[0].description}

1 = ${scoringAlgorithms[1].name}
${scoringAlgorithms[1].description}

2 = ${scoringAlgorithms[2].name}
${scoringAlgorithms[2].description}: `);


   while(!validInput){
      if(num >= 0 && num < 3){
         validInput = true
        
      }else{
         num = input.question("Please select a valid mode (0, 1, 2): ")
      }
   }
   

   return scoringAlgorithms[num];
}

function transform(pointStruct) {
   let tmpPointStruct = {};
   let tmpLetterArr = [];
   let tmpNumberArr = [];

   for (item in pointStruct){
      for(let i = 0; i < pointStruct[item].length; i++){
         tmpPointStruct[pointStruct[item][i].toLowerCase()] = Number(item);
        
      }
   }
   //console.log(tmpLetterArr);
   
   
   
   
   /*
   for(let i = 0; i < pointStruct[item].length; i++){
      if(tmpLetterArr[i] != pointStruct[item]){
         tmpLetterArr[i].push(pointStruct[item]);
         }
      }*/
   //console.log(tmpPointStruct);
   return tmpPointStruct;
}

function runProgram() {
   initialPrompt();
   let tmp = scorerPrompt();
   console.log(`
Mode: ${tmp.name}
Score: ${tmp.scorerFunction(userWord)}
`);

  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
