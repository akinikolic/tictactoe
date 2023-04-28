const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const fieldEls = document.querySelectorAll('[data-field]');
const gameboardEl = document.querySelector('.gameboard');
const modalEl = document.querySelector('.modal');
const restartBtn = document.querySelector('.restart-game');
const messageEl = document.querySelector('.message');
let xTurn;

startGame();
restartBtn.addEventListener('click', startGame);

function startGame() {
    xTurn = true;
    fieldEls.forEach((field) => {
        field.classList.remove('x');
        field.classList.remove('circle');
        field.removeEventListener('click', handleClick);
        // to disable adding X or O multiple times on same field
        field.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    modalEl.classList.remove('show');
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? 'x' : 'circle';
    cell.classList.add(currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        changeTurn();
        setBoardHoverClass();
    }
}

function checkWin(currentClass) {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return fieldEls[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        messageEl.innerText = 'Draw!';
    } else {
        messageEl.innerText = `${xTurn ? 'Player X' : 'Player O'} Wins!`;
    }
    modalEl.classList.add('show');
}

function isDraw() {
    return [...fieldEls].every((field) => {
        return (
            field.classList.contains('x') || field.classList.contains('circle')
        );
    });
}

function changeTurn() {
    xTurn = !xTurn;
}

function setBoardHoverClass() {
    gameboardEl.classList.remove('x');
    gameboardEl.classList.remove('circle');
    if (xTurn) {
        gameboardEl.classList.add('x');
    } else {
        gameboardEl.classList.add('circle');
    }
}
