import "../css/01-style.css";

function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let body = document.body;
const PROMPT_DELAY = 1000;

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

const colorChange = {

    promptCounter: 0,
    intervalId: null,
    isActive: false,
    
    start() {
        if (this.isActive) {
            return;
        }

        const hasDisable = buttonStop.hasAttribute("disabled");
        if (hasDisable) {
            buttonStop.removeAttribute("disabled");
        }

        buttonStart.setAttribute("disabled", "disabled");
        this.isActive = true;
        
        this.intervalId = setInterval(() => {
            body.style.background = getRandomHexColor();
            this.promptCounter += 1;
        }, PROMPT_DELAY)
    },
    stop() {
        if (this.isActive) {
            clearInterval(this.intervalId);
            buttonStop.setAttribute("disabled", "disabled");
            buttonStart.removeAttribute("disabled");
            this.isActive = false;
            return;
        }
    },
}

buttonStart.addEventListener('click', () => {
    colorChange.start();
});
buttonStop.addEventListener('click', () => {
    colorChange.stop();
});
