const classes = document.getElementsByClassName('screen');
const images = document.getElementsByClassName('item');

const source = ["/img/banana.png", "/img/banana.png", "/img/pineapple.png", "/img/pineapple.png", "/img/lemon.png", "/img/lemon.png", "/img/kiwi.png", "/img/kiwi.png", "/img/pear.png", "/img/pear.png", "/img/apple.png", "/img/apple.png"];

let game = {
    "index1": undefined,
    "index2": undefined,
    "pairsMatched": 0,
    "turned": false
}

const setBoard = () => {
    let random;
    let options = [...source];
    for(let i = 0; i<source.length; i++) {
        random = Math.floor(Math.random()*options.length);
        images[i].src = options[random];
        options.splice(random, 1);
    }
}

const isPair = (index1, index2) => {
    return (images[index1].src === images[index2].src);
}

const gameOver = () => {
    if(game.pairsMatched === 5) return true;
    game.pairsMatched++;
    return false;
}

const pairHandler = () => {
        if(isPair(game.index1, game.index2)) {
            game.index1 = undefined;
            game.index2 = undefined;
            if(gameOver()) alert('Você ganhou!');
        }
        else {
            setTimeout(() => {
                classes[game.index1].addEventListener("click", turnCard);
                classes[game.index2].addEventListener("click", turnCard);
                images[game.index1].style.visibility = "hidden";
                images[game.index2].style.visibility = "hidden";
                game.index1 = undefined;
                game.index2 = undefined;
            }, 1000);
        }
}

const turnCard = (evt) => {
    images[evt.target.imgindex].style.visibility = "visible";
    classes[evt.target.imgindex].removeEventListener("click", turnCard);
    if(game.turned === false) {
        game.index1 = evt.target.imgindex;
        game.turned = true;
    } else if(game.turned === true) {
        game.turned = false;
        game.index2 = evt.target.imgindex;
        pairHandler();
    }
}

for (let i = 0; i < classes.length; i++) {
    classes[i].addEventListener("click", turnCard);
    classes[i].imgindex = i;
}

setBoard();