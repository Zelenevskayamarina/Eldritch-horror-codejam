import ancientsData from "../data/ancients";
import {
  CardDeck
} from "./cardDeck";

export function generateCardList(ancientCard, level) {
  switch (level) {
    case 'very-easy':
      return veryEasyLevelCardList(ancientCard);
    case 'easy':
      return easyLevelCardList(ancientCard);
    case 'normal':
      return normalLevelCardList(ancientCard);
    case 'hard':
      return hardLevelCardList(ancientCard);
    case 'very-hard':
      return veryHardLevelCardList(ancientCard);
  }
}

const firstGreen = document.getElementById('first-green');
const firstBrown = document.getElementById('first-brown');
const firstBlue = document.getElementById('first-blue');
const secondGreen = document.getElementById('second-green');
const secondBrown = document.getElementById('second-brown');
const secondBlue = document.getElementById('second-blue');
const thirdGreen = document.getElementById('third-green');
const thirdBrown = document.getElementById('third-brown');
const thirdBlue = document.getElementById('third-blue');

function getCardCount(ancient) {
  const cardCount = {
    green: 0,
    blue: 0,
    brown: 0
  }
  const ancientInfo = ancientsData.find(item => item.id === ancient);
  const ancientCardInfo = [ancientInfo.firstStage, ancientInfo.secondStage, ancientInfo.thirdStage];

  firstGreen.textContent = `${ancientInfo.firstStage.green}`;
  firstBrown.textContent = `${ancientInfo.firstStage.brown}`;
  firstBlue.textContent = `${ancientInfo.firstStage.blue}`;
  secondGreen.textContent = `${ancientInfo.secondStage.green}`;
  secondBrown.textContent = `${ancientInfo.secondStage.brown}`;
  secondBlue.textContent = `${ancientInfo.secondStage.blue}`;
  thirdGreen.textContent = `${ancientInfo.thirdStage.green}`;
  thirdBrown.textContent = `${ancientInfo.thirdStage.brown}`;
  thirdBlue.textContent = `${ancientInfo.thirdStage.blue}`;

  ancientCardInfo.forEach(item => {
    Object.entries(item).forEach(([color, count]) => {
      cardCount[color] += count;
    })
  })
  return cardCount;
}

function veryEasyLevelCardList(ancient) {
  const cardRequirements = getCardCount(ancient) // azathoth { green: 5, blue: 2, brown: 9 }
  const resultCardList = []
  const cardDesk = new CardDeck()
  cardDesk.initializeCardDeck()
  Object.entries(cardRequirements).forEach(([color, count]) => {
    const currentCountList = cardDesk.getCardForStage(color, 'easy', count)
    if (currentCountList.length !== count) { // если карт не хватает
      currentCountList.push(...cardDesk.getCardForStage(color, 'normal', count - currentCountList.length)) // нужно добрать общее кол-во минус то, что уже взяли и добавить в массив
    }
    resultCardList.push(...currentCountList);
  })
  
  return shuffleCardsForStages(resultCardList, ancient)
}

function easyLevelCardList(ancient) {
  const cardRequirements = getCardCount(ancient);
  const resultCardList = [];
  const cardDesk = new CardDeck();
  cardDesk.initializeCardDeck();
  Object.entries(cardRequirements).forEach(([color, count]) => {
    const currentCountListFirst = cardDesk.getCardForStage(color, 'easy', count);
    const currentCountListSecond = cardDesk.getCardForStage(color, 'normal', count);
    resultCardList.push(...currentCountListFirst, ...currentCountListSecond);
  })
  return shuffleCardsForStages(resultCardList, ancient);
}

function normalLevelCardList(ancient) {
  const cardRequirements = getCardCount(ancient);
  const resultCardList = [];
  const cardDesk = new CardDeck();
  cardDesk.initializeCardDeck();
  Object.entries(cardRequirements).forEach(([color, count]) => {
    const currentCountListFirst = cardDesk.getCardForStage(color, 'hard', count);
    const currentCountListSecond = cardDesk.getCardForStage(color, 'normal', count);
    const currentCountListThird = cardDesk.getCardForStage(color, 'easy', count);
    resultCardList.push(...currentCountListFirst, ...currentCountListSecond, ...currentCountListThird);
  })
  return shuffleCardsForStages(resultCardList, ancient);
}

function hardLevelCardList(ancient) {
  const cardRequirements = getCardCount(ancient);
  const resultCardList = [];
  const cardDesk = new CardDeck();
  cardDesk.initializeCardDeck();
  Object.entries(cardRequirements).forEach(([color, count]) => {
    const currentCountListFirst = cardDesk.getCardForStage(color, 'normal', count);
    const currentCountListSecond = cardDesk.getCardForStage(color, 'hard', count);
    resultCardList.push(...currentCountListFirst, ...currentCountListSecond);
  })
  return shuffleCardsForStages(resultCardList, ancient);
}

function veryHardLevelCardList(ancient) {
  const cardRequirements = getCardCount(ancient);
  const resultCardList = [];
  const cardDesk = new CardDeck();
  cardDesk.initializeCardDeck();
  Object.entries(cardRequirements).forEach(([color, count]) => {
    const currentCountList = cardDesk.getCardForStage(color, 'hard', count);
    if (currentCountList.length !== count) { 
      currentCountList.push(...cardDesk.getCardForStage(color, 'normal', count - currentCountList.length));
    }
    resultCardList.push(...currentCountList);
  })
  return shuffleCardsForStages(resultCardList, ancient);
}

function shuffleCardsForStages(cardList, ancient) {
  let result = []
  const ancientInfo = ancientsData.find(item => item.id === ancient);
  const ancientCardList = [ancientInfo.firstStage, ancientInfo.secondStage, ancientInfo.thirdStage];
  ancientCardList.forEach((stage) => {
    const stageCardList = [];
    Object.entries(stage).forEach(([color, count]) => {
      let i = count;
      while (i != 0) {
        const index = getRandomIndex(0, cardList.length - 1);
        const card = cardList[index];
        if (card.color == color) {
          stageCardList.push(card);
          cardList.splice(index, 1);
          i--;
        }
      }
    })
    result.push(stageCardList);
  })
  return result;
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (min - max) + max);
}
