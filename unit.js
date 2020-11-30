import { levels } from './queries.js';

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