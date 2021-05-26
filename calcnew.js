// Declare Variables That The Calculator Will Use For The Digits And Functions
let firstNum = secondNum = operator = "";

// Display Variable For The Text Output
let display = document.querySelector("#display")

// Shorthand for setting display to firstNum
function displayFirstNum() {display.textContent = firstNum;}

// for rounding to nearest hundreth
function round(value) {
    return Number(value.toFixed(2));
}

// Vars and event listeners for each of the buttons
const numbers = document.querySelectorAll(".number")
const operations = document.querySelectorAll("[data-function]")

// Function to handle number input
function calcInputHandler(number) {
        if(operator == "") {
            if(number == "." && firstNum.includes(".")) return;
            firstNum = firstNum.concat(number);
            display.textContent = firstNum;
        } else {
            if(number == "." && secondNum.includes(".")) return;
            secondNum = secondNum.concat(number);
            display.textContent = secondNum;
        }
}

// Give functionality to the number buttons
numbers.forEach((button) => {
    button.addEventListener("click", () => {
        calcInputHandler(button.textContent)
    })
})

// Function to handle operator input
function operatorSet(passedOperation) {
    if(operator == "") {
        operator = passedOperation
        display.textContent = "0"
    } else {
        handleEquals();
        operator = passedOperation
    }
}

// Give functionality to the operator buttons
operations.forEach((button) => {
    button.addEventListener("click", () => {
        operatorSet(button.id)
    })
})

const equals = document.querySelector("[data-equals]")
equals.addEventListener("click", () => {
    handleEquals();
})

function handleEquals() {
    if(isNaN(Number(firstNum)) || isNaN(Number(secondNum))) {
        firstNum = "0"
        secondNum = operator = ""
        displayFirstNum()
        alert("Something went wrong, NaN returned")
        return;
    }

    switch(operator){
        // Make sure you add .toString() to the end of each operation, since these maths portions return a number.
        // this is needed so you can use .concat() for the number entry.
        case "add":
            firstNum = (round(
                Number(firstNum) + Number(secondNum)
                )).toString();
            secondNum = operator = ""
            displayFirstNum();
        break;
        case "subtract":
            firstNum = (round(
                Number(firstNum) - Number(secondNum)
                )).toString();
            secondNum = operator = ""
            displayFirstNum()
        break;
        case "divide":
            // Prevent Dividing By Zero
            if(secondNum == "0") {
                firstNum = "0"
                secondNum = operator = ""
                displayFirstNum()
                alert("Don't divide by zero you troglodyte")
                return;
            }
            firstNum = (round(
                Number(firstNum) / Number(secondNum)
                )).toString();
            secondNum = operator = ""
            displayFirstNum()
        break;
        case "multiply":
            firstNum = (round(
                Number(firstNum) * Number(secondNum)
                )).toString();
            secondNum = operator = ""
            displayFirstNum()
        break;
        default:
            console.log("Something is missing! Resetting Everything")
            firstNum = firstNum.toString();
            secondNum = operator = ""
            displayFirstNum();
        break;
    }
}

// Function for removing last inputted digit
function back() {
        if(operator == "") {
            // Don't delete last character
            if(firstNum.length == 1) {
                firstNum = "0"
                displayFirstNum();
                return;
            };
            firstNum = firstNum.slice(0, -1)
            display.textContent = firstNum;
        } else {
            // Don't delete last character
            if(secondNum.length == 1) {
                secondNum = "0"
                display.textContent = secondNum;
                return;
            };
            secondNum = secondNum.slice(0, -1);
            display.textContent = secondNum;
        }
}

// Back button invokes back()
calcBack = document.querySelector("#back")
calcBack.addEventListener("click", back)

// Clear button
function clearCalc() {
    firstNum = "0"
    secondNum = operator = ""
    displayFirstNum()
}

clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", clearCalc)

// Keyboard Controls
window.addEventListener("keydown", (e) => {
    if (["1","2","3","4","5","6","7","8","9","0","."].includes(e.key)) {
        calcInputHandler(e.key)
    } else if (["*","/","+","-","Enter","=","Backspace","c"].includes(e.key)) {
        switch(e.key){
            case "*":
                operatorSet("multiply")
            break;
            case "/":
                operatorSet("divide")
            break;
            case "+":
                operatorSet("add")
            break;
            case "-":
                operatorSet("subtract")
            break;
            case "Enter":
                handleEquals();
            break;
            case "=":
                handleEquals();
            break;
            case "c":
                clearCalc()
            break;
            case "Backspace":
                back();
            break;
        }
    } else {
        return;
    }
})