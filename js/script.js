// ELEMENTS
const playButton = document.getElementById('playButton');
const difficulty100 = document.getElementById('difficulty_100');
const difficulty81 = document.getElementById('difficulty_81');
const difficulty49 = document.getElementById('difficulty_49');
const resetButton = document.getElementById('resetButton');
const cellContainer = document.querySelector('.cell_container');
const scoreBoard = document.querySelector('.scoreBoard');

// SCORE + BOMBS
let score = 0;
let bombs = [];

// DIFFICULTY BUTTONS
let difficulty = 0;

difficulty100.addEventListener('click', function(){
    difficulty = 100;
});

difficulty81.addEventListener('click', function(){
    difficulty = 81;
});

difficulty49.addEventListener('click', function(){
    difficulty = 49;
});

// PLAY BUTTON
playButton.addEventListener('click', function(){

    if (difficulty == 0){
        alert('Seleziona una difficoltà!');
    }
    else {
        cellContainer.innerHTML = '';
        bombs = [];
        randomNotRepeatedNumber(16, difficulty, bombs);
        console.log(bombs);
        generateTable(difficulty); 
    }

});

// RESET BUTTON
resetButton.addEventListener('click', function(){
    cellContainer.innerHTML = '';
    difficulty = 0;
    score = 0;
    document.getElementById('score').innerHTML = score;
    cellContainer.classList.remove('endBoard');
});

// FUNCTIONS
function generateTable(x) { 
    for (let i = 1; i <= x; i++) {

        const cell = document.createElement('div');
        cell.classList.add('cell', 'cell_' + x);
        cell.innerHTML = i;
        cellContainer.append(cell);

        let clicked = false;
        cell.addEventListener('click', function(){
            gameLost(i, bombs, cell)
            this.classList.add('active');
            if(score === x - 17 || bombs.includes(i)){
                cellContainer.classList.add('endBoard');
            }
            else if (!clicked && !bombs.includes(i)) {
                score++;
                clicked = true;
                document.getElementById('score').innerHTML = score;
            }
        });
        
    }
}

function randomNumber (min, max){
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNotRepeatedNumber(x, y, randomNumbersArray){
    do{
        const aNumber = randomNumber(1, y);
    
        if (!randomNumbersArray.includes(aNumber)) {
            randomNumbersArray.push(aNumber);
        }
    }
    while (randomNumbersArray.length < x) {
    }
}

function gameLost(x, y, singleElement) {
    if (y.includes(x)) {
        singleElement.classList.add('lost');
        singleElement.innerHTML = 'HAI PERSO!';
    }
}

