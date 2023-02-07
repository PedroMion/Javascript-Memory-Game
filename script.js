const classes = document.getElementsByClassName('screen');
const images = document.getElementsByClassName('item');
const buttons = document.getElementsByClassName('button');
const texts = document.getElementsByClassName('text');
const modal = document.querySelector('.modal');

const source = ["/img/banana.png", "/img/banana.png", "/img/pineapple.png", "/img/pineapple.png", "/img/lemon.png", "/img/lemon.png", "/img/kiwi.png", "/img/kiwi.png", "/img/pear.png", "/img/pear.png", "/img/apple.png", "/img/apple.png"];

let game = {
    "index1": undefined,
    "index2": undefined,
    "pairsMatched": 0,
    "turned": false,
    "strikes": 0,
    "cardsArray": [false, false, false, false, false, false, false, false, false, false, false, false]
}

const restartGame = (evt) => {
    modal.style.visibility = "hidden";
    evt.preventDefault();
    localStorage.clear();
    location.reload();
}

const setRestart = () => {
    for(let but of buttons) {
        but.addEventListener("click", restartGame);
    }
}

const endGame = (winner) => {
    if(winner) {
        texts[0].textContent = "You won! Congratulations :\)";
        texts[1].textContent = "To play again, click on the restart button below\nYou made " + game.strikes + " mistakes";
    } else {
        texts[0].textContent = "You lose! Try again :(";
        texts[1].textContent = "To play again, click on the restart button below\nYou made " + game.strikes + " mistakes";
    }
    modal.style.visibility = "visible";
}

const currentGame = () => {
    if(localStorage.getItem("game.strikes") == 3) {
        endGame(false);
    }
    for(let i = 0; i < images.length; i++){
        images[i].src = localStorage.getItem('index'+i);
        if(localStorage.getItem("turned"+i)) game.cardsArray[i] = true;
        if(localStorage.getItem("matched"+i)) {
            images[i].style.visibility = "visible";
            classes[i].removeEventListener("click", turnCard);
        }
    }
    if(localStorage.getItem("game.index1")) {
        game.index1 = Number(localStorage.getItem("game.index1"));
        images[game.index1].style.visibility = "visible";
        classes[game.index1].removeEventListener("click", turnCard);
    }
    game.pairsMatched = Number(localStorage.getItem("game.pairsMatched"));
    game.strikes = Number(localStorage.getItem("game.strikes"));
    game.turned = Boolean(localStorage.getItem("game.turned"));

}

const setBoard = () => {
    let random;
    let options = [...source];
    if(localStorage.getItem("currentgame")) {
        currentGame();
    }
    else {
        for(let i = 0; i<source.length; i++) {
            random = Math.floor(Math.random()*options.length);
            images[i].src = options[random];
            localStorage.setItem('index'+i, options[random])
            options.splice(random, 1);
        }
        localStorage.setItem("currentgame", "true");
    }
}

const isPair = (index1, index2) => {
    return (images[index1].src === images[index2].src);
}

const gameOver = () => {
    if(game.pairsMatched === 6 || game.strikes === 3) return true;
    return false;
}

const pairHandler = () => {
        if(isPair(game.index1, game.index2)) {
            localStorage.setItem("matched"+game.index1, "true");
            localStorage.setItem("matched"+game.index2, "true");
            game.index1 = undefined;
            game.index2 = undefined;
            localStorage.removeItem("game.index1");
            game.cardsArray[game.index1] = true;
            game.cardsArray[game.index2] = true;
            localStorage.setItem("turned"+game.index1, "true");
            localStorage.setItem("turned"+game.index2, "true");
            game.pairsMatched++;
            localStorage.setItem("game.pairsMatched", game.pairsMatched);
            setTimeout(()=> {if(gameOver()) {
                endGame(true);
            }}, 100);
        }
        else {
            if(game.cardsArray[game.index1] === true || game.cardsArray[game.index2] === true) {
                game.strikes++;
                localStorage.setItem("game.strikes", game.strikes);
                if(gameOver()) {
                    setTimeout(() => {endGame(false)}, 500);
                }
            } else {
                game.cardsArray[game.index1] = true;
                game.cardsArray[game.index2] = true;
                localStorage.setItem("turned"+game.index1, "true");
                localStorage.setItem("turned"+game.index2, "true");
            }
            setTimeout(() => {
                classes[game.index1].addEventListener("click", turnCard);
                classes[game.index2].addEventListener("click", turnCard);
                images[game.index1].style.visibility = "hidden";
                images[game.index2].style.visibility = "hidden";
                game.index1 = undefined;
                game.index2 = undefined;
                localStorage.removeItem("game.index1");
            }, 500);
        }
}

const turnCard = (evt) => {
    images[evt.target.imgindex].style.visibility = "visible";
    classes[evt.target.imgindex].removeEventListener("click", turnCard);
    if(game.turned === false) {
        game.index1 = evt.target.imgindex;
        game.turned = true;
        localStorage.setItem("game.index1", game.index1);
        localStorage.setItem("game.turned", "true");
    } else if(game.turned === true) {
        game.turned = false;
        localStorage.setItem("game.turned", "");
        localStorage.removeItem("game.index1");
        game.index2 = evt.target.imgindex;
        pairHandler();
    }
}

for (let i = 0; i < classes.length; i++) {
    classes[i].addEventListener("click", turnCard);
    classes[i].imgindex = i;
}

setBoard();
setRestart();