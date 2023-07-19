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
    return (x + y).toFixed(4);
  }
};

const subtract = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x - y;
  } else {
    return (x - y).toFixed(4);
  }
};

const multiply = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x * y;
  } else {
    return (x * y).toFixed(4);
  }
};

const divide = (x, y) => {
  if (y === 0) {
    return "Don't even";
  } else if (!isDecimal(x) && !isDecimal(y)) {
    return x / y;
  } else {
    return (x / y).toFixed(4);
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

const checkLastCharforDecimal = (num) => {
  return num[num.length - 1] === ".";
};

const removeTrailingDecimals = () => {
  let lastCharisDecimal;
  // We are on the first number
  if (!operator) {
    lastCharisDecimal = checkLastCharforDecimal(firstNum);
    if (lastCharisDecimal) {
      firstNum = removeLastChar(firstNum);
    }
    // We are on the second number
  } else if (operator) {
    lastCharisDecimal = checkLastCharforDecimal(secondNum);
    if (lastCharisDecimal) {
      secondNum = removeLastChar(secondNum);
    }
  }
};

const handleOperator = (e) => {
  removeTrailingDecimals();

  // We are calculating a single expression with the equal button
  if (!isNaN(firstNum) && firstNum !== "" && !operator) {
    operator = e.target.innerText;
    display.innerText = firstNum + operator;
    // We are doing a rolling calculation with an operator
  } else if (firstNum && operator && !isNaN(secondNum) && secondNum !== "") {
    calculate();
    operator = e.target.innerText;
    display.innerText = firstNum + operator;
  }
};

const checkLeadingZeroes = (num, e) => {
  return num[0] === "0" && num[1] !== "." && !isNaN(e.target.innerText);
};

const buildNumber = (num, e) => {
  const leadingZeroesExist = checkLeadingZeroes(num, e);
  if (leadingZeroesExist) {
    num = e.target.innerText;
    return num;
  } else {
    num += e.target.innerText;
    return num;
  }
};

const handleNumber = (e) => {
  // We are on the first number
  if (!operator) {
    firstNum = buildNumber(firstNum, e);
    display.innerText = firstNum;
    // We are on the second number
  } else if (operator) {
    secondNum = buildNumber(secondNum, e);
    display.innerText = firstNum + operator + secondNum;
  }
};

const findDecimals = (num) => {
  return !Array.from(num).includes(".");
};

const handleDecimal = (e) => {
  // We are on the first number
  if (!operator) {
    const decimalDoesntExist = findDecimals(firstNum);
    if (decimalDoesntExist) {
      firstNum += e.target.innerText;
      display.innerText = firstNum;
    }
    // We are on the second number
  } else if (operator) {
    const decimalDoesntExist = findDecimals(secondNum);
    if (decimalDoesntExist) {
      secondNum += e.target.innerText;
      display.innerText = firstNum + operator + secondNum;
    }
  }
};

const handleSign = () => {
  if (!firstNum) {
    firstNum = "-";
    display.innerText = firstNum;
  } else if (operator && !secondNum) {
    secondNum = "-";
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

const removeLastChar = (num) => {
  const numArray = num.split("");
  numArray.pop();
  return numArray.join("");
};

const undo = () => {
  if (!firstNum || firstNum.length === 1) {
    firstNum = "";
    reset();
  } else if (!operator) {
    firstNum = removeLastChar(firstNum);
    display.innerText = firstNum;
  } else if (operator && !secondNum) {
    operator = "";
    display.innerText = firstNum;
  } else if (secondNum) {
    secondNum = removeLastChar(secondNum);
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
