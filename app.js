let storedFirstNum = null;
let storedSecondNum = null;
let inputNumber, storedOperator, previousKey;

function add(firstNum, secondNum) {
    return firstNum + secondNum;
};

function subtract(firstNum, secondNum) {
    return firstNum - secondNum;
};

function multiply(firstNum, secondNum) {
    return firstNum * secondNum;
};

function divide(firstNum, secondNum) {
    if (secondNum == 0) {
        displayError.textContent = "Error, can't divide by 0, please type another number."
        return 0;
    }
    return firstNum / secondNum;
};

function operate(firstNum, secondNum, operator) {
    let result = Number((window[operator](firstNum, secondNum)).toFixed(5));
    storedFirstNum = result;
    storedSecondNum = null;
    return (displayValue.textContent = result);    
};

const displayError = document.querySelector(".error-output");
const displayValue = document.querySelector(".output");
const numbers = document.querySelectorAll(".numbers-container button");
const operators = document.querySelectorAll(".operators-container button");

function handleNumbers() {
    const number = this.dataset.number;
    displayError.textContent = "";
    if (displayValue.textContent == 0) {
        displayValue.textContent = number;
    }
    else if (storedSecondNum == null && storedOperator && storedOperator != "equal") {
        displayValue.textContent = number;
        storedSecondNum = 0;
    } else {
        if (displayValue.textContent.includes(".") && number == ".") {
            return;
        } else {
            displayValue.textContent += number;
        }
    }
    inputNumber = Number(displayValue.textContent);
    };

function handleOperators() {
    removeActiveClass();
    const operator = this.dataset.operator;
    const acceptedOperators = ["add", "subtract", "divide", "multiply"];
    displayError.textContent = "";
    if (storedFirstNum != null && acceptedOperators.includes(storedOperator) && operator == "equal") {
            removeActiveClass();
            storedSecondNum = inputNumber;
            const result = operate(storedFirstNum, storedSecondNum, storedOperator);
            if (acceptedOperators.includes(operator)) {
                this.classList.add("active");
            }
            storedOperator = operator;
            inputNumber = result;
    } 
    else if (operator == "reset") {
            storedOperator = null;
            storedFirstNum = null;
            storedSecondNum = null;
            displayValue.textContent = 0;
            removeActiveClass();
    }
    else if (operator == "backspace") {
            removeActiveClass();
            if (displayValue.textContent.length == 1) {
                displayValue.textContent = 0;
                inputNumber = displayValue.textContent;
            }
            else {
                inputNumber = displayValue.textContent.slice(0, -1);
                displayValue.textContent = inputNumber;
            }
    } else if (operator != "equal"){
            removeActiveClass();
            this.classList.add("active");
            storedOperator = operator;
            if (!storedFirstNum) {
                storedFirstNum = inputNumber;
            }
    }
    };

function handleKeyPress(event) {
    if (event.key == "+") operators.item(2).click(); 
    if (event.key == "*" || event.code == "KeyX") operators.item(5).click(); 
    if ((event.key >= 0 && event.key <= 9) || event.code == "Period") {
        const numberElement = document.querySelector(`button[data-number="${event.key}"]`);
        numberElement.click();
    }
    if (event.code == "Minus") operators.item(3).click();
    if (event.code == "Slash") operators.item(4).click();
    if (event.code == "KeyX") operators.item(5).click();
    if (event.code == "KeyC") operators.item(0).click();
    if (event.code == "Backspace") operators.item(1).click();
    if (event.key == "=" || event.code == "Enter") operators.item(6).click();  
};

window.onkeydown = (event) => handleKeyPress(event);

numbers.forEach(button => {
    button.onclick = handleNumbers;
});

operators.forEach(button => {
    button.onclick = handleOperators;
});

function removeActiveClass() {
    operators.forEach((button) => button.classList.remove("active"));
};
