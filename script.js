let display = '';
let firstValue = null;
let operation = null;

// Basic math functions
const add = function addTwoNumbers(x, y) {
  return x + y;
}

const subtract = function subtractTwoNumbers(x, y) {
  return x - y;
}

const multiply = function multiplyTwoNumbers(x, y) {
  return x * y;
}

const divide = function divideTwoNumbers(x, y) {
  return x / y;
}

const updateCalculatorDisplay = function updateCalculatorDisplay(newString = display) {
  document.querySelector('.inputDisplay').textContent = newString;
}

const clearUserInputs = function clearCurrentDisplaySavedOperationAndStoredDisplay() {
  display = '';
  firstValue = null;
  operation = null;
  updateCalculatorDisplay('');
}

const invertDisplayValue = function toggleDisplayValueBetweenNegativeAndPositive() {
  display.charAt(0) === '-' ? display = display.slice(1) : display = `-${display}`;
  updateCalculatorDisplay();
}

const insertDecimalPoint = function insertDecimalPoint() {
  if (!display.includes('.')) display = `${display}.`;
  updateCalculatorDisplay();
}

// TODO: cast parameters to 'number'
const operate = function callCalculatorOperations(operator, x, y) {
  switch (operator) {
    case 'add':
      return add(x, y);
    
    case 'subtract':
      return subtract(x, y);

    case 'multiply':
      return multiply(x, y);

    case 'divide':
      return divide(x, y);

    default:
      break;
  }
}

const decideOperation = function readButtonPressedAndDecideOperation(buttonPressed) {
  switch (buttonPressed) {
    case 'ac':
      clearUserInputs();
      break;

    case '+/-':
      invertDisplayValue();
      break;

    case '.':
      insertDecimalPoint();
      break;
    
    case '=':
      const result = operate(operation, firstValue, display);
      clearUserInputs();
      display = `${result}`;
      updateCalculatorDisplay();
      break;

    default:
      firstValue = display;
      operation = buttonPressed;
      display = '';
      updateCalculatorDisplay('');
      break;
  }
}

const appendNumber = function appendNumberToDisplay(buttonPressed) {
  if (display !== '' || buttonPressed !== "48") display += String.fromCharCode(buttonPressed); 
  updateCalculatorDisplay();
}

const verifyTypeOfInput = function verifyTypeOfButtonPressed(buttonPressed) {
  isNaN(Number(buttonPressed)) ? decideOperation(buttonPressed) : appendNumber(buttonPressed);

}

// Assigns event listeners to buttons on calculator
const buttons = document.querySelectorAll('.key');
buttons.forEach((button) => {
  return button.addEventListener('click', () => verifyTypeOfInput(button.dataset.id));
});
