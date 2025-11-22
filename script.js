// #region GLOBAL VARIABLES
let number1 = '';
let operator = '';
let number2 = '';

let isNumber1 = true;

const numericalKeys = '0123456789';
const operatorKeys = '+-*/';

// DISPLAY SECTIONS
const number1DIS = document.querySelector('.number1DIS');
const number2DIS = document.querySelector('.number2DIS');
const operatorDIS = document.querySelector('.operatorDIS');
const resultDIS = document.querySelector('.resultDIS');

// EVENT LISTENERS 
const digitContainer = document.querySelector('.digits');
const operatorContainer = document.querySelector('.operators');
const clearButton = document.querySelector('.clear');
const enterButton = document.querySelector('.enter');
const floatButton = document.querySelector('.float');
const backSpace = document.querySelector('.back');

// #endregion

// #region OPERATIONS
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
//#endregion


// DISPLAY UPDATE
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
function digitInput(e) {
    if (e.target.tagName !== 'BUTTON') return;
     // Prevent clicks on .misc buttons
    if (e.target.closest('.misc')) return;

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
}
digitContainer.addEventListener('click', digitInput);


function operatorInput(e) {
    if (e.target.tagName !== 'BUTTON') return;
    if (e.target.closest('.misc')) return;
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
}
operatorContainer.addEventListener('click', operatorInput);


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
clearButton.addEventListener('click', clearDisplay);


function enterInput() {
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
}
enterButton.addEventListener('click', enterInput);


function floatInput() {
    let value = isNumber1 ? number1 : number2;
    if (!value.includes('.')) {
        value += '.';

        if (isNumber1) number1 = value;
        else number2 = value;

        updateNumber(value);
    }
}
floatButton.addEventListener('click', floatInput)


function backSpaceInput() {
    if (operator && number2 === '') {
        console.log(number2)
        operator = '';
        updateOperator()
        if (!isNumber1) isNumber1 = true;
        return;
    }

    let value = isNumber1 ? number1 : number2;
    value = value.slice(0, -1);
    if (isNumber1) number1 = value;
    else number2 = value;
    updateNumber(value);
}
backSpace.addEventListener('click', backSpaceInput)

// KEYBOARD INPUT
document.addEventListener('keydown', e => {
    const keyName = e.key;
    if (numericalKeys.includes(keyName)) {
        if (resultDIS.textContent) {
            clearDisplay();
        }

        if (isNumber1) {
            number1 += keyName;
            updateNumber(number1);
        } else {
            number2 += keyName;
            updateNumber(number2);
        }
    }

    else if (operatorKeys.includes(keyName)) {
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

        operator = keyName;
        isNumber1 = false;
        updateOperator(operator);
    }

    else if (keyName === 'Enter') {
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
    }

    else if (keyName === '.') {
        let value = isNumber1 ? number1 : number2;
        if (!value.includes('.')) {
            value += '.';

            if (isNumber1) number1 = value;
            else number2 = value;

            updateNumber(value);
        }
    }


    else if (keyName === 'Backspace') {
        if (operator && number2 === '') {
            operator = '';
            updateOperator()
            if (!isNumber1) isNumber1 = true;
            return;
        }

        let value = isNumber1 ? number1 : number2;
        value = value.slice(0, -1);
        if (isNumber1) number1 = value;
        else number2 = value;
        updateNumber(value);
    }

    else if (keyName === 'Delete') {
        clearDisplay()
    }
})