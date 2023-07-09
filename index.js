// ELEMENTS
const screen = document.querySelector(".screen");
const display = document.querySelector(".display");
const decimalButton = document.querySelector(".decimal");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const leftButtons = [...operatorButtons, decimalButton, ...numberButtons];

const undoButton = document.querySelector(".undo");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const rightButtons = [undoButton, equalButton, clearButton];
const buttons = [...leftButtons, ...rightButtons];

// VARIABLES
// currentValue tracks the potential displayValue while we do some checks
let currentValue = "";
let displayValue = "";
const operators = ["+", "-", "x", "/"];
// getComputedStyle returns px so we need to convert to rem
const initialFontSize = `${
  getComputedStyle(display).fontSize.slice(0, 4) / 16
}rem`;

const regex =
  /^(?!.*\.\.)(?!.*\.\d+\.)(?!.*-[x\/+])(?!.*\.[-x\/+])(?!-{2})-?(?!00|0\d)(\.?\d*|\d*\.?\d*)(?:e[-+]\d+)?[-+x\/]?-?(?!00|0\d)(\.?\d*|\d*\.?\d*)$/;
const fontSizeMap = {
  9: "4.8rem",
  10: "4.3rem",
  11: "3.9rem",
  12: "3.6rem",
  13: "3.3rem",
  14: "3.1rem",
  15: "2.9rem",
  16: "2.7rem",
  17: "2.55rem",
  18: "2.4rem",
  19: "2.3rem",
  20: "2.2rem",
  21: "2.1rem",
  22: "2rem",
  23: "1.9rem",
  24: "1.8rem",
  25: "1.75rem",
  26: "1.7rem",
  27: "1.6rem",
};

// FUNCTIONS
const isDecimal = (num) => {
  return num % 1 !== 0;
};

const add = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x + y;
  } else {
    return parseFloat((x + y).toFixed(4));
  }
};

const subtract = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x - y;
  } else {
    return parseFloat((x - y).toFixed(4));
  }
};

const multiply = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x * y;
  } else {
    return parseFloat((x * y).toFixed(4));
  }
};

const divide = (x, y) => {
  if (y === 0) {
    return "Don't even";
  } else if (!isDecimal(x) && !isDecimal(y)) {
    return x / y;
  } else {
    return parseFloat((x / y).toFixed(4));
  }
};

const getOperatorIndex = () => {
  const operatorIndex = currentValue
    .split("")
    .findIndex((char, i, currentValue) => {
      // Skip the first index, it will either be "-", in which case we don't
      // want to include it, or a number. Also skip a "+" or a "-" if it comes after
      // an "e", this denotes a long number, not an operator.
      if (i !== 0 && currentValue[i - 1] !== "e") {
        return operators.includes(char);
      }
    });

  return operatorIndex;
};

const getDisplayValueParts = (operatorIndex) => {
  return {
    firstNum: displayValue.slice(0, operatorIndex),
    secondNum: displayValue.slice(operatorIndex + 1),
    operator: displayValue[operatorIndex],
  };
};

const handleButton = (e) => {
  if (e.target.className.includes("operator")) {
    handleOperator(e);
  } else if (e.target.className.includes("number")) {
    handleNumber(e);
  } else {
    handleDecimal(e);
  }
};

const handleOperator = (e) => {
  let incomingOperator;
  if (e.target.innerText.length === 1) {
    incomingOperator = e.target.innerText;
  } else {
    // This handles the "+/-" button. We only care about the "-".
    incomingOperator = e.target.innerText[e.target.innerText.length - 1];
  }

  currentValue = displayValue + incomingOperator;

  // If displayValue is "", this is the first button pressed.
  // Only allow it to be "-", to handle negative numbers.
  if (displayValue === "") {
    if (incomingOperator === "-") {
      displayValue += incomingOperator;
    } else {
      clearDisplay();
      return;
    }
  } else if (displayValue !== "" && regex.test(currentValue)) {
    displayValue += incomingOperator;
  } else {
    // If we have an expression that can be evaluated i.e.
    // "2+1" and another operator is pressed, evaluate the
    // current expression and set up the next expression
    // with the result and incoming operator
    if (
      isNaN(currentValue[currentValue.length - 1]) &&
      !isNaN(currentValue[currentValue.length - 2])
    ) {
      clearDisplay();
      calculate();
      displayValue += incomingOperator;
    }
  }

  showResult();
};

const handleNumber = (e) => {
  const incomingNumber = e.target.innerText;
  currentValue = displayValue + incomingNumber;

  if (currentValue === "00") {
    currentValue = "0";
    return;
    // Prevents a string like "08" from displaying in the first expression.
    // Would be nice to prevent this in the second half of the expression,
    // a little tricky though.
  } else if (currentValue[0] === "0" && !isNaN(currentValue[1])) {
    currentValue = currentValue[currentValue.length - 1];
    displayValue = "";
  }

  if (regex.test(currentValue)) {
    displayValue += incomingNumber;
  }

  showResult();
};

const handleDecimal = (e) => {
  const incomingDecimal = e.target.innerText;
  currentValue = displayValue + incomingDecimal;
  if (regex.test(currentValue)) {
    displayValue += incomingDecimal;
  }

  showResult();
};

const fitCharInScreen = () => {
  if (displayValue.length <= 8) {
    display.style.fontSize = initialFontSize;
  } else if (displayValue.length in fontSizeMap) {
    display.style.fontSize = fontSizeMap[displayValue.length];
  } else {
    display.style.fontSize = "1.5rem";
  }
};

const calculate = () => {
  // convert division symbol to /?
  if (displayValue === "") {
    return;
  }

  const operatorIndex = getOperatorIndex();
  const displayValueParts = getDisplayValueParts(operatorIndex);
  const { firstNum, secondNum, operator } = displayValueParts;

  if (!isNaN(firstNum) && !isNaN(secondNum) && isNaN(operator)) {
    switch (operator) {
      case "+":
        displayValue = add(+firstNum, +secondNum).toString();
        break;
      case "-":
        displayValue = subtract(+firstNum, +secondNum).toString();
        break;
      case "x":
        displayValue = multiply(+firstNum, +secondNum).toString();
        break;
      case "/":
        displayValue = divide(+firstNum, +secondNum).toString();
        break;
    }
  }

  showResult();
};

const reset = () => {
  clearDisplay();
  displayValue = "";
  currentValue = "";
};

const clearDisplay = () => {
  display.innerText = 0;
};

const showResult = () => {
  display.innerText = displayValue;
};

const undo = () => {
  const currentValueArray = currentValue.split("");
  currentValueArray.pop();
  currentValue = currentValueArray.join("");
  if (currentValue === "") {
    reset();
  } else {
    displayValue = currentValueArray.join("");

    showResult();
  }
};

// EVENT LISTENERS
leftButtons.forEach((button) => {
  button.addEventListener("click", handleButton);
});
equalButton.addEventListener("click", calculate);
undoButton.addEventListener("click", undo);
clearButton.addEventListener("click", reset);
buttons.forEach((button) => {
  button.addEventListener("click", fitCharInScreen);
});
