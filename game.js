var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

for (var i = 0; i < document.querySelectorAll(".btn").length; i++) // when a button is clicked
{

    document.querySelectorAll("button")[i].addEventListener("click", function () {

        // Inside the handler, a new variable is created called userChosenColour to store the id of the button that got clicked.

        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        // checkAnswer() is called after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
        checkAnswer(userClickedPattern.length - 1);
    });
}

document.addEventListener("keydown", function (event) { // event occurs when user presses a key

    if (!started) {
        document.querySelector("#level-title").textContent = "Level " + level;
        nextSequence();
        started = true;
    }

})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            //  extSequence() is called after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");

        playSound("wrong");

        document.querySelector("body").classList.add("game-over");
        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200); // here 100 is 100 mili sec

        document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

        startOver(); // called when user loses
    }
}

function nextSequence() {

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    document.querySelector("#level-title").textContent = "Level " + level;

    // a random colour is choosen and pushed into the gamePattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // the newly added colour is now shown to the player
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    var activeButton = document.querySelector("." + currentColour);
    activeButton.classList.add("pressed");

    // To make it look like an animation, we delay the remove class function for some time using the below statement

    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100); // here 100 is 100 mili sec
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}