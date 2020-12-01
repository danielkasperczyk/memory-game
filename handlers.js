import { getIcons, displaySection, createBoard } from './unit.js'
import { menu, game } from './queries.js';
//wybiera poziom bazując na data set
// tworzy plansze zgodnie z wybranym poziomem
export function pickLevel(e){
    const amountOfCards = e.currentTarget.dataset.level
    const icons = getIcons(amountOfCards);
    displaySection(menu, game);
    createBoard(amountOfCards, icons)
}

//GRA
//nadać karcie klase z animacja odwracania
//maksymalnie mogą być tylko dwie karty odwrócone
//jeżeli uzytkonik znajdzie dwie takie same karty zostaną one na stałe odwrócone ikono do przodu
//za każde znalezienie dwóch tych samych kart użytkownik dostanie punkt
//za kazdę odwrócenie kart użytkownikowi dodaje się 1 ruch
//użytkownik ma możliwość opuszczenia gry

//MODAL
//gra zakończy się jeżeli wszystkie karty zostaną odwrócone
//jeżeli użytkownik zakończy gre wyświetli się modal z ilością wykonanych ruchów
//jeżeli w localStorage istnieje zapisany rekord zostanie on wyświetlony
//jeżeli użytkownik uzyska lepszy wynik zostanie o tym poinformowany
//rekordy akutalizują się w localStorage