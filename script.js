// DOM selectors
const previousDisplay = document.querySelector('#previous-display');
const currentDisplay = document.querySelector('#current-display');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const equalsButton = document.querySelector('#equals-btn');
const pointButton = document.querySelector('#point-btn');
const clearButton = document.querySelector('#clear-btn');
const delButton = document.querySelector('#del-btn');


// Variables
let operand1;
let operand2;
let operator;
let currentDisplayValue = 0;
let result;



// Basic Math Operation Functions
const add = (num1, num2) => {
  return num1 + num2;
}

const subtract = (num1, num2) => {
  return num1 - num2;
}

const multiply = (num1, num2) => {
  return num1 * num2;
}

const divide = (num1, num2) => {
  if (num1 === 0 || num2 === 0) {
    return 0;
  } else {
    return num1 / num2;
  }
}

const operate = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}

// Displays the initial value in the current display;
currentDisplay.innerHTML = currentDisplayValue;

// populateCurrentDisplay - displays the numbers clicked on by the user, in the current display
const populateCurrentDisplay = (button) => {
  if (currentDisplayValue === 0 && button.value === "0") {
    currentDisplayValue = 0;
  } else if (operand1 !== undefined && operator === undefined) {
    operand1 = undefined;
    operator = undefined;
    operand2 = undefined;
  } else if (currentDisplayValue === 0 && button.value === ".") {
    currentDisplayValue += button.value;
  } else if (currentDisplayValue === 0 || (result !== undefined && currentDisplay.innerHTML === result.toString())) {
    currentDisplay.innerHTML = "";
    currentDisplayValue = button.value;
  } else {
    currentDisplayValue += button.value;
  }

  currentDisplay.innerHTML = currentDisplayValue;
}

// disablePointButton - disables the point from being used more than once per inputted number
const disablePointButton = () => {
  pointButton.addEventListener("click", () => {
    if (currentDisplay.innerHTML.includes(".")) {
      pointButton.disabled = true;
    }
  })
}

// populatePreviousDisplay - moves the numbers from the current display into the previous display, sets that number as operand1 and then readies the current display for operand2 to be inputted
const populatePreviousDisplay = (button) => {
  if (previousDisplay.innerHTML === "&nbsp;" || operand1 === undefined) {
    previousDisplay.innerHTML = `${currentDisplayValue} ${button.value}`;
    operand1 = Number(currentDisplay.innerHTML);
    operator = button.value;
    currentDisplayValue = 0;
  } else if (previousDisplay.innerHTML === `${operand1} ${operator} ${operand2} =` || operator === undefined) {
    if (currentDisplayValue.innerHTML === result.toString()) {
      previousDisplay.innerHTML = `${result} ${button.value}`;
    } else {
      previousDisplay.innerHTML = `${currentDisplayValue} ${button.value}`;
    }
    operand1 = Number(currentDisplay.innerHTML);
    operator = button.value;
    currentDisplayValue = 0;
  }
}


// calculateEquation - returns the result of the equation in the current display while also updating the previous display with the full equation
const calculateEquation = () => {
  if (previousDisplay.innerHTML !== "&nbsp;" && operator !== undefined) {
    operand2 = Number(currentDisplay.innerHTML);
    result = operate(operator, operand1, operand2);
    previousDisplay.innerHTML = `${operand1} ${operator} ${operand2} =`;
    if (result % 1 === 0) {
      currentDisplay.innerHTML = result;
    } else if ((result * 10) % 1 === 0) {
      currentDisplay.innerHTML = result.toFixed(1);
    } else if ((result * 100) % 1 === 0) {
      currentDisplay.innerHTML = result.toFixed(2);
    } else {
      currentDisplay.innerHTML = result.toFixed(3);
    }
    operand1 = result;
    operand2 = undefined;
    operator = undefined;
  }
}


// clearCalculator - resets all values in the calculator to their default values
const clearCalculator = () => {
  operand1 = undefined;
  operand2 = undefined;
  operator = undefined;
  currentDisplayValue = 0
  result = undefined;
  pointButton.disabled = false;
  currentDisplay.innerHTML = currentDisplayValue;
  previousDisplay.innerHTML = "&nbsp;";
}

// deleteNumber - removes the last number from the current display
const deleteNumber = () => {
  let newNumber = currentDisplay.innerHTML.slice(0, -1);
  currentDisplayValue = Number(newNumber);
  if (newNumber.length === 0) {
    currentDisplay.innerHTML = "0";
  } else {
    currentDisplay.innerHTML = newNumber;
  }
}

numberButtons.forEach(btn => btn.addEventListener("click", () => {
  populateCurrentDisplay(btn);
}));

operatorButtons.forEach(btn => btn.addEventListener("click", () => {
  populatePreviousDisplay(btn);
}));

equalsButton.addEventListener("click", calculateEquation);
clearButton.addEventListener("click", clearCalculator);
delButton.addEventListener("click", deleteNumber);
