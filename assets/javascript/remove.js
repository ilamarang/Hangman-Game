var validKeyboardInputs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];
var computerChoice;
var bandList = ["BACKSTREET", "BEATLES", "EAGLES","MADONNA", 
"RAHMAN", "RAJA","QUEEN","RIHANNA"];
var countCustomerClick;
var countRemainingAttempts = 10;
var foundMatch = false;
var userGuess = "";
var stopGame = false;
var displayLostMessage = "SORRY! <br> You have exhausted your attempts. Please click Restart to Play again";
var displaySuccessMessage = "SUCCESS!!! <br> You Won. Please click Restart to play again";
var displayRemainingMessage = "Remaining Attempts:  ";

window.onload = function () {

	pickChoice();
	console.log(computerChoice);

	populateComputerGuess();
	displayComputerKeyboard();
}

pickChoice = function () {

	computerChoice = bandList[Math.floor(Math.random() * bandList.length)];
	
	//computerChoice = computerChoice.replace(/\s/g, "-"); 
}

playGame = function () {

}

populateComputerGuess = function () {

	var elementBlankGuess = document.getElementById('displayCustomerGuess');
	var guessBlankRow;
	var guessBlankWord;

	for(counterBlanks=0;counterBlanks<computerChoice.length;counterBlanks++) {
		
		guessBlankRow = document.createElement("div");
		guessBlankRow.class = "row";
		guessBlankWord = document.createElement("h2");
		guessBlankWord.innerHTML = "_";
		guessBlankWord.id = "computerGuess" + counterBlanks;
		guessBlankRow.appendChild(guessBlankWord);
		elementBlankGuess.appendChild(guessBlankRow);
		
	}	

}
populateResults = function () {
	console.log(countRemainingAttempts);
	console.log("User Guess Length" + userGuess.length);
	console.log("Computer Choice Length" + computerChoice.length);

	if(countRemainingAttempts===0)
	{
		document.getElementById("lblRemainingAttempts").innerHTML = displayLostMessage;
	}
	else if (userGuess.length===computerChoice.length) 
	{
		document.getElementById("lblRemainingAttempts").innerHTML = displaySuccessMessage;			
		stopGame = true;
	}
	else
	{
		document.getElementById("lblRemainingAttempts").innerHTML = displayRemainingMessage + countRemainingAttempts;	
	}


}

displayComputerKeyboard = function () {

	var keyboardButtons = document.getElementById("keyboardInputs");
	var keyboardLetters = document.createElement("ul");

	for (var i = 0; i < validKeyboardInputs.length; i++) {
		keyboardLetters.id = 'validKeyboardInputs';
		alphabetList = document.createElement("li");
		alphabetList.id = "keyboardLetter";
		alphabetList.innerHTML = validKeyboardInputs[i];
		alphabetList.onclick = clickEvent;
		keyboardButtons.appendChild(keyboardLetters);
		keyboardLetters.appendChild(alphabetList);
	}


}

clickEvent = function () {
	
	if(countRemainingAttempts > 0 && !stopGame)
	{
		console.log("Inside click event " + countRemainingAttempts);
		for (var i = 0; i < computerChoice.length; i++) {

			if (computerChoice[i] === this.innerHTML.toUpperCase()) {
				if (this.innerHTML != "-") {

				document.getElementById("computerGuess" + i).innerHTML = computerChoice[i];
				foundMatch = true;	
				userGuess = userGuess + computerChoice[i];
				console.log("Customer Guess" + userGuess);		

				}
				

			} 

		}
		if(!foundMatch) {
			console.log("Inside found Match" + countRemainingAttempts);
			countRemainingAttempts--;
			
			
		}
		// Populate Results of the Click
		populateResults();
		//Reset the value
		foundMatch = false;
	}
}

