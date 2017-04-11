//Declare all the required Global variables to track the game 

var validKeyboardInputs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'
];
var computerRandomArtist;

// Array to hold the artist details, image and audio location.
var bandList = [

    {
        name: "BACKSTREET",
        imgLocation: "./assets/images/Backstreet.jpg",
        audioLocation: "./assets/audio/Backstreet.mp3"

    }, {
        name: "BEATLES",
        imgLocation: "./assets/images/Beatles.jpg",
        audioLocation: "./assets/audio/Beatles.mp3"
    }, {
        name: "EAGLES",
        imgLocation: "./assets/images/Eagles.jpg",
        audioLocation: "./assets/audio/Eagles.mp3"
    }, {
        name: "ADELE",
        imgLocation: "./assets/images/Adele.jpg",
        audioLocation: "./assets/audio/Adele.mp3"
    }, {
        name: "RAHMAN",
        imgLocation: "./assets/images/Rahman.jpg",
        audioLocation: "./assets/audio/Rahman.mp3"
    }, {
        name: "ILAYARAJA",
        imgLocation: "./assets/images/Ilayaraja.jpg",
        audioLocation: "./assets/audio/Ilayaraja.mp3"
    }, {
        name: "EDSHEERAN",
        imgLocation: "./assets/images/Edsheeran.jpg",
        audioLocation: "./assets/audio/Edsheeran.mp3"
    }, {
        name: "TAYLORSWIFT",
        imgLocation: "./assets/images/Taylorswift.jpg",
        audioLocation: "./assets/audio/Taylorswift.mp3"
    }, {
        name: "CORRS",
        imgLocation: "./assets/images/Corrs.jpg",
        audioLocation: "./assets/audio/Corrs.mp3"
    }, {
        name: "BRYANADAMS",
        imgLocation: "./assets/images/Bryanadams.jpg",
        audioLocation: "./assets/audio/Bryanadams.mp3"

    }, {
        name: "KATIEPERRY",
        imgLocation: "./assets/images/Katieperry.jpg",
        audioLocation: "./assets/audio/Katieperry.mp3"
    }, {
        name: "JOHNLEGEND",
        imgLocation: "./assets/images/Johnlegend.jpg",
        audioLocation: "./assets/audio/Johnlegend.mp3"
    },
]


var countRemainingAttempts;
var foundMatch;
var userGuess;
var displayBlank;
var stopGame;
var displayLostMessage;
var displaySuccessMessage;
var displayRemainingMessage;
var playMusic = new Audio("");
var computerScore = 0;
var userScore = 0;

/**
 * Initilizes all variables to a default value
 * @param {}  - None 
 * @return {} - None 
 */

initialize = function() {

    countRemainingAttempts = 10;
    foundMatch = false;
    userGuess = "";

    displayBlank = "_";
    stopGame = false;
    displayLostMessage = " SORRY! <br> You have exhausted your attempts. Please click Restart to Play again";
    displaySuccessMessage = "SUCCESS! <br> Enjoy the music! - Please click Restart to play again";
    displayRemainingMessage = "Remaining Attempts:  ";


}

/**
 * Begins the Game once the windlow is loaded.
 * @param {}  - None 
 * @return {} - None 
 */


window.onload = function() {

    initialize();
    pickChoice();
    populateComputerGuess();
    displayComputerKeyboard();
    document.getElementById("lblDisplayScore").innerHTML = "Computer Score: " + computerScore + "<br>Your Score: " + userScore ;
}


/**
 * Computer picks the random artist and eagerly loads the appropriate audio file.
 * @param {}  - None 
 * @return {} - None 
 */

pickChoice = function() {

    computerRandomArtist = bandList[Math.floor(Math.random() * bandList.length)];
    console.log(computerRandomArtist.name);
    playMusic.src = computerRandomArtist.audioLocation;
    playMusic.load();
}

/**
 * Resets the game and initialize the variables to appropriate values.
 * @param {}  - None 
 * @return {} - None 
 */
resetGame = function() {
    playMusic.src = "";

    initialize();
    pickChoice();


    var element = document.getElementById("validKeyboardInputs");
    element.parentNode.removeChild(element);
    element = document.getElementById("displayCustomerGuess");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    displayComputerKeyboard();
    populateComputerGuess();
    document.getElementById("imgDisplayPic").style.visibility = "hidden";
    document.getElementById("lblRemainingAttempts").innerHTML = displayRemainingMessage + countRemainingAttempts;

}

/**
 * Build screen elements based on the Computer's choice.
 * @param {}  - None 
 * @return {} - None 
 */
populateComputerGuess = function() {

    var elementBlankGuess = document.getElementById('displayCustomerGuess');
    var guessBlankRow;
    var guessBlankWord;

    for (counterBlanks = 0; counterBlanks < computerRandomArtist.name.length; counterBlanks++) {

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
/**
 * Populate the outcome of the click event. Checks to see if there are valid attempts and display message
 * @param {}  - None 
 * @return {} - None 
 */
populateResults = function() {


    if (countRemainingAttempts === 0) {
        document.getElementById("lblRemainingAttempts").innerHTML = displayLostMessage;
        computerScore++;
        document.getElementById("lblDisplayScore").innerHTML = "Computer Score: " + computerScore + "<br>Your Score: " + userScore ;
    } else if (userGuess === computerRandomArtist.name) {
        document.getElementById("lblRemainingAttempts").innerHTML = displaySuccessMessage;
        stopGame = true;
        document.getElementById("imgDisplayPic").src = computerRandomArtist.imgLocation;
        document.getElementById("imgDisplayPic").style.visibility = "visible";
        userScore++;
        document.getElementById("lblDisplayScore").innerHTML = "Computer Score: " + computerScore + "<br>Your Score: " + userScore ;

        playMusic.play();


    } else {
        document.getElementById("lblRemainingAttempts").innerHTML = displayRemainingMessage + countRemainingAttempts;
    }


}

/**
 * Function to build the computer keyboard on the screen.
 * @param {}  - None 
 * @return {} - None 
 */
displayComputerKeyboard = function() {

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

/**
 * Main click event handler. Loops through the input selected and takes an appropriate action
 * @param {}  - None 
 * @return {} - None 
 */
clickEvent = function() {

    if (countRemainingAttempts > 0 && !stopGame) {

        for (var i = 0; i < computerRandomArtist.name.length; i++) {

            if (computerRandomArtist.name[i] === this.innerHTML.toUpperCase()) {
                if (this.innerHTML != "-") {

                    document.getElementById("computerGuess" + i).innerHTML = computerRandomArtist.name[i];
                    foundMatch = true;
                    userGuess = userGuess.substr(0, i) + computerRandomArtist.name[i] + userGuess.substr(i + 1);


                }


            }

        }
        if (!foundMatch) {

            countRemainingAttempts--;

        }
        // Populate Results of the Click
        populateResults();
        //Reset the value
        foundMatch = false;

        $(this).fadeOut(500);

    }
}

/**
 * JQuery function to control the carousel.
 * @param {}  - None 
 * @return {} - None 
 */

$(document).ready(function() {
    $('#myCarousel').carousel({
        interval: 2000
    })

    $('#myCarousel').on('slid.bs.carousel', function() {
        //alert("slid");
    });


});
