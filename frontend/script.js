let display = document.getElementById('display');

let currentInput = "0";
let previousValue = null;
let operator = null;
let lastValue = null;
let justCalculated = false;
let fullExpression = "";

// Update display
function updateDisplay() {
  display.innerText = fullExpression || "0";
}

// Append numbers
function append(value) {
  if (justCalculated) {
    currentInput = value;
    fullExpression = value;
    justCalculated = false;
  } else if (currentInput === "0") {
    currentInput = value;
    fullExpression += value;
  } else {
    currentInput += value;
    fullExpression += value;
  }

  updateDisplay();
}

// Decimal
function appendDot() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    fullExpression += ".";
  }
  updateDisplay();
}

// Set operator
const BASE_URL = "https://basic-calculator-api.onrender.com";

async function calculate() {
  if (operator === null || previousValue === null) return;

  let current = Number(currentInput);

  let opMap = {
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '/': 'div'
  };

  let op = opMap[operator];

  try {
    console.log("Response:", data);
    
    let res = await fetch(
      `${BASE_URL}/calculate?op=${op}&a=${previousValue}&b=${current}`
    );

    let data = await res.json();

   console.log("Response:", data);

    previousValue = data.result;
    currentInput = String(data.result);
    fullExpression = currentInput;

    lastValue = current;

    updateDisplay();
  } catch (err) {
    console.error("API ERROR:", err);
    display.innerText = "Error";
  }
}

// Equals (repeat operation)
function equals() {
  if (operator === null) return;

  let current = Number(currentInput);

  if (!justCalculated) {
    calculate();
  } else {
    switch (operator) {
      case '+':
        previousValue += lastValue;
        break;
      case '-':
        previousValue -= lastValue;
        break;
      case '*':
        previousValue *= lastValue;
        break;
      case '/':
        previousValue = lastValue === 0 ? "Error" : previousValue / lastValue;
        break;
    }

    currentInput = String(previousValue);
    fullExpression = currentInput;

    updateDisplay();
  }

  justCalculated = true;
}

// Clear
function clearDisplay() {
  currentInput = "0";
  previousValue = null;
  operator = null;
  lastValue = null;
  justCalculated = false;
  fullExpression = "";

  updateDisplay();
}

// Backspace
function backspace() {
  if (justCalculated) return;

  currentInput =
    currentInput.length > 1
      ? currentInput.slice(0, -1)
      : "0";

  fullExpression = fullExpression.slice(0, -1);

  updateDisplay();
}

// Square root
function sqrt() {
  let value = Number(currentInput);
  let result = Math.sqrt(value);

  currentInput = String(result);
  fullExpression = currentInput;
  justCalculated = true;

  updateDisplay();
}

// Power
function power() {
  previousValue = Number(currentInput);
  operator = '*';
  lastValue = previousValue;
  currentInput = "0";
}

function percentage() {
  let current = Number(currentInput);
  currentInput = String(current / 100);

  fullExpression = currentInput;
  updateDisplay();
}