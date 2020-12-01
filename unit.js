import { game, gameBoard } from './queries.js';
import { icons } from './icons.js';
//jeżeli w LocalStorage będzie napisane w ile ruchów użytkwnik wygrał, należy to wyświetlić
//a jeśli nie ma to nie należy wyświetlać

//po kliknięciu na przycisk pobrać ilość kart do wyświetlenia na planszy

const test = {
    8: 23,
    12: 0,
    16:18,
    20: 0,
    24: 25
}
localStorage.setItem('test', JSON.stringify(test) );

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

export function getIcons(number){
    const arrayOfIcons = icons.filter((item, index) => index < number/2)
    .reduce(function (res,current){
        return res.concat([current,current]);
    },[]);
    return shuffle(arrayOfIcons);
}

// Read and show records saved in localStorage
//DONE
export function showRecords(){
    const locStorage = Object.entries(JSON.parse(localStorage.getItem('test')));
    locStorage.filter(item => item[1] > 0)
        .forEach(record => {
            const levelBox = document.querySelector(`[data-level='${record[0]}']`);
            levelBox.querySelector('p').classList.remove('hideRecord');
            levelBox.querySelector('.amount').textContent = `${record[1]}`
    })
}

//After clicking on one of few levels show section with cards and hide with levels to pick
export function displaySection(hideSection, showSection){
    hideSection.style.display = 'none';
    showSection.style.display = 'flex';
}

export function createBoard(amountOfCards, icons) {
    gameBoard.innerHTML = '';
    for(let i = 0; i < amountOfCards; i++){
        gameBoard.insertAdjacentElement('afterbegin', createCard(icons[i]))
    }
}

function createCard( {animal, icon} ){
    const button = document.createElement("button");
    button.setAttribute("animal", `${animal}`)
    button.classList.add('card');
    const markup = `<div class="card__face card__face-front"></div>
    <div class="card__face card__face-back">
        ${icon}
    </div>`
    button.insertAdjacentHTML("afterbegin",markup)
    console.log(button)
    return button;
}