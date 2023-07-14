// ELEMENTS
const screen = document.querySelector(".screen");
const display = document.querySelector(".display");

const decimalButton = document.querySelector(".decimal");
const signButton = document.querySelector(".sign");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const leftButtons = [
  ...operatorButtons,
  decimalButton,
  signButton,
  ...numberButtons,
];

const undoButton = document.querySelector(".undo");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const rightButtons = [undoButton, equalButton, clearButton];

const buttons = [...leftButtons, ...rightButtons];

// VARIABLES
let firstNum = "";
let operator = "";
let secondNum = "";
// getComputedStyle returns px so we need to convert to rem
const initialDigitSize = `${
  getComputedStyle(display).fontSize.slice(0, 4) / 16
}rem`;
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

const handleButton = (e) => {
  if (e.target.className.includes("operator")) {
    handleOperator(e);
  } else if (e.target.className.includes("number")) {
    handleNumber(e);
  } else if (e.target.className.includes("decimal")) {
    handleDecimal(e);
  } else if (e.target.className.includes("sign")) {
    handleSign(e);
  }
};

const handleOperator = (e) => {
  if (!isNaN(firstNum) && firstNum !== "" && !operator) {
    operator = e.target.innerText;
    display.innerText = firstNum + operator;
  } else if (firstNum && operator && !isNaN(secondNum) && secondNum !== "") {
    calculate();
    operator = e.target.innerText;
    display.innerText = firstNum + operator;
  }
};

const handleNumber = (e) => {
  if (!operator) {
    if (firstNum[0] === "0" && !isNaN(e.target.innerText)) {
      firstNum = e.target.innerText;
    } else {
      firstNum += e.target.innerText;
    }
    display.innerText = firstNum;
  } else if (operator) {
    secondNum += e.target.innerText;
    display.innerText = firstNum + operator + secondNum;
  }
};

const handleDecimal = (e) => {
  if (!operator) {
    const decimals = Array.from(firstNum).filter((char) => char === ".");
    if (decimals.length < 1) {
      firstNum += e.target.innerText;
      display.innerText = firstNum;
    }
  } else if (operator) {
    const decimals = Array.from(secondNum).filter((char) => char === ".");
    if (decimals.length < 1) {
      secondNum += e.target.innerText;
      display.innerText = firstNum + operator + secondNum;
    }
  }
};

const handleSign = (e) => {
  if (!firstNum) {
    firstNum = e.target.innerText[e.target.innerText.length - 1];
    display.innerText = firstNum;
  } else if (!secondNum && operator) {
    secondNum = e.target.innerText[e.target.innerText.length - 1];
    display.innerText = firstNum + operator + secondNum;
  }
};

const fitCharInScreen = () => {
  const displayValue = firstNum + operator + secondNum;
  if (displayValue.length <= 8) {
    display.style.fontSize = initialDigitSize;
  } else if (displayValue.length in fontSizeMap) {
    display.style.fontSize = fontSizeMap[displayValue.length];
  } else {
    display.style.fontSize = "1.5rem";
  }
};

const calculate = () => {
  if (firstNum && secondNum && operator) {
    let outcome;
    switch (operator) {
      case "+":
        outcome = add(+firstNum, +secondNum).toString();
        break;
      case "-":
        outcome = subtract(+firstNum, +secondNum).toString();
        break;
      case "x":
        outcome = multiply(+firstNum, +secondNum).toString();
        break;
      case "\u00F7":
        outcome = divide(+firstNum, +secondNum).toString();
        break;
    }

    display.innerText = outcome;
    firstNum = outcome;
    operator = "";
    secondNum = "";
  }
};

const reset = () => {
  display.innerText = 0;
  firstNum = "";
  operator = "";
  secondNum = "";
};

const undo = () => {
  if (!firstNum || firstNum.length === 1) {
    firstNum = "";
    reset();
  } else if (!operator) {
    const displayValueArray = firstNum.split("");
    displayValueArray.pop();
    firstNum = displayValueArray.join("");
    display.innerText = firstNum;
  } else if (operator && !secondNum) {
    operator = "";
    display.innerText = firstNum;
  } else if (secondNum) {
    const displayValueArray = secondNum.split("");
    displayValueArray.pop();
    secondNum = displayValueArray.join("");
    display.innerText = firstNum + operator + secondNum;
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
