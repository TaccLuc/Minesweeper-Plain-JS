const playButton = document.getElementById('playButton');
const difficulty100 = document.getElementById('difficulty_100');
const difficulty81 = document.getElementById('difficulty_81');
const difficulty49 = document.getElementById('difficulty_49');
const resetButton = document.getElementById('resetButton');
const cellContainer = document.querySelector('.cell_container');

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

let resetCounter = 0;
playButton.addEventListener('click', function(){
    
    if (difficulty == 0){
        alert('Seleziona una difficoltà!');
    }
    else if (resetCounter == 1){
        cellContainer.innerHTML = '';
        generateTable(difficulty);
    }
    else{
        generateTable(difficulty)
        resetCounter = 1;
    }
});


resetButton.addEventListener('click', function(){
    cellContainer.innerHTML = '';
    difficulty = 0;
});

// FUNCTIONS

function generateTable(x) {
   
    for (let i = 1; i <= x; i++) {

        const cell = document.createElement('div');
        cell.classList.add('cell', 'cell_' + x);
        cell.innerHTML = i;
        cell.addEventListener('click', function(){
            this.classList.toggle('active');
            console.log(i);
        });
        cellContainer.append(cell);
     
    }
}

function randomNumber (min, max){
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNotRepeatedNumber(x){
    const randomNumbersArray = [];
    while (randomNumbersArray.length < x) {
        const aNumber = randomNumber(1, x);
    
        if (!randomNumbersArray.includes(aNumber)) {
            randomNumbersArray.push(aNumber);
        }
    }
    return randomNumbersArray;
}

