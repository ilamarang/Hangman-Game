var validKeyboardInputs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];
var computerPick
var computerChoice;


var bandList = [

{name:"BACKSTREET",imgLocation:"./assets/images/Backstreet.jpg" },
{name:"BEATLES",imgLocation:"./assets/images/Beatles.jpg" },
{name:"EAGLES",imgLocation:"./assets/images/Eagles.jpg" },
{name:"ADELE",imgLocation:"./assets/images/Adele.jpg" },
{name:"RAHMAN",imgLocation:"./assets/images/Rahman.jpg"},
{name:"ILAYARAJA",imgLocation:"./assets/images/Ilayaraja.jpeg"},
{name:"EDSHEERAN",imgLocation:"./assets/images/Edsheeran.jpg"},
{name:"TAYLORSWIFT",imgLocation:"./assets/images/Taylorswift.jpg"},
{name:"CORRS",imgLocation:"./assets/images/Corrs.jpg"},
{name:"BRYANADAMS",imgLocation:"./assets/images/Bryanadams.jpg"},
{name:"KATIEPERRY",imgLocation:"./assets/images/Katieperry.jpg"},
{name:"JOHNLEGEND",imgLocation:"./assets/images/Johnlegend.jpg"},
]


var countRemainingAttempts = 10;
var foundMatch = false;
var userGuess = "";
var displayBlank = "_";
var stopGame = false;
var displayLostMessage = " SORRY! <br> You have exhausted your attempts. Please click Restart to Play again";
var displaySuccessMessage = "SUCCESS! <br> Enjoy the music! - Please click Restart to play again";
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
	
}

resetGame = function () {
	playMusic.src = "";
	window.location.reload();
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


	if(countRemainingAttempts===0)
	{
		document.getElementById("lblRemainingAttempts").innerHTML = displayLostMessage;
	}
	else if (userGuess===computerChoice) 
	{
		document.getElementById("lblRemainingAttempts").innerHTML = displaySuccessMessage;			
		stopGame = true;
		document.getElementById("imgDisplayPic").src = computerPick.imgLocation;
		document.getElementById("imgDisplayPic").style.visibility = "visible";
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
		
		for (var i = 0; i < computerChoice.length; i++) {

			if (computerChoice[i] === this.innerHTML.toUpperCase()) {
				if (this.innerHTML != "-") {

				document.getElementById("computerGuess" + i).innerHTML = computerChoice[i];
				foundMatch = true;	
				userGuess = userGuess.substr(0,i) + computerChoice[i] + userGuess.substr(i+1);
					

				}
				

			} 

		}
		if(!foundMatch) {
			
			countRemainingAttempts--;
						
		}
		// Populate Results of the Click
		populateResults();
		//Reset the value
		//this.style.visibility = "hidden";
		$(this).fadeOut(500);

	}
}

$(document).ready(function() {
	$('#myCarousel').carousel({
	interval: 2000
	})
    
    $('#myCarousel').on('slid.bs.carousel', function() {
    	//alert("slid");
	});
    
    
}); 
