const levels = Array.from(document.querySelectorAll('.levels'));

const test = {
    4: 6,
    8: 10,
    12: 14,
    16:20,
    20: 27
}
localStorage.setItem('test', JSON.stringify(test) );

function showRecords(){
    const storage = JSON.parse(localStorage.getItem('test'));
    const isStorageEmpty = Object.values(storage).filter(val => val > 0)

    if(isStorageEmpty.length > 0){
        console.log(storage);
    }
}
window.addEventListener('load', showRecords);
//jeżeli w LocalStorage będzie napisane w ile ruchów użytkwnik wygrał, należy to wyświetlić
//a jeśli nie ma to nie należy wyświetlać

//po kliknięciu na przycisk pobrać ilość kart do wyświetlenia na planszy