
document.addEventListener('DOMContentLoaded', () => {

    menuForm = document.getElementById("menu_form");
    menuForm.addEventListener('submit', (event) => {
        event.preventDefault()
    const displayCurrentPlayer = document.querySelector('#displayCurrentPlayer');
    const chooseWidth = document.getElementById('gameboard_width');
    const chosenWidth = chooseWidth.options[chooseWidth.selectedIndex].value;
    const columnNumber = parseInt(chosenWidth);

    const chooseHeight = document.getElementById('gameboard_height');
    const chosenHeight = chooseHeight.options[chooseHeight.selectedIndex].value;
    const rowNumber = parseInt(chosenHeight);

    const replayIcon = document.getElementById('replay_icon');
    const menuIcon = document.getElementById('menu_icon');
    const timerBar = document.getElementById("timerBar");
    const modal = document.querySelector(".modal")
    const popUp = document.getElementById("pop-up")
    const menu = document.querySelector(".menu")

    let gameState="playing";
   

    document.querySelector('.current_turn').style.display = 'inline';
    document.querySelector('.menu').style.display = 'none';
    replayIcon.style.display = 'inline-block';
    menuIcon.style.display = 'inline-block';
    timerBar.style.visibility = 'visible';
    

    // create game grid
    const gameGrid = document.querySelector('.grid');
    gameGrid.style.width = '50vmin';


    for (let i=0; i<=rowNumber; i++) {
        const rowEl = document.createElement("tr")
        for (let j=0; j<columnNumber; j++) {
            const cell = document.createElement("td")
            const div = document.createElement("div")
            div.style.width = (50/columnNumber) -1 + 'vmin';
            div.style.height = (50/columnNumber) -1 + 'vmin';
            div.style.border = '1px solid white';
            if (i === rowNumber) {
                div.classList.add('taken', 'helper')
            }
            cell.append(div);
            rowEl.append(cell);
        }
        gameGrid.append(rowEl)
    }

    const squares = document.querySelectorAll('.grid div');

    let currentPlayer = 1;
    let numberOfTakenFields = 0;
    const timeLimit = 5000;

    const originalTimerWidth = 50;
    let timerWidth = originalTimerWidth;
    timerBar.style.width = timerWidth + "%";

    let timerFunc = window.setTimeout(timeOver, timeLimit);
    let timerDisplayFunc = window.setInterval(timerDisplay, 25);   

    function timeOver() {
        if (gameState === "playing") {
            modal.style.display = 'block';
            gameState = 'ended'
            popUp.firstElementChild.innerText = "Time's up!";
            if (currentPlayer == 1)
                popUp.children[1].innerText = "Player 2 wins! :)"
            else
                popUp.children[1].innerText = "Player 1 wins! :)"

            const button = document.createElement('h3')
            button.innerHTML = "Finish"
            popUp.appendChild(button)


            button.addEventListener('click', () => {
                modal.style.display = 'none';
                popUp.removeChild(button)
                resetTimer();
                goToMenu();
                })
        }
    }

    function resetTimer() {
        clearTimeout(timerFunc);
        clearInterval(timerDisplayFunc);
        timerWidth = originalTimerWidth;
        timerBar.style.width = timerWidth + "%";
    }

    function timerDisplay() {
        timerWidth -= 0.005 * originalTimerWidth;
        timerBar.style.width = timerWidth + "%";
    }

    for (let i=0; i< squares.length; i++)
    {
        squares[i].onclick = () => {

            if (squares[i+columnNumber].classList.contains('taken') && !(squares[i].classList.contains('player_one') || squares[i].classList.contains('player_two') ))
            {
                squares[i].classList.add('taken');

                resetTimer();
                timerFunc = window.setTimeout(timeOver, timeLimit);
                timerDisplayFunc = window.setInterval(timerDisplay, 25); 

                if (currentPlayer == 1)
                {
                    squares[i].classList.add('player_one');
                    currentPlayer = 2;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                    numberOfTakenFields++;
                    // console.log(numberOfTakenFields);
                } else if (currentPlayer == 2) {
                    squares[i].classList.add('player_two')
                    currentPlayer = 1;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                    numberOfTakenFields++;
                    // console.log(numberOfTakenFields);
                }
            } else {
                modal.style.display = 'block';
                timerBar.style.visibility = 'hidden';
                gameState = "paused"
                popUp.firstElementChild.innerText = "Illegal move";
                popUp.children[1].innerText = "Your circle cannot float in the air :)"

                const button = document.createElement('h3')
                button.innerText = "Continue"
                popUp.appendChild(button)


                button.addEventListener('click', () => {
                    resetTimer();
                    timerFunc = window.setTimeout(timeOver, timeLimit);
                    timerDisplayFunc = window.setInterval(timerDisplay, 25);
                    modal.style.display = 'none';
                    gameState = "playing"
                    timerBar.style.visibility = 'visible';
                    popUp.removeChild(button)
                })

            }
            let result = check_win();
            if (result == 1 || result == 2 || result == 3)
            {
                modal.style.display = 'block';
                timerBar.style.visibility = 'hidden';
                gameState = 'ended'
                popUp.firstElementChild.innerText = "Game Over!";

                if (result == 1 || result == 2)
                {
                    popUp.children[1].innerText = `Player ${result} won!`
                } else {
                    popUp.children[1].innerText = "It's a draw :)"
                }

                let button = document.createElement('h3')
                button.innerText = "Finish"
                popUp.appendChild(button)

                button.addEventListener('click', () => {
                    modal.style.display = 'none';
                    resetTimer();
                    popUp.removeChild(button)
                    goToMenu();
                })


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
            
            // CHECK FOR TIE IF ALL FIELDS ARE TAKEN

            if (numberOfTakenFields == columnNumber*rowNumber)
                winner = 3;

            if (winner == 1) {
                return 1;
            } else if (winner == 2) {
                return 2;
            } else if (winner == 3) {
                return 3;
            }
        }
        return 0;
    }

    replayIcon.addEventListener('click', () => {
        resetGame();
        
    })

    menuIcon.addEventListener('click', () => {
        resetTimer();
        goToMenu()
    })

    function goToMenu() {
        gameState = "menu"
        const rows = document.querySelectorAll('tr')
        for (let i=0; i< rows.length; i++)
        {
            rows[i].remove();
        }
        currentPlayer = 1;
        displayCurrentPlayer.innerHTML = currentPlayer;
        document.querySelector('.current_turn').style.display = 'none';
        menu.style.display = 'block';
        timerBar.style.visibility = 'hidden';
        replayIcon.style.display = 'none';
        menuIcon.style.display = 'none';
    }

    function resetGame() {
        gameState = "playing"
        for (let i=0; i< squares.length-columnNumber; i++)
        {
            squares[i].classList.remove('player_one', 'player_two', 'taken');
        }
        currentPlayer = 1;
        displayCurrentPlayer.innerHTML = currentPlayer;
        resetTimer();
        timerFunc = window.setTimeout(timeOver, timeLimit);
        timerDisplayFunc = window.setInterval(timerDisplay, 25); 
    }

    })
})
