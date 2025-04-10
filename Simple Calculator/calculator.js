// Calculator Class
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  // Clear all inputs
  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // Delete the last entered digit
  delete() {
    if (this.currentOperand === "0") return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === "") this.currentOperand = "0";
  }

  // Append a number or decimal point
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand =
      this.currentOperand === "0" && number !== "." ? number : this.currentOperand + number;
  }

  // Choose an operation (+, -, ×, ÷)
  chooseOperation(operation) {
    if (this.currentOperand === "0") return;
    if (this.previousOperand !== "") this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
  }

  // Perform the computation
  compute() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let computation;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        if (current === 0) {
          alert("Cannot divide by zero!");
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = Number(computation.toFixed(8)).toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  // Format the number for display
  getDisplayNumber(number) {
    const [integerPart, decimalPart] = number.toString().split(".");
    const formattedInteger = isNaN(parseInt(integerPart))
      ? "0"
      : parseInt(integerPart).toLocaleString("en", { maximumFractionDigits: 0 });
    return decimalPart != null ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  }

  // Update the calculator display
  updateDisplay() {
    this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
    this.previousOperandElement.textContent = this.operation
      ? `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      : "";
  }
}

// DOM Elements
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");

// Initialize Calculator
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Add event listeners for number buttons
numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
);

// Add event listeners for operation buttons
operationButtons.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
);

// Add event listener for equals button
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

// Add event listener for clear button
clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

// Add event listener for delete button
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// Add keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    calculator.appendNumber(key);
  } else if (key === "+" || key === "-") {
    calculator.chooseOperation(key);
  } else if (key === "*") {
    calculator.chooseOperation("×");
  } else if (key === "/") {
    calculator.chooseOperation("÷");
  } else if (key === "Enter" || key === "=") {
    calculator.compute();
  } else if (key === "Backspace") {
    calculator.delete();
  } else if (key === "Escape") {
    calculator.clear();
  }

  calculator.updateDisplay();
});
