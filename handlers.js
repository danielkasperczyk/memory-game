import { getIcons, displaySection, createBoard, checkCards } from './unit.js'
import { menu, game, exitButton } from './queries.js';
//wybiera poziom bazując na data set
// tworzy plansze zgodnie z wybranym poziomem
export function pickLevel(e){
    const amountOfCards = e.currentTarget.dataset.level
    const icons = getIcons(amountOfCards);
    displaySection(menu, game);
    createBoard(amountOfCards, icons)
}

//GRA
export function handleCardClick(e){
    const card = e.currentTarget;
    card.classList.add('card--flip');
    checkCards();
}

exitButton.addEventListener('click', function(){
    game.style.display = 'none';
    menu.style.display = 'flex';
})
//użytkownik ma możliwość opuszczenia gry

//MODAL
//gra zakończy się jeżeli wszystkie karty zostaną odwrócone
//jeżeli użytkownik zakończy gre wyświetli się modal z ilością wykonanych ruchów
//jeżeli w localStorage istnieje zapisany rekord zostanie on wyświetlony
//jeżeli użytkownik uzyska lepszy wynik zostanie o tym poinformowany
//rekordy akutalizują się w localStorage