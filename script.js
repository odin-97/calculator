let number1 = '';
let operator = '';
let number2 = '';

let isNumber1 = true;

function add(a, b) {
    console.log(a+b);
    return a + b;
}

function subtract(a, b) {
    console.log(a-b);
    return a - b;
}

function multiply(a, b) {
    console.log(a*b);
    return a * b;
}

function divide(a, b) {
    console.log(a/b)
    return a / b;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+': 
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '/':
            divide(num1, num2);
            break;
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
    resultDIS.textContent = result;
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

digitContainer.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
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
    operator = e.target.textContent;
    isNumber1 = false;
    updateOperator(operator);
})

clearButton.addEventListener('click', () => {
    console.log(clearButton.textContent);
})
