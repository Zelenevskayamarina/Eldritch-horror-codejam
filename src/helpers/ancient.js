import ancients from "../assets/Ancients";
export function renderAncientCards() {
    const ancientContainer = document.querySelector('.board-game__ancients');
    Object.entries(ancients).forEach(([id, image]) => {
        ancientContainer.append(createCard(id, image));
    }) 
}

function createCard(id, img) {
    const card = document.createElement('div');;
    card.classList.add('ancient-card');
    card.setAttribute('card-id',id);
    card.style.backgroundImage = `url(${img})`;
    return card;
}