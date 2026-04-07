let display = document.getElementById("display");

let currentInput = "";
let previousValue = null;
let operator = null;
let expression = "";

function updateDisplay() {
  let value = expression || currentInput || "0";

  // limit length
  if (value.length > 12) {
    value = value.slice(0, 12);
  }

  display.innerText = value;
}

function append(val) {
  // ❌ block dot (handled separately)
  if (val === ".") return;

  // ❌ prevent starting with 0
  if (currentInput === "" && val === "0") return;

  // ❌ prevent multiple leading zeros
  if (currentInput === "0") {
    currentInput = val;
    expression = expression.slice(0, -1) + val;
    updateDisplay();
    return;
  }

  currentInput += val;
  expression += val;
  updateDisplay();
}

function setOperator(op) {
  if (currentInput === "") return;

  let symbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  };

  // 👇 If chaining, calculate first
  if (previousValue !== null && operator !== null) {
    let current = Number(currentInput);

    if (operator === "+") previousValue += current;
    if (operator === "-") previousValue -= current;
    if (operator === "*") previousValue *= current;
    if (operator === "/") previousValue = current === 0 ? "Error" : previousValue / current;

    currentInput = String(previousValue);
  } else {
    previousValue = Number(currentInput);
  }

  // 👇 Append to expression instead of resetting
  expression += " " + symbols[op] + " ";

  operator = op;
  currentInput = "";

  updateDisplay();
}

async function equals() {
  if (!operator || currentInput === "") return;

  let current = Number(currentInput);

  let opMap = {
    "+": "add",
    "-": "sub",
    "*": "mul",
    "/": "div"
  };

  let op = opMap[operator];

  try {
    let res = await fetch(
      `/calculate?op=${op}&a=${previousValue}&b=${current}`
    );

    let data = await res.json();

    currentInput = String(data.result);
    expression = currentInput;

    previousValue = null;
    operator = null;

    updateDisplay();

  } catch (err) {
    console.error("API ERROR:", err);
    currentInput = "Error";
    expression = "Error";
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = "";
  previousValue = null;
  operator = null;
  expression = "";
  updateDisplay();
}

updateDisplay();

function backspace() {
  if (expression.length === 0) return;

  // remove last character
  expression = expression.slice(0, -1);

  // check if last char was an operator
  let lastChar = expression.slice(-1);

  if (["+", "−", "×", "÷"].includes(lastChar)) {
    operator = null;
    currentInput = "";
    updateDisplay();
    return;
  }

  // rebuild currentInput from expression
  let parts = expression.split(/[\+\−×÷]/);
  currentInput = parts[parts.length - 1];

  // if no operator left, reset previousValue
  if (!/[\+\−×÷]/.test(expression)) {
    previousValue = null;
    operator = null;
  }

  updateDisplay();
}

function appendDot() {
  // If starting fresh
  if (currentInput === "") {
    currentInput = "0.";
    expression += "0.";
    updateDisplay();
    return;
  }

  // Split the expression by operators to get last number
  let parts = expression.split(/[\+\-\*\/]/);
  let lastNumber = parts[parts.length - 1];

  // If last number already has dot → block
  if (lastNumber.includes(".")) return;

  currentInput += ".";
  expression += ".";
  updateDisplay();
}

function percentage() {
  let num = Number(currentInput);
  currentInput = String(num / 100);
  expression = currentInput;
  updateDisplay();
}

function sqrt() {
  if (currentInput === "") return;

  let num = Number(currentInput);

  // ❌ handle negative numbers
  if (num < 0) {
    currentInput = "Error";
    expression = "Error";
    updateDisplay();
    return;
  }

  let result = Math.sqrt(num);

  currentInput = String(result);
  expression = "";

  updateDisplay();
}