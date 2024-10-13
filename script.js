const calculatorScreen = document.querySelector('.calculator-screen');
let currentInput = '';
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

const updateScreen = (value) => {
    calculatorScreen.value = value;
};

const clear = () => {
    currentInput = '';
    firstOperand = null;
    operator = null;
    shouldResetScreen = false;
    updateScreen(0);
};

const appendNumber = (number) => {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateScreen(currentInput);
};

const chooseOperator = (selectedOperator) => {
    if (currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
        updateScreen(firstOperand);
    }
    operator = selectedOperator;
    shouldResetScreen = true;
};

const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
        default:
            return secondOperand;
    }
};

const handleEquals = () => {
    if (operator === null || shouldResetScreen) return;
    currentInput = calculate(firstOperand, parseFloat(currentInput), operator);
    updateScreen(currentInput);
    operator = null;
};

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        
        if (value >= '0' && value <= '9' || value === '.') {
            appendNumber(value);
        } else if (value === 'clear') {
            clear();
        } else if (value === '=') {
            handleEquals();
        } else {
            chooseOperator(value);
        }
    });
});

// Initialize screen
clear();
