var validKeyboardInputs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];
var computerPick
var computerChoice;


var bandList = [

{name:"BACKSTREET",imgLocation:"./assets/images/Backstreet.jpeg" },
{name:"BEATLES",imgLocation:"./assets/images/Beatles.jpg" },
{name:"EAGLES",imgLocation:"./assets/images/Eagles.jpg" },
{name:"MADONNA",imgLocation:"./assets/images/Madonna.jpg" },
{name:"RAHMAN",imgLocation:"./assets/images/Rahman.jpg"},
{name:"RAJA",imgLocation:"./assets/images/Raja.jpg"},

]

var countCustomerClick;
var countRemainingAttempts = 10;
var foundMatch = false;
var userGuess = "";
var displayBlank = "_";
var stopGame = false;
var displayLostMessage = " SORRY! <br> You have exhausted your attempts. Please click Restart to Play again";
var displaySuccessMessage = "SUCCESS!!! <br> You Won. Please click Restart to play again";
var displayRemainingMessage = "Remaining Attempts:  ";
var audioLocation = "./assets/audio/";
var audioFormat = ".mp3";
var playMusic = new Audio("");



window.onload = function () {

	pickChoice();
	console.log(computerChoice);

	populateComputerGuess();
	displayComputerKeyboard();
}

pickChoice = function () {

	computerPick = bandList[Math.floor(Math.random() * bandList.length)];
	computerChoice = computerPick.name;
	//computerChoice = "TESTER";
	console.log("Object Choice" + computerChoice);
	//computerChoice = computerChoice.replace(/\s/g, "-"); 
}

resetGame = function () {
	playMusic.src = "";
}

populateComputerGuess = function () {

	var elementBlankGuess = document.getElementById('displayCustomerGuess');
	var guessBlankRow;
	var guessBlankWord;

	for(counterBlanks=0;counterBlanks<computerChoice.length;counterBlanks++) {
		
		guessBlankRow = document.createElement("div");
		guessBlankRow.class = "row";
		guessBlankWord = document.createElement("h2");
		guessBlankWord.innerHTML = displayBlank;
		guessBlankWord.id = "computerGuess" + counterBlanks;
		guessBlankRow.appendChild(guessBlankWord);
		elementBlankGuess.appendChild(guessBlankRow);
		userGuess = userGuess + displayBlank;
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
	else if (userGuess===computerChoice) 
	{
		document.getElementById("lblRemainingAttempts").innerHTML = displaySuccessMessage;			
		stopGame = true;
		document.getElementById("imgDisplayPic").src = computerPick.imgLocation;
		playMusic.src = audioLocation +computerChoice + audioFormat;
		
		playMusic.play();

		
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
				userGuess = userGuess.substr(0,i) + computerChoice[i] + userGuess.substr(i+1);
				//userGuess = userGuess + computerChoice[i];
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

