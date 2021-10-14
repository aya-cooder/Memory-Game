// cards array 
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards 
const deck = document.getElementById("cardjs");

//move variable
let moves = 0;
let meter = document.querySelector(".move");

// declare  star icons

const stars = document.querySelectorAll(".fa-star");

 // declare starslist

let starsList = document.querySelectorAll(".star li");

let match = document.getElementsByClassName("match");

// closeicon in modal

 let closeicon = document.querySelector(".close");
  
// declare win

 let win = document.getElementById("Congratulations");

var openedCards = [];


// shuffles cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


document.body.onload = startGame();

// function to start new Game
function startGame(){
 
    openedCards = [];

    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(cell){
            deck.appendChild(cell);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    meter.innerHTML = moves;
    for (var z= 0; z < stars.length; z++){
        stars[z].style.color = "#FFD700";
        stars[z].style.visibility = "visible";
    }
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".time");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

//toggles open to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

//add opened cards to list and check if cards match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        movemeter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

// when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// when cards unmatch
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1000);
}

// when cards disable
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// when cards enable
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < match.length; i++){
            match[i].classList.add("disabled");
        }
    });
}

// count moves
function movemeter(){
    moves++;
    meter.innerHTML = moves;

    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }

    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".time");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

//congratulations when all cards match, show modal ,moves, time , rating
function congratulations(){
    if (match.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        win.classList.add("show");

        var starRating = document.querySelector(".stars1").innerHTML;

        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        
        closewin();
};
}

// for user to closewin 
function closewin(){
    closeicon.addEventListener("click", function(){
        win.classList.remove("show");
        startGame();
    });
}

// for user to play Again 
function playAgain(){
    win.classList.remove("show");
    startGame();
}


for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
