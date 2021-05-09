const blocks = document.querySelectorAll(".block");
const playerText = document.querySelector("#player");
const errorText = document.querySelector("#error");
const resetBtn = document.querySelector('.reset-btn');
const startBtn = document.querySelector('.start-btn');

let player = "X";
let gameOver = false;
let winner;

startBtn.addEventListener('click', event => {
    if(event.target.click) {
        startGame();
    } else {
        blocks.forEach(block => {
            block.style.pointerEvents = 'none';
        })
    }
})

function startGame() {
    playerText.innerText = `${player}'s Turn !`

    blocks.forEach(block => block.addEventListener("click", () => chooseArea(block)))
}

function chooseArea(block) {
    if (block.innerText === "") {
        block.innerText = player;
        if (player === "O") {
            block.style.color = "red"
        }
        turnPlayer();
    } else {
        errorText.innerText = "Heyy, it's not empty "
        block.style.border = "2px solid red"
        setTimeout(() => {
            errorText.innerText = ""
            block.style.border = "1px solid black"
        }, 2000)
    }

    checkWin();
    checkTie();

    if (gameOver) {
        playerText.innerText = `Game is over, ${winner} Won`;
        setInterval(() => {
            playerText.classList.toggle('yellow')

        }, 500);
        
        blocks.forEach(block => block.style.pointerEvents = 'none');
    }
}

function turnPlayer() {
    if (player === "X") {
        player = "O";
        playerText.innerText = `${player}'s Turn !`
        return;
    } else if (player === "O") {
        player = "X";
        playerText.innerText = `${player}'s Turn !`

    }
}

function checkWin() {
    // win
    checkRows()
    checkColumns()
    checkDiagonals()
}

function checkTie() {
    // tie
    const values = [];
    blocks.forEach(block => values.push(block.innerText))
    if (!values.includes("")) {
        playerText.innerText = "Tie !";
        blocks.classList.add('red');
        blocks.forEach(block => block.style.pointerEvents = 'none');
        
    }
}

function checkRows() {
    // check rows
    let row1 = blocks[0].innerText == blocks[1].innerText &&
        blocks[0].innerText == blocks[2].innerText && blocks[0].innerText !== ""
    let row2 = blocks[3].innerText == blocks[4].innerText &&
        blocks[3].innerText == blocks[5].innerText && blocks[3].innerText !== ""
    let row3 = blocks[6].innerText == blocks[7].innerText &&
        blocks[6].innerText == blocks[8].innerText && blocks[6].innerText !== ""

    if (row1 || row2 || row3) {
        gameOver = true
    }
    if (row1) return winner = blocks[0].innerText
    if (row2) return winner = blocks[3].innerText
    if (row3) return winner = blocks[6].innerText
}

function checkColumns() {
    // check cols
    let col1 = blocks[0].innerText == blocks[3].innerText &&
        blocks[0].innerText == blocks[6].innerText && blocks[0].innerText !== ""
    let col2 = blocks[1].innerText == blocks[4].innerText &&
        blocks[1].innerText == blocks[7].innerText && blocks[1].innerText !== ""
    let col3 = blocks[2].innerText == blocks[5].innerText &&
        blocks[2].innerText == blocks[8].innerText && blocks[2].innerText !== ""

    if (col1 || col2 || col3) {
        gameOver = true
    }
    if (col1) return winner = blocks[0].innerText
    if (col2) return winner = blocks[1].innerText
    if (col3) return winner = blocks[2].innerText
}

function checkDiagonals() {
    // check diag
    let dia1 = blocks[0].innerText == blocks[4].innerText &&
        blocks[0].innerText == blocks[8].innerText && blocks[0].innerText !== ""
    let dia2 = blocks[2].innerText == blocks[4].innerText &&
        blocks[2].innerText == blocks[6].innerText && blocks[2].innerText !== ""

    if (dia1 || dia2) {
        gameOver = true
    }
    if (dia1) return winner = blocks[0].innerText
    if (dia2) return winner = blocks[2].innerText
}

resetBtn.addEventListener('click', () => {
    window.location.reload(); 
    
})

