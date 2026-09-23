let currentInput = "";
let previousInput = "";
let operator = null;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function updateDisplay() {
    currentDisplay.textContent = currentInput || "0";

    if (operator && previousInput) {
        previousDisplay.textContent =
            `${previousInput} ${getOperatorSymbol(operator)}`;
    } else {
        previousDisplay.textContent = "";
    }
}

function appendNumber(number) {

    // Prevent multiple decimal points
    if (number === "." && currentInput.includes(".")) {
        return;
    }

    // Prevent multiple leading zeros
    if (number === "0" && currentInput === "0") {
        return;
    }

    currentInput += number;
    updateDisplay();
}

function chooseOperator(selectedOperator) {

    if (currentInput === "" && previousInput === "") {
        return;
    }

    // If operator already exists, calculate first
    if (operator && currentInput !== "") {
        calculate();
    }

    if (currentInput !== "") {
        previousInput = currentInput;
        currentInput = "";
    }

    operator = selectedOperator;
    updateDisplay();
}

function calculate() {

    if (!operator || currentInput === "" || previousInput === "") {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                currentDisplay.textContent = "Cannot divide by 0";
                previousDisplay.textContent = "";
                currentInput = "";
                previousInput = "";
                operator = null;
                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;
    }

    currentInput = String(
        Number(result.toFixed(10))
    );

    previousInput = "";
    operator = null;

    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = null;

    updateDisplay();
}

function deleteNumber() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function getOperatorSymbol(operator) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    };

    return symbols[operator];
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    // Decimal
    else if (key === ".") {
        appendNumber(".");
    }

    // Operators
    else if (["+", "-", "*", "/", "%"].includes(key)) {
        chooseOperator(key);
    }

    // Enter or =
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteNumber();
    }

    // Escape
    else if (key === "Escape") {
        clearDisplay();
    }
});