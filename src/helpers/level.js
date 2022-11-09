import difficulties from "../data/difficulties";

export function renderLevelList() {
    const levelContainer = document.querySelector('.board-game__levels');
    levelContainer.innerHTML = "";
    difficulties.forEach(({id, name}) => {
        levelContainer.append(createLevel(id, name));        
    }) 
}

function createLevel(id, name) {
    const level = document.createElement('div');
    level.classList.add('board-game__level');
    level.setAttribute('level-id',id);
    level.innerHTML = name; 
    return level;    
}



