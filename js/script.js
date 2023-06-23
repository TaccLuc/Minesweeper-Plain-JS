// ELEMENTS
const playButton = document.getElementById('playButton');
const difficulty100 = document.getElementById('difficulty_100');
const difficulty81 = document.getElementById('difficulty_81');
const difficulty49 = document.getElementById('difficulty_49');
const resetButton = document.getElementById('resetButton');
const cellContainer = document.querySelector('.cell_container');
const scoreBoard = document.querySelector('.scoreBoard');

// SCORE
let score = 0;

// DIFFICULTY BUTTONS
let difficulty = 0;

difficulty100.addEventListener('click', function(){
    difficulty = 100;
    difficulty100.classList.add('buttonActive');
    difficulty81.classList.remove('buttonActive');
    difficulty49.classList.remove('buttonActive');
});

difficulty81.addEventListener('click', function(){
    difficulty = 81;
    difficulty81.classList.add('buttonActive');
    difficulty100.classList.remove('buttonActive');
    difficulty49.classList.remove('buttonActive');
});

difficulty49.addEventListener('click', function(){
    difficulty = 49;
    difficulty49.classList.add('buttonActive');
    difficulty81.classList.remove('buttonActive');
    difficulty100.classList.remove('buttonActive');
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
        generateTable(difficulty); 
        score = 0;
        document.getElementById('score').innerHTML = score;
        cellContainer.classList.remove('endBoard');
    }

});

// RESET BUTTON
resetButton.addEventListener('click', function(){
    cellContainer.innerHTML = '';
    difficulty = 0;
    score = 0;
    document.getElementById('score').innerHTML = score;
    cellContainer.classList.remove('endBoard');
    difficulty100.classList.remove('buttonActive');
    difficulty81.classList.remove('buttonActive');
    difficulty49.classList.remove('buttonActive');
});

// FUNCTIONS
function generateTable(x) { 
    for (let i = 1; i <= x; i++) {

        const cell = document.createElement('div');
        cell.classList.add('cell', 'cell_' + x);
        cellContainer.append(cell);

        let clicked = false;
        cell.addEventListener('click', function(){
            
            this.classList.add('active');
            if(score === x - 17 || bombs.includes(i)){
                cellContainer.classList.add('endBoard');
                gameLost(i, bombs, cell)
                gameWon(score, x, cell)
            }
            else if (!clicked && !bombs.includes(i)) {
                score++;
                clicked = true;
                document.getElementById('score').innerHTML = score;
                mineSweeper(bombs.includes(i - Math.sqrt(x)), bombs.includes(i + (Math.sqrt(x))), bombs.includes(i + 1), bombs.includes(i - 1), this, Math.sqrt(x), bombs, i)
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
        singleElement.innerHTML = "<img src='img/skull.jpg' width='50px' height='50px'>";
        document.getElementById('score').innerHTML += 
        '<div class="text-danger text-decoration-underline">GAME OVER</div>';
    }
}
function gameWon(score, x, singleElement) {
    if (score == x - 17) {
        singleElement.classList.add('won');
        singleElement.innerHTML = "<img src='img/heart.png' width='50px' height='50px'>";
        document.getElementById('score').innerHTML += 
        '<div class="text-success text-decoration-underline">HAI VINTO!</div>';
    }
}

function mineSweeper(up, down, right, left, element, sqrtX, array, i){
    if(down && up && right && left){   
        if(endRowCheck(i, sqrtX, array)){
            element.innerHTML = 3;
        }
        else{
            element.innerHTML = 4;
        }
    }
    else if(down && left && up || down && right && up || down &&  right && left || up &&  right && left){
        if(endRowCheck(i, sqrtX, array)){
            element.innerHTML = 2;
        }
        else{
            element.innerHTML = 3;
        }
    }
    else if((down && left || up && right) || (down && right || up && left) || (down && up || right && left) ){  
        if(endRowCheck(i, sqrtX, array)){
            element.innerHTML = 1;
        }
        else{
            element.innerHTML = 2;
        }
    }
    else if (down || up || right || left){ 
        if(endRowCheck(i, sqrtX, array)){
            element.innerHTML = '';
        }
        else{
            element.innerHTML = 1;
        }
    } 
}

function endRowCheck(i, sqrtX, array){
    for (let j = 0; j <= sqrtX; j++) {
        let check = false;
        if (i == sqrtX * j && array.includes(i + 1) || i == (sqrtX * j) + 1 && array.includes(i - 1)) {
            check = true;
            return check;
        } 
    }
}