import {  gameBoard, points, moves, modal, modalInner } from './queries.js';
import { icons } from './icons.js';
import { handleCardClick } from './handlers.js';
//jeżeli w LocalStorage będzie napisane w ile ruchów użytkwnik wygrał, należy to wyświetlić
//a jeśli nie ma to nie należy wyświetlać

//po kliknięciu na przycisk pobrać ilość kart do wyświetlenia na planszy
export const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));



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


export function showRecords(){
    if(localStorage.getItem('records')){
        Object.entries(JSON.parse(localStorage.getItem('records'))).filter(item => item[1] > 0)
        .forEach(record => {
            const levelBox = document.querySelector(`[data-level='${record[0]}']`);
            levelBox.querySelector('p').classList.remove('hideRecord');
            levelBox.querySelector('.amount').textContent = `${record[1]}`
    })
    }
}

export function displaySection(hideSection, showSection){
    hideSection.style.display = 'none';
    showSection.style.display = 'flex';
}

export function createBoard(amountOfCards, icons) {
    gameBoard.innerHTML = '';
    points.textContent = '0';
    moves.textContent = '0';
    for(let i = 0; i < amountOfCards; i++){
        gameBoard.insertAdjacentElement('afterbegin', createCard(icons[i]))
    }
    Array.from(document.querySelectorAll('.card'))
            .forEach(card => card.addEventListener('click', handleCardClick));

        
}

function createCard( {animal, icon} ){
    const button = document.createElement("button");
    button.setAttribute("data-animal", `${animal}`)
    button.classList.add('card');
    const markup = `<div class="card__face card__face-front"></div>
    <div class="card__face card__face-back">
        ${icon}
    </div>`
    button.insertAdjacentHTML("afterbegin",markup)
    return button;
}

export async function checkCards(){
    let animal1, animal2;
    const allCards = Array.from(document.querySelectorAll('.card'));
    const cards = Array.from(document.querySelectorAll('.card--flip'));
    const cardsArray = cards.map(card => card.closest('.card'));
    if(cardsArray.length === 2) {
        animal1 = cardsArray[0].dataset.animal;
        animal2 = cardsArray[1].dataset.animal;
        if(animal1 === animal2){
            console.log(animal1 === animal2)
            cardsArray.forEach(card => {
                card.classList.remove('card--flip')
                card.classList.add('card--stay');
                
            })
            countScore(true)    
        }
        else{
            countScore(false)
            allCards.forEach(card =>card.disabled=true)
            await wait(1000);
            allCards.forEach(card =>card.disabled=false)
            cardsArray.forEach(card => {
                card.classList.remove('card--flip');
            })
            
        }
    }
}

function countScore(same){
    let numPoints = parseInt(points.textContent);
    let numMoves = parseInt(moves.textContent);

    if(same === true){
        points.textContent = (numPoints += 1).toString();
        moves.textContent = (numMoves += 1).toString()
    }
    else {
        console.log(numMoves)
        moves.textContent = (numMoves +=1).toString()
    }
}

export async function endGame(){
    const cards = Array.from(document.querySelectorAll('.card')).length;
    if((cards / 2) ===parseInt(points.textContent)){
        saveInLocal(parseInt(cards), parseInt(moves.textContent));
        modal.style.display = 'flex';
        await wait (10);
        modalInner.classList.add('show');
    }
}


export function saveInLocal(level, moves){
    const records = JSON.parse(localStorage.getItem('records'));
    if(records){
        records[level] > moves ? records[level] = moves : null;   
        localStorage.removeItem('records');
        localStorage.setItem("records", JSON.stringify(records));     
    }
    else {
        localStorage.setItem("records", JSON.stringify({[level]: moves})) 
    }
    showRecords();
}