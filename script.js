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
  if (y === 0) return 'ERROR!';
  return x / y;
}

const updateCalculatorDisplay = function updateCalculatorDisplay(newString = display) {
  document.querySelector('.inputDisplay').textContent = newString;
}

const clearUserInputs = function clearCurrentDisplaySavedOperationAndStoredDisplay() {
  display = '';
  firstValue = null;
  operation = null;
}

const invertDisplayValue = function toggleDisplayValueBetweenNegativeAndPositive() {
  display.charAt(0) === '-' ? display = display.slice(1) : display = `-${display}`;
  updateCalculatorDisplay();
}

const insertDecimalPoint = function insertDecimalPoint() {
  if (!display.includes('.')) display = `${display}.`;
  updateCalculatorDisplay();
}

const operate = function callCalculatorOperations(operator, x, y) {
  const xNumber = Number(x);
  const yNumber = Number(y);

  switch (operator) {
    case 'add':
      return add(xNumber, yNumber);
    
    case 'subtract':
      return subtract(xNumber, yNumber);

    case 'multiply':
      return multiply(xNumber, yNumber);

    case 'divide':
      return divide(xNumber, yNumber);

    default:
      return display;
  }
}

const decideOperation = function readButtonPressedAndDecideOperation(buttonPressed) {
  switch (buttonPressed) {
    case 'ac':
      clearUserInputs();
      updateCalculatorDisplay();
      break;

    case '+/-':
      invertDisplayValue();
      break;

    case '.':
      insertDecimalPoint();
      break;
    
    case '=':
      let result = operate(operation, firstValue, display);
      result = Math.round(result * 10) / 10;
      clearUserInputs();
      display = `${result}`;
      updateCalculatorDisplay();
      break;

    default:

      // if more than one operation is chained, then calculate the result of previous operation  
      /* FIXME: bug when chaining multiple operators
        * Example: 12 * + 5 =
        * expected output: 17
        * output: 5
      */
      if (operation !== null) {
        let result = operate(operation, firstValue, display);
        result = Math.round(result * 10) / 10;
        display = `${result}`;
      }
     
      firstValue = display;
      operation = buttonPressed;
      display = '';
      updateCalculatorDisplay('');
      
      break;
  }
}

const appendNumber = function appendNumberToDisplay(buttonPressed) {
  display += String.fromCharCode(buttonPressed); 
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
