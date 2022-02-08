
document.addEventListener('DOMContentLoaded', () => {
    menuForm = document.querySelector("#menu_form");
    menuForm.addEventListener('submit', (event) => {
        event.preventDefault()

    const chooseWidth = document.querySelector('#gameboard_width');
    const chosenWidth = chooseWidth.options[chooseWidth.selectedIndex].value;
    const columnNumber = parseInt(chosenWidth);

    const chooseHeight = document.querySelector('#gameboard_height');
    const chosenHeight = chooseHeight.options[chooseHeight.selectedIndex].value;
    const rowNumber = parseInt(chosenHeight);

    const replayIcon = document.querySelector('#replay_icon');
    const menuIcon = document.querySelector('#menu_icon');

    document.querySelector('.current_turn').style.display = 'inline';
    document.querySelector('.menu').style.display = 'none';
    replayIcon.style.display = 'inline-block';
    menuIcon.style.display = 'inline-block';

    // create game grid
    gameGrid = document.querySelector('.grid');
    gameGrid.style.width = '80vmin';

    for (let i=0; i<columnNumber*rowNumber; i++)
    {
        let div = document.createElement("div");
        div.style.width = (80/columnNumber - 1) + 'vmin';
        div.style.height = (80/columnNumber - 1) + 'vmin';
        div.style.border = '0.5vmin solid #1F1D36';
        // div.innerHTML = i;
        gameGrid.append(div);
    }
    for (let i=0; i<columnNumber; i++)
    {
        let div = document.createElement("div");
        div.classList.add('taken', 'helper')
        gameGrid.append(div);
    }

    const squares = document.querySelectorAll('.grid div');
    displayCurrentPlayer = document.querySelector('#displayCurrentPlayer');
    let currentPlayer = 1;

    for (let i=0; i< squares.length; i++)
    {
        squares[i].onclick = () => {
            if (squares[i+columnNumber].classList.contains('taken') && !(squares[i].classList.contains('player_one') || squares[i].classList.contains('player_two') ))
            {
                squares[i].classList.add('taken');
                if (currentPlayer == 1)
                {
                    squares[i].classList.add('player_one');
                    currentPlayer = 2;
                    displayCurrentPlayer.innerHTML = currentPlayer;

                } else if (currentPlayer == 2) {
                    squares[i].classList.add('player_two')
                    currentPlayer = 1;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                }
            } else {
                alert("Tutaj nie wolno!");
            }
            let result = check_win();
            if (result == 1 || result == 2)
            {
                alert('Game over. Wygrał gracz: ' + result);
                goToMenu();
            }
        }
    }

    function check_win() {
        for (let i=0; i<squares.length-columnNumber; i++)
        {
            let winner = 0;

            // CHECK PLAYER ONE

            // check in column
            if (squares[i].classList.contains('player_one') &&
            squares[i+columnNumber].classList.contains('player_one') &&
            squares[i+columnNumber*2].classList.contains('player_one') &&
            squares[i+columnNumber*3].classList.contains('player_one'))
            {
                winner = 1;
            }

            if (i%columnNumber + 4 <= columnNumber)
            {
                // check in row
                if (squares[i].classList.contains('player_one') &&
                squares[i+1].classList.contains('player_one') &&
                squares[i+2].classList.contains('player_one') &&
                squares[i+3].classList.contains('player_one'))
                {
                    winner = 1;
                }

                // check diagonal 1
                if (squares[i].classList.contains('player_one') &&
                squares[i+(columnNumber+1)].classList.contains('player_one') &&
                squares[i+(columnNumber+1)*2].classList.contains('player_one') &&
                squares[i+(columnNumber+1)*3].classList.contains('player_one'))
                {
                    winner = 1;
                }
            }
            if (i%columnNumber - 3 >= 0)
            {
                // check diagonal 2
                if (squares[i].classList.contains('player_one') &&
                squares[i+(columnNumber-1)].classList.contains('player_one') &&
                squares[i+(columnNumber-1)*2].classList.contains('player_one') &&
                squares[i+(columnNumber-1)*3].classList.contains('player_one'))
                {
                    winner = 1;
                }
            }

            // CHECK PLAYER TWO

            // check in column
            if (squares[i].classList.contains('player_two') &&
            squares[i+columnNumber].classList.contains('player_two') &&
            squares[i+columnNumber*2].classList.contains('player_two') &&
            squares[i+columnNumber*3].classList.contains('player_two'))
            {
                winner = 2;
            }

            if (i%columnNumber + 4 <= columnNumber)
            {
                // check in row
                if (squares[i].classList.contains('player_two') &&
                squares[i+1].classList.contains('player_two') &&
                squares[i+2].classList.contains('player_two') &&
                squares[i+3].classList.contains('player_two'))
                {
                    winner = 2;
                }

                // check diagonal 1
                if (squares[i].classList.contains('player_two') &&
                squares[i+(columnNumber+1)].classList.contains('player_two') &&
                squares[i+(columnNumber+1)*2].classList.contains('player_two') &&
                squares[i+(columnNumber+1)*3].classList.contains('player_two'))
                {
                    winner = 2;
                }
            }
            if (i%columnNumber - 3 >= 0)
            {
                // check diagonal 2
                if (squares[i].classList.contains('player_two') &&
                squares[i+(columnNumber-1)].classList.contains('player_two') &&
                squares[i+(columnNumber-1)*2].classList.contains('player_two') &&
                squares[i+(columnNumber-1)*3].classList.contains('player_two'))
                {
                    winner = 2;
                }
            }


            if (winner == 1) {
                return 1;
            } else if (winner == 2) {
                return 2;
            }
        }
        return 0;
    }

    replayIcon.addEventListener('click', () => {
        resetGame()
    })

    menuIcon.addEventListener('click', () => {
        goToMenu()
    })

    function goToMenu() {
        for (let i=0; i< squares.length; i++)
        {
            squares[i].remove();
        }
        currentPlayer = 1;
        displayCurrentPlayer.innerHTML = currentPlayer;
        document.querySelector('.current_turn').style.display = 'none';
        document.querySelector('.menu').style.display = 'block';
        replayIcon.style.display = 'none';
        menuIcon.style.display = 'none';
    }

    function resetGame() {
        for (let i=0; i< squares.length-columnNumber; i++)
        {
            squares[i].classList.remove('player_one', 'player_two', 'taken');
        }
        currentPlayer = 1;
        displayCurrentPlayer.innerHTML = currentPlayer;

    }

    })
})
