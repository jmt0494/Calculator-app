let runningTotal = "0";
let buffer = "0";
let previousOp = "";
const output = document.querySelector('.output')
const currentCalc = document.querySelector('.current-calc')
let equalsWasLast = false

document.querySelector('.calc-buttons')
    .addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            buttonClick(event.target.innerText)
        }
    });

const buttonClick = (value) => {
    if (isNaN(parseInt(value))) {
        handleSymb(value);
    } else {
        handleNum(value);
    }
    rerender()
}

const handleNum = (value) => {
    if (equalsWasLast){
        buffer = "0"
        equalsWasLast = false
    }
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

const handleSymb = (value) => {
    equalsWasLast = false
    if (value === "C"|| value === "="|| value === "⌫") {
        handleSpeciel(value);
    } else {
        handleOp(value);
    }
}

const handleSpeciel = (value) => {
    if (value === "C") {
        runningTotal = '0';
        buffer = '0';
        previousOp = '';
        ;
    } else if (value === "⌫") {
        if (buffer.length > 1) {
            buffer = buffer.slice(0, -1)      
        } else {
            buffer = '0'     
        }
    } else {
        if (previousOp) {
            runningTotal = "" + Math.round(eval(runningTotal + previousOp + buffer))
            previousOp = ""
            buffer = '0'
            equalsWasLast = true
        }
    }
}

const handleOp = (value) => {
    if (!previousOp) {
        runningTotal = buffer;
        buffer = '0';
        if (value === "÷") {
            previousOp = '/';
        } else {
            previousOp = value;
        }
    } else {
        if (buffer === "0") {
            if (value === "÷") {
                previousOp = '/';
            } else {
                previousOp = value;
            }
            return
        }
        runningTotal = "" + Math.round(eval(runningTotal + previousOp + buffer))
        buffer = "0"
        if (value === "÷") {
            previousOp = '/';
        } else {
            previousOp = value;
        }
    }
}

const rerender = () => {
    output.innerText = buffer
    currentCalc.innerText = `${runningTotal} ${previousOp} `
}