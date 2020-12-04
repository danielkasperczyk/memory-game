import { getIcons, displaySection, createBoard, checkCards, endGame, wait } from './unit.js'
import { menu, game, exitButton, modalExit, modal, modalInner } from './queries.js';
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
    endGame();
}

exitButton.addEventListener('click', e => displaySection(game, menu))
modalExit.addEventListener('click', async e => {
    modalInner.classList.remove('show');
    await wait(500);
    modal.style.display = 'none';
    displaySection(game, menu);
})
//użytkownik ma możliwość opuszczenia gry

//MODAL
//gra zakończy się jeżeli wszystkie karty zostaną odwrócone
//DONE
//jeżeli użytkownik zakończy gre wyświetli się modal z ilością wykonanych ruchów
//MODAL SIĘ WYŚWIETLA, NALEŻY WYŚWIETLIĆ ILOŚĆ RUCHÓW I DOTYCHCZASOWY REKORD