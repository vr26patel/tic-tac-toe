const board = document.getElementsByClassName('board')[0];
const squares = document.getElementsByClassName('square');
const title = document.getElementsByClassName('title')[0];
const players = ['X', 'O'];
let currentPlayer = players[0];

const turn = document.createElement('h2');
turn.textContent = 'Player ❌\'s turn';
turn.style.color = 'aliceblue';
turn.style.textAlign = 'center';
turn.style.fontSize = '29px';
title.parentNode.insertBefore(turn, title.nextElementSibling);

const winningcombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function checkWin(){
    for (let i = 0; i < winningcombination.length; i++){
        const [a, b, c] = winningcombination[i];
        if(
            squares[a].textContent === currentPlayer &&
            squares[b].textContent === currentPlayer &&
            squares[c].textContent === currentPlayer){
                winningBoxes(a, b, c);
                disableBoard();
                return true;
        }
    }
    return false
}


function winningBoxes(a, b, c){
    squares[a].style.backgroundColor = '#f107ca';
    squares[b].style.backgroundColor = '#f107ca';
    squares[c].style.backgroundColor = '#f107ca';
}

function disableBoard(){
    for(let i = 0; i < squares.length; i++){
        squares[i].style.pointerEvents = 'none';
    }
}

function checkTie(){
    for(let i = 0; i < squares.length; i++){
        if(squares[i].textContent === ''){
            return false;
        }
    }
    return true;
}

function restartButton(){
    for(let i = 0; i < squares.length; i++){
        squares[i].textContent = '';
        squares[i].style.pointerEvents = 'auto';
        squares[i].style.backgroundColor = '';
    }
    enableBoard();
    turn.textContent = 'Player ❌\'s turn';
    currentPlayer = players[0];
}



for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {

        if(squares[i].textContent !== ''){
            return;
        }

        squares[i].textContent = currentPlayer;

        if(checkWin()){
            turn.textContent = `Game Over! Player ${currentPlayer === 'X' ? '❌' : '⭕'} wins!`;
            return;
        }
        if(checkTie()){
            turn.textContent = 'Game Over! It\'s a tie!';
            return;
        }

        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];

        if(currentPlayer == players[0]){
            turn.textContent = 'Player ❌\'s turn';
        }
        else{
            turn.textContent = 'Player ⭕\'s turn';
        }
    });
}4