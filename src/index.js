//Импорт стилей
import './styles/main.scss'

import cardBack from "./assets/mythicCardBackground.png";

import ancientsData from "./data/ancients";


import {
    renderAncientCards
} from "./helpers/ancient"
import {
    generateCardList
} from './helpers/cardList'
import {
    renderLevelList
} from "./helpers/level"
let selectedAncientCard = null;
let selectedLevel = null;
let cardListForGame = null;
let gameStage = 0;

renderAncientCards();

const boardGame = document.querySelector('.board-game');
const shuffleBtn = document.querySelector('.board-game__shuffle');
const currentState = document.querySelector('.current-state')
const cardBackImage = document.querySelector(".deck");
const cardShow = document.querySelector(".last-card");
const firstLevel = document.querySelector('.first-name');
const secondLevel = document.querySelector('.second-name');
const thirdLevel = document.querySelector('.third-name');
const firstGreen = document.getElementById('first-green');
const firstBrown = document.getElementById('first-brown');
const firstBlue = document.getElementById('first-blue');
const secondGreen = document.getElementById('second-green');
const secondBrown = document.getElementById('second-brown');
const secondBlue = document.getElementById('second-blue');
const thirdGreen = document.getElementById('third-green');
const thirdBrown = document.getElementById('third-brown');
const thirdBlue = document.getElementById('third-blue');

boardGame.addEventListener('click', (event) => {
    if (event.target.classList.contains('ancient-card')) {
        chooseAncientCard(event.target);
        
        // event.target.classList.add('active');
        // event.target.classList.add('active-card')
        if(boardGame.classList.contains('active-card')) {
            boardGame.classList.remove('active-card')
        }
        else {
            boardGame.classList.add('active-card')
        }
    }
    if (event.target.classList.contains('board-game__level')) {
        chooseLevel(event.target);        
    }
})

shuffleBtn.addEventListener('click', () => {
    cardListForGame = generateCardList(selectedAncientCard, selectedLevel)
    console.log(cardListForGame, 'list')
    currentState.style.display = 'block';
    cardBackImage.style.backgroundImage = `url(${cardBack})`;
})

function chooseAncientCard(cardBlock) {
    const id = cardBlock.getAttribute('card-id')
    selectedAncientCard = id;
    console.log('You have selected an ancient card:', selectedAncientCard);
    cardListForGame = null;     
    renderLevelList();     
}

function chooseLevel(levelBlock) {
    const levelId = levelBlock.getAttribute('level-id');
    selectedLevel = levelId;
    console.log('You have selected the difficulty level:', selectedLevel);
    renderCardShuffle();
}

function renderCardShuffle() {
    shuffleBtn.style.visibility = "visible"
}

cardBackImage.addEventListener('click', (event) => {
    showCard();
    updateFirstStage();
    updateSecondStage();
    updateThirdStage();     
});


function showCard(cardList) {   
    if(cardListForGame[0].length != 0) {
        cardListForGame[0].sort(() => Math.random() - 0.5);
        cardShow.style.backgroundImage = `url(${cardListForGame[0][0].cardFace})`;   
        cardListForGame[0].shift(); 
        firstLevel.classList.add('active');
        cardShow.style["boxShadow"] = '0 0 7px #fff, 0 0 9px #fff, 0 0 11px #fff, 0 0 13px rgb(210, 118, 184), 0 0 15px rgb(210, 118, 184), 0 0 17px rgb(210, 118, 184),  0 0 19px rgb(210, 118, 184),  0 0 21px rgb(210, 118, 184)'               
    }
    else if(cardListForGame[1].length != 0) {
        cardListForGame[1].sort(() => Math.random() - 0.5);
        cardShow.style.backgroundImage = `url(${cardListForGame[1][0].cardFace})`; 
        cardListForGame[1].shift();
        firstLevel.classList.remove('active');
        secondLevel.classList.add('active');
    }
    else if(cardListForGame[2].length != 0) {
        cardListForGame[2].sort(() => Math.random() - 0.5);
        cardShow.style.backgroundImage = `url(${cardListForGame[2][0].cardFace})`; 
        cardListForGame[2].shift();
        secondLevel.classList.remove('active');
        thirdLevel.classList.add('active');
    }
    else if(cardListForGame[0].length == 0 && cardListForGame[1].length == 0 && cardListForGame[2].length == 0) {
        alert('Bro, game over!')
        cardShow.style.backgroundImage = ``; 
        thirdLevel.classList.remove('active');
        cardShow.style["boxShadow"] = 'none';
    }
}

function updateFirstStage(cardList) {
    let blueCounter = 0;
    let brownCounter = 0;
    let greenCounter = 0;
    let firstStage = cardListForGame[0];

    for (let i = 0; i < firstStage.length; i++) {
        if (firstStage[i].color == 'blue') {
            blueCounter++;
        } else if (firstStage[i].color == 'brown') {
            brownCounter++;
        } else if (firstStage[i].color == 'green') {
            greenCounter++;
        }
    }

    firstBlue.textContent = blueCounter;
    firstBrown.textContent = brownCounter;
    firstGreen.textContent = greenCounter;
}

function updateSecondStage(cardList) {
    let blueCounter = 0;
    let brownCounter = 0;
    let greenCounter = 0;
    let secondStage = cardListForGame[1];

    for (let i = 0; i < secondStage.length; i++) {
        if (secondStage[i].color == 'blue') {
            blueCounter++;
        } else if (secondStage[i].color == 'brown') {
            brownCounter++;
        } else if (secondStage[i].color == 'green') {
            greenCounter++;
        }
    }

    secondBlue.textContent = blueCounter;
    secondBrown.textContent = brownCounter;
    secondGreen.textContent = greenCounter;
}

function updateThirdStage(cardList) {
    let blueCounter = 0;
    let brownCounter = 0;
    let greenCounter = 0;
    let thirdStage = cardListForGame[2];

    for (let i = 0; i < thirdStage.length; i++) {
        if (thirdStage[i].color == 'blue') {
            blueCounter++;
        } else if (thirdStage[i].color == 'brown') {
            brownCounter++;
        } else if (thirdStage[i].color == 'green') {
            greenCounter++;
        }
    }

    thirdBlue.textContent = blueCounter;
    thirdBrown.textContent = brownCounter;
    thirdGreen.textContent = greenCounter;
}