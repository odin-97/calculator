// New Part
let number1;
let operator;
let number2;
// New Part


function add(a, b) {
    console.log(a+b);
}

function subtract(a, b) {
    console.log(a-b);
}

function multiply(a, b) {
    console.log(a*b);
}

function divide(a, b) {
    console.log(a/b)
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