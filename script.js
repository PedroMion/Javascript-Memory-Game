const classes = document.getElementsByClassName('screen');
const images = document.getElementsByClassName('item');

const func = (evt) => {
    images[evt.target.imgindex].style.visibility = "hidden";
}

for (let i = 0; i < classes.length; i++) {
    classes[i].addEventListener("click", func);
    classes[i].imgindex = i;
}