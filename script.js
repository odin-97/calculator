let number1 = '';
let operator = '';
let number2 = '';

let isNumber1 = true;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert('Cant divide by Zero!');
        return NaN;
    }
    return a / b;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            throw new Error('Invalid operator');
    }
}


// DISPLAY UPDATE
const number1DIS = document.querySelector('.number1DIS');
const number2DIS = document.querySelector('.number2DIS');
const operatorDIS = document.querySelector('.operatorDIS');
const resultDIS = document.querySelector('.resultDIS');

function updateOperator(operator) {
    operatorDIS.textContent = operator;
}

function updateResult(result) {
    resultDIS.textContent = `= ${result}`;
}

function updateNumber(number) {
    if (isNumber1) {
        number1DIS.textContent = number;
    } else {
        number2DIS.textContent = number;
    }
}



// EVENT LISTENERS 
const digitContainer = document.querySelector('.digits');
const operatorContainer = document.querySelector('.operators');
const clearButton = document.querySelector('.clear');
const enterButton = document.querySelector('.enter');

digitContainer.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
    if (resultDIS.textContent) {
        clearDisplay();
    }

    if (isNumber1) {
        number1 += e.target.textContent;
        updateNumber(number1);
    } else {
        number2 += e.target.textContent;
        updateNumber(number2);
    }
})

operatorContainer.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
    if (!isNumber1 || resultDIS.textContent) {
        number1 = Number(number1);
        number2 = Number(number2);
        let result = operate(number1, operator, number2);
        clearDisplay();
        if (result) {
            number1 = +result.toFixed(2);
            updateNumber(number1);
        } else return;
    }

    operator = e.target.textContent;
    isNumber1 = false;
    updateOperator(operator);
})

clearButton.addEventListener('click', clearDisplay);

enterButton.addEventListener('click', () => {
    if (!number1 || !number2 || !operator) return;

    isNumber1 = true;
    number1 = Number(number1);
    number2 = Number(number2);
    let result = operate(number1, operator, number2);
    if (result) result = +result.toFixed(2);
    else {
        clearDisplay();
        return;
    }
    updateResult(result);
})

function clearDisplay() {
    console.log(clearButton.textContent);
    number1 = '';
    number2 = '';
    operator = '';
    number1DIS.textContent = '';
    number2DIS.textContent = '';
    operatorDIS.textContent = '';
    resultDIS.textContent = '';
    isNumber1 = true;
}