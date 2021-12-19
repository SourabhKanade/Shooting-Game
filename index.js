// console.log("index.js")

const game = document.querySelector('#game');
let startGame = document.getElementById('start_game');
const p1Btn = document.querySelector('#p1Btn');
const p2Btn = document.querySelector('#p2Btn');
let p1Score = document.querySelector('#p1Score');
let p2Score = document.querySelector('#p2Score');
let p1Health = document.querySelector('#p1Health');
let p2Health = document.querySelector('#p2Health');
let matchResult = document.querySelector('.match-result');
let winner = document.querySelector('.winner');

p1Health.innerText = 100;
p2Health.innerText = 100;
p1Score = 0;
p2Score = 0;

// console.log(p1Health.innerText, p2Health.innerText)

//STORE DATA
let gameData = {
    player1Score: 0,
    player2Score: 0
}

// functions

const reset = () => {
    if(gameData['player1Score'] < 3 && gameData['player2Score'] < 3 && gameData['player2Score'] + gameData['player1Score'] <= 5){
        p1Health.innerText = 100;
        p2Health.innerText = 100;
		enableButton(p1Btn);
    }else{
        if(gameData['player1Score'] > gameData['player2Score']){
            hide(game);
            disableButton(p1Btn);
            disableButton(p2Btn);
            winner.innerText = 'Player1 Has Won The Game!'
            show(matchResult);
        } else{
            hide(game);
            disableButton(p1Btn);
            disableButton(p2Btn);
            winner.innerText = 'Player2 Has Won The Game!'
            show(matchResult);
        }
    }
}

const result = (p1Health, p2Health) => {
    if(p1Health.innerText > p2Health.innerText){
        gameData['player1Score'] += 1;
        p1Score.innerText = gameData['player1Score'];
        p2Score.innerText = gameData['player2Score'];
    }else{
        gameData['player2Score'] += 1;
        p1Score.innerText = gameData['player1Score'];
        p2Score.innerText = gameData['player2Score'];
    }
    disableButton(p1Btn);
    disableButton(p2Btn);
    setTimeout(() => {
        reset();
    }, 2000);
}
const show = (el) => {
    el.style.display = 'flex';
}

const hide = (el) => {
    el.style.display = 'none';
}

const enableButton = (btn) => {
    btn.removeAttribute('disabled');
}

const disableButton = (btn) => {
    btn.setAttribute('disabled', '');
}

// event listeners

startGame.addEventListener("click", function (e) {
    e.preventDefault();
    console.log('GAME STARTED!');
    show(game);
    enableButton(p1Btn);
    disableButton(startGame);
})

p1Btn.addEventListener("click", function (e)  {
    e.preventDefault();
    if(p2Health.innerText >= 0 && p1Health.innerText >= 0){
        p2RecievedDamage = Math.floor(Math.random() * 5);
        p2Health.innerText = p2Health.innerText - p2RecievedDamage;
        console.log(`P2 GOT HIT FOR ${p2RecievedDamage}`);
        if(p2Health.innerText < 0){
			result(p1Health, p2Health);
		}else {
			disableButton(p1Btn);
			enableButton(p2Btn);
		}
    }else{
        result(p1Health, p2Health);
    }
});

p2Btn.addEventListener('click', (e) => {
    e.preventDefault();
    if(p2Health.innerText >= 0 && p1Health.innerText >= 0){
        p1RecievedDamage = Math.floor(Math.random() * 5);
        p1Health.innerText = p1Health.innerText - p1RecievedDamage;
        console.log(`P1 GOT HIT FOR ${p1RecievedDamage}`);
        if(p1Health.innerText < 0){
			result(p1Health, p2Health);
		}else {
			disableButton(p2Btn);
			enableButton(p1Btn);
		}
    }else{
        result(p1Health, p2Health);
    }
});