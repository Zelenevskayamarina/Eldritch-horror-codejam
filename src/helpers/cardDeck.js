import {green, brown, blue} from "../data/mythicCards/index"

export function CardDeck() {
  this.cardList = null
  this.initializeCardDeck = function() {
    this.cardList = {
      green: [...green],
      brown: [...brown],
      blue: [...blue]
    }
  }
  this.getCardForStage = function(color, level, count) { 
    const cardList = [] // [{}]
    while (cardList.length !== count) {
      const index = this.cardList[color].findIndex(card => card.difficulty === level) // нахожу индекс, чтобы удалить карту по этому индексу
      if (index == -1) break;
      cardList.push(this.cardList[color][index])
      this.cardList[color].splice(index, 1)
    }
    return cardList;
  }
}
