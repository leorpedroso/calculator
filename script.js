//Basic math functions
const add = function addsTwoNumbers(x, y) {
  return x + y;
}

const subtract = function subtractsTwoNumbers(x, y) {
  return x - y;
}

const multiply = function multipliesTwoNumbers(x, y) {
  return x * y;
}

const divide = function dividesTwoNumbers(x, y) {
  return x / y;
}

const operate = function callsBasicFunctions(operator, x, y) {
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
//What do I actually want to do here?
const verifyInput = function verifyTypeOfButtonPressed(buttonPressed) {
  console.log(buttonPressed);
  //Here we could get the current string from the html itself, or store in a variable

}

//Assigns event listeners to buttons on calculator
const buttons = document.querySelectorAll('.key');
buttons.forEach((button) => {
  return button.addEventListener('click', () => verifyInput(button.dataset.id));
});
