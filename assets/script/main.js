const board = document.getElementById('board');
const player = {
    one: 'x',
    two: 'o'
};
const winPositions = [
    ['A1', 'A2', 'A3'],
    ['B1', 'B2', 'B3'],
    ['C1', 'C2', 'C3'],
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
    ['A3', 'B3', 'C3'],
    ['A1', 'B2', 'C3'],
    ['A3', 'B2', 'C1'],
];

let playCount = 0;
let playerOne = [];
let playerTwo = [];

document.getElementById('button').addEventListener('click', () => {
    playCount = 0;
    playerOne = [];
    playerTwo = [];
    a1 = document.getElementById('A1');
    a1.innerHTML = '';
    a1.style.color = 'black';

    a2 = document.getElementById('A2');
    a2.innerHTML = '';
    a2.style.color = 'black';

    a3 = document.getElementById('A3');
    a3.innerHTML = '';
    a3.style.color = 'black';

    b1 = document.getElementById('B1');
    b1.innerHTML = '';
    b1.style.color = 'black';

    b2 = document.getElementById('B2');
    b2.innerHTML = '';
    b2.style.color = 'black';

    b3 = document.getElementById('B3');
    b3.innerHTML = '';
    b3.style.color = 'black';

    c1 = document.getElementById('C1');
    c1.innerHTML = '';
    c1.style.color = 'black';

    c2 = document.getElementById('C2');
    c2.innerHTML = '';
    c2.style.color = 'black';

    c3 = document.getElementById('C3');
    c3.innerHTML = '';
    c3.style.color = 'black';

    document.getElementById('winner').innerHTML = '';

    document.getElementById('h3-winner').style.visibility = 'hidden';
    document.getElementById('h3-velha').style.visibility = 'hidden';

    document.getElementById('modal').style.display = 'none';
});

board.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (!checkClickedCel(clickedElement.id)) return;
    
    playCount++;

    playCount % 2 !== 0 
        ? clickedElement.innerHTML = player.one 
        : clickedElement.innerHTML = player.two;

    if (checkEndGame(playCount)) {
        document.getElementById('h3-velha').style.visibility = 'visible';
        document.getElementById('modal').style.display = 'flex';   
        return;
    }

    win = checkWin();

    if (win.length > 0) {
        win.forEach(element => {
            let elementHtml = document.getElementById(element);

            elementHtml.style.color = 'red';
        });

        document.getElementById('h3-winner').style.visibility = 'visible';

        document.getElementById('winner').innerHTML = playCount % 2 !== 0 ? '1' : '2';
        document.getElementById('modal').style.display = 'flex';
    };
});

const checkEndGame = (playCount) => playCount == 9;

function checkClickedCel (name) {
    let duplicateClick = false;

    playerOne.forEach(elementOne => {
        if (elementOne === name) duplicateClick = true;
    });

    playerTwo.forEach(elementTwo => {
        if (elementTwo === name) duplicateClick = true;
    });

    if (duplicateClick) return false;

    playCount % 2 === 0 
        ? playerOne.push(name) 
        : playerTwo.push(name);

    return true;
}

function checkWin () {
    const player = playCount % 2 !== 0 ? 1 : 2;
    let winnerPosition = [];

    if (player === 1) {
        winPositions.forEach(element => {
            let positionWinChecked = [];

            element.forEach(winElement => {
                playerOne.forEach(playerElement => {
                    if (winElement == playerElement) positionWinChecked.push(winElement);
                });
            });

            if (positionWinChecked.length == 3) winnerPosition = positionWinChecked;
        });
    }

    if (player === 2) {
        winPositions.forEach(element => {
            let positionWinChecked = [];

            element.forEach(winElement => {
                playerTwo.forEach(playerElement => {
                    if (winElement == playerElement) positionWinChecked.push(winElement);
                });
            });

            if (positionWinChecked.length == 3) winnerPosition = positionWinChecked;
        });
    }
    
    return winnerPosition;
}
