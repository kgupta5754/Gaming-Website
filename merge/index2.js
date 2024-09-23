let candyColors = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
let rows = 9;
let cols = 9;
let score = 0;

let currentCandy;
let targetCandy;

window.onload = function() {
    initializeBoard();

    window.setInterval(function(){
        crushCandies();
        slideCandies();
        generateNewCandies();
    }, 100);
}

function getRandomCandyColor() {
    return candyColors[Math.floor(Math.random() * candyColors.length)]; 
}

function initializeBoard() {
    // Set the initial score to 0
    document.getElementById("score").innerText = score;
    
    for (let row = 0; row < rows; row++) {
        let rowArray = [];
        for (let col = 0; col < cols; col++) {
            let candy = document.createElement("img");
            candy.id = row.toString() + "-" + col.toString();
            candy.src = "./images/" + getRandomCandyColor() + ".png";

            candy.addEventListener("dragstart", dragStart); 
            candy.addEventListener("dragover", dragOver);  
            candy.addEventListener("dragenter", dragEnter); 
            candy.addEventListener("dragleave", dragLeave);
            candy.addEventListener("drop", dragDrop); 
            candy.addEventListener("dragend", dragEnd); 

            document.getElementById("board").append(candy);
            rowArray.push(candy);
        }
        board.push(rowArray);
    }
}

function dragStart() {
    currentCandy = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    targetCandy = this;
}

function dragEnd() {
    if (currentCandy.src.includes("blank") || targetCandy.src.includes("blank")) {
        return;
    }

    let [currentRow, currentCol] = currentCandy.id.split("-").map(Number);
    let [targetRow, targetCol] = targetCandy.id.split("-").map(Number);

    let isAdjacent = Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol) === 1;

    if (isAdjacent) {
        let currentSrc = currentCandy.src;
        currentCandy.src = targetCandy.src;
        targetCandy.src = currentSrc;

        if (!isValidMove()) {
            let tempSrc = currentCandy.src;
            currentCandy.src = targetCandy.src;
            targetCandy.src = tempSrc;    
        }
    }
}

function crushCandies() {
    crushMatches();
    document.getElementById("score").innerText = score;
}

function crushMatches() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 2; col++) {
            let candy1 = board[row][col];
            let candy2 = board[row][col + 1];
            let candy3 = board[row][col + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 2; row++) {
            let candy1 = board[row][col];
            let candy2 = board[row + 1][col];
            let candy3 = board[row + 2][col];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function isValidMove() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 2; col++) {
            let candy1 = board[row][col];
            let candy2 = board[row][col + 1];
            let candy3 = board[row][col + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 2; row++) {
            let candy1 = board[row][col];
            let candy2 = board[row + 1][col];
            let candy3 = board[row + 2][col];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandies() {
    for (let col = 0; col < cols; col++) {
        let emptySpot = rows - 1;
        for (let row = rows - 1; row >= 0; row--) {
            if (!board[row][col].src.includes("blank")) {
                board[emptySpot][col].src = board[row][col].src;
                emptySpot--;
            }
        }

        for (let row = emptySpot; row >= 0; row--) {
            board[row][col].src = "./images/blank.png";
        }
    }
}

function generateNewCandies() {
    for (let col = 0; col < cols; col++) {
        if (board[0][col].src.includes("blank")) {
            board[0][col].src = "./images/" + getRandomCandyColor() + ".png";
        }
    }
}
