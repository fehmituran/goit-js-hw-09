
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let currentColor = null;
stopBtn.disabled = true;

startBtn.addEventListener("click", () => {
   currentColor = setInterval(changeBodyColor, 1000);
   startBtn.disabled =true;
   stopBtn.disabled = false;
});

stopBtn.addEventListener("click", ()=> {
   clearInterval(currentColor);
   startBtn.disabled =false;
   stopBtn.disabled = true;
})


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function changeBodyColor() {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;  
};
