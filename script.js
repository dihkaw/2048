const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
let score = 0;
let board = [];

// Initialize the game
function initGame() {
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    board = Array.from({ length: 4 }, () => Array(4).fill(0));
    addRandomTile();
    addRandomTile();
    render();
}

// Add a random tile (2 or 4)
function addRandomTile() {
    const emptyTiles = [];
    board.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value === 0) {
                emptyTiles.push({ row: rowIndex, col: colIndex });
            }
        });
    });
    if (emptyTiles.length > 0) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Render the game board
function render() {
    gameContainer.innerHTML = '';
    board.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.style.backgroundColor = getTileColor(value);
            tile.innerText = value !== 0 ? value : '';
            gameContainer.appendChild(tile);
        });
    });
}

// Get tile color based on value
function getTileColor(value) {
    switch (value) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f67c5f';
        case 128: return '#f9f86e';
        case 256: return '#f9f86e';
        case 512: return '#c2c2c2';
        case 1024: return '#ffcc00';
        case 2048: return '#ffcc00';
        default: return '#cdc1b4';
    }
}

// Handle key presses for movement
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});

// Move tiles up
function moveUp() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (board[row][col] !== 0) {
                newCol.push(board[row][col]);
            }
        }
        mergeTiles(newCol);
        for (let row = 0; row < 4; row++) {
            board[row][col] = newCol[row] || 0;
        }
    }
    addRandomTile();
    render();
}

// Move tiles down
function moveDown() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 3; row >= 0; row--) {
            if (board[row][col] !== 0) {
                newCol.push(board[row][col]);
            }
        }
        mergeTiles(newCol);
        for (let row = 0; row < 4; row++) {
            board[3 - row][col] = newCol[row] || 0;
        }
    }
    addRandomTile();
    render();
}

// Move tiles left
function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = [];
        for (let col = 0; col < 4; col++) {
            if (board[row][col] !== 0) {
                newRow.push(board[row][col]);
            }
        }
        mergeTiles(newRow);
        for (let col = 0; col < 4; col++) {
            board[row][col] = newRow[col] || 0;
        }
    }
    addRandomTile();
    render();
}

// Move tiles right
function moveRight() {
    for (let row = 0; row < 4; row++) {
        let newRow = [];
        for (let col = 3; col >= 0; col--) {
            if (board[row][col] !== 0) {
                newRow.push(board[row][col]);
            }
        }
        mergeTiles(newRow);
        for (let col = 0; col < 4; col++) {
            board[row][3 - col] = newRow[col] || 0;
        }
    }
    addRandomTile();
    render();
}

// Merge tiles
function mergeTiles(newTiles) {
    for (let i = 0; i < newTiles.length - 1; i++) {
        if (newTiles[i] === newTiles[i + 1]) {
            newTiles[i] *= 2;
            score += newTiles[i];
            newTiles[i + 1] = 0;
        }
    }
    newTiles = newTiles.filter(value => value !== 0);
    return newTiles;
}

// Restart the game
function restartGame() {
    initGame();
}

// Initialize the game on load
window.onload = initGame;
