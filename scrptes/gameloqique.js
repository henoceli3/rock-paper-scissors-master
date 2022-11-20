const gameElements = {
    score : document.querySelector('.btn-paper'),
    gampage : document.querySelector('.game-wrapper'),
    gameWrapper : Array.from(document.querySelector('.game-wrapper').children),
    btnRock : document.getElementById('btn-rock'),
    btnPaper : document.getElementById('btn-paper'),
    btnScissors : document.getElementById('btn-scissors'),
    // les elements du resultat
    resulWrapper : document.querySelector('.result-wrapper'),
    playerSeletionIcon : document.querySelector('.player-selection--icon'),
    cumpterSelectionIcon : document.querySelector('.cumpter-selection--icon'),
    gameResultLabel : document.querySelector('.game-result--label'),
    partThreeResult : document.querySelector('.result-column-2'),
    // score 
    score : document.querySelector('.score'),
    playagain : document.getElementById('btn-play-again')
};

// trouver la selection de l'ordinateur
function cumputerPlay() {
    let randomSelection = Math.floor(Math.random() * gameElements.gameWrapper.length);
    let cumptuerselection = gameElements.gameWrapper[randomSelection].className;
    return cumptuerselection;
}
let houseSelection,playerSeletion;
// afficher tout l es resultats 
function gamePrint(n){
    houseSelection = cumputerPlay();
    playerSeletion = gameElements.gameWrapper[n].className;
    commitWrapper();
    printPlayerSelection();
    gameElements.cumpterSelectionIcon.classList.add('load-cumputer-icon');
    setTimeout(function(){
        printCumputerResult();
    },3000);
    setTimeout(function(){
        gameElements.partThreeResult.classList.add('active--column-2');
        gamelogique();
    },4000)
    // for debugue 
    console.log(playerSeletion)
}

// functions qui fair basculer d'un ecran a l'autres 
function commitWrapper(){
    if(window.innerWidth<=768){
        commitMobile();
    }else{
        commitDesktop();
    };
}

// changement sur grands ecrans
function commitDesktop(){
    gameElements.gampage.classList.add('close-game-wrapper');
    gameElements.resulWrapper.classList.add('active-result--wrapper-desktop');
}
// changement sur petit ecrans 
function commitMobile(){
    gameElements.gampage.classList.add('close-game-wrapper');
    gameElements.resulWrapper.classList.add('active-result--wrapper-mobile');
}

function reverseWrapper(){
    gameElements.gampage.classList.remove('close-game-wrapper');
    gameElements.resulWrapper.classList.remove('active-result--wrapper-desktop');
    gameElements.resulWrapper.classList.remove('active-result--wrapper-mobile');
    gameElements.partThreeResult.classList.remove('active--column-2');
    removeBadclasse();
}

// jouer a nouveau 
gameElements.playagain.addEventListener('click', reverseWrapper);

// supprimer les classe unitile au prochain tour
function removeBadclasse(){
    if(houseSelection === "btn-rock"){
        gameElements.cumpterSelectionIcon.classList.remove('active-player-selected-rock--button');
    }
    if(houseSelection === "btn-paper"){
        gameElements.cumpterSelectionIcon.classList.remove('active-player-selected-paper--button');
    }
    if(houseSelection === "btn-scissors"){
        gameElements.cumpterSelectionIcon.classList.remove('active-player-selected-scissors--button');
    }
    detectWinnerOrLose();
}

// afficher le resultats de l'ordinateur 
function printCumputerResult(){
    if(houseSelection === "btn-rock"){
        gameElements.cumpterSelectionIcon.classList.remove('load-cumputer-icon');
        gameElements.cumpterSelectionIcon.classList.add('active-player-selected-rock--button');
    }else{
        gameElements.cumpterSelectionIcon.classList.remove('active-player-selected-rock--button');
    }

    if(houseSelection === "btn-paper"){
        gameElements.cumpterSelectionIcon.classList.remove('load-cumputer-icon');
        gameElements.cumpterSelectionIcon.classList.add('active-player-selected-paper--button');
    }else{
        gameElements.cumpterSelectionIcon.classList.remove('active-player-selected-paper--button');
    }

    if(houseSelection === "btn-scissors"){
        gameElements.cumpterSelectionIcon.classList.remove('load-cumputer-icon');
        gameElements.cumpterSelectionIcon.classList.add('active-player-selected-scissors--button');
    }else{
        gameElements.cumpterSelectionIcon.classList.remove('active-player-selected-scissors--button');
    }
}

// afficher la selection du joueurs
function printPlayerSelection(){
    if(playerSeletion === "btn-paper"){
        gameElements.playerSeletionIcon.classList.add('active-player-selected-paper--button');
    }else{
        gameElements.playerSeletionIcon.classList.remove('active-player-selected-paper--button');
    }

    if(playerSeletion === "btn-rock"){
        gameElements.playerSeletionIcon.classList.add('active-player-selected-rock--button');
    }else{
        gameElements.playerSeletionIcon.classList.remove('active-player-selected-rock--button');
    }

    if(playerSeletion === "btn-scissors"){
        gameElements.playerSeletionIcon.classList.add('active-player-selected-scissors--button');
    }else{
        gameElements.playerSeletionIcon.classList.remove('active-player-selected-scissors--button');
    }
}

// declenchement des fonctions en fonction du boutons selectionnés
gameElements.btnPaper.addEventListener('click', function(event){
    gamePrint(0);
});
gameElements.btnRock.addEventListener('click', function(event){
    gamePrint(1);
});
gameElements.btnScissors.addEventListener('click', function(event){
    gamePrint(2);
});

// la logique du jeux
let scoreExact = 0;
function gamelogique(){
    // victoire du joueur 
    if(playerSeletion == "btn-paper" & houseSelection == "btn-rock"){
        win();
    };
    if(playerSeletion == "btn-rock" & houseSelection == "btn-scissors"){
        win();
    };
    if(playerSeletion == "btn-scissors" & houseSelection == "btn-paper"){
        win();
    };

    // victoire de l'ordinateur ou defaite du joueur 
    if(playerSeletion == "btn-paper" & houseSelection == "btn-scissors"){
        lose();
    };
    if(playerSeletion == "btn-rock" & houseSelection == "btn-paper"){
        lose();
    };
    if(playerSeletion == "btn-scissors" & houseSelection == "btn-rock"){
        lose();
    };

    // match null 
    if(playerSeletion == "btn-paper" & houseSelection == "btn-paper"){
        draw();
    };
    if(playerSeletion == "btn-rock" & houseSelection == "btn-rock"){
        draw();
    };
    if(playerSeletion == "btn-scissors" & houseSelection == "btn-scissors"){
        draw();
    };
    
    // store the game score to preserve it
    localStorage.setItem('scoreExact', JSON.stringify(scoreExact));
};

let iswiner;
function win(){
    scoreExact++;
    gameElements.score.textContent = scoreExact;
    gameElements.gameResultLabel.textContent = "you win";
    gameElements.playerSeletionIcon.classList.add('is--winner');
    iswiner = true;
    celebration();
}
function lose(){
    scoreExact--;
    gameElements.score.textContent = scoreExact;
    gameElements.gameResultLabel.textContent = "you lose";
    gameElements.cumpterSelectionIcon.classList.add('is--winner');
    iswiner = false;
}
function draw(){
    gameElements.gameResultLabel.textContent = "draw";
}
function detectWinnerOrLose(){
    if(iswiner == true){
        gameElements.playerSeletionIcon.classList.remove('is--winner');
    }else{
        gameElements.cumpterSelectionIcon.classList.remove('is--winner');
    }
}

function celebration(){
    for(let a  = 0; a <= 8; a++){
        confetti({
            origin: {
                x:Math.random(),
                y:Math.random() - 0.1
            }
        })
    }
}

// preserve the score on page refresh 
scoreExact = localStorage.getItem('scoreExact') ? (JSON.parse(localStorage.getItem('scoreExact'))) : 0;
console.log('scoreExact: ', scoreExact); // for testing and debugging
window.addEventListener('load', function(event){
    gameElements.score.textContent = scoreExact;
})

// remetter le score a zero
document.getElementById('reset').addEventListener('click',function(event){
    scoreExact = 0;
    gameElements.score.textContent = scoreExact;
    localStorage.clear();
}) 