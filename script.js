// Define buttons

const buttonClear = document.getElementsByClassName('buttonClear');
const deleteButton = document.getElementsByClassName('buttonDelete');
const buttonNumbers = document.getElementsByClassName('buttonNumber');
const buttonOperators = document.getElementsByClassName('buttonOperator');
const numberScreen = document.getElementById('numberScreen');
const equationHolder = document.getElementById('equationHolder');

//Event Handlers
window.onload = function eventListenerLoad() {
    for (var i = 0; i < buttonNumbers.length; i++) {
        buttonNumbers[i].addEventListener('click', show);
    };

    for (let element in buttonOperators){
        buttonOperators[element].addEventListener('click', addToEquation);
    }
};

buttonClear[0].addEventListener('click', clearScreen);
deleteButton[0].addEventListener('click', deleteLast)

//Screen
var equationDisplay = ""
var screenDisplay = "";

//Functions
function show() {
    let text = this.innerHTML;
    screenDisplay += text;
    numberScreen.innerHTML = screenDisplay;
    console.log(`Screen Display is now "${screenDisplay}"`);
}

function clearScreen() {
    console.log("clear");
    screenDisplay = ""
    equationDisplay = ""
    numberScreen.innerHTML = screenDisplay;
    equationHolder.innerHTML = equationDisplay
}

function deleteLast() {
    let length = screenDisplay.length;
    var displayArr = screenDisplay.split("");
    displayArr.splice(length-1,1);
    screenDisplay = displayArr.join("");
    numberScreen.innerHTML = screenDisplay;
}

function addToEquation(){
    if (this.innerHTML !== "="){
        let toAdd = " " + screenDisplay + " " + this.innerHTML;
        equationDisplay += toAdd;
        equationHolder.innerHTML = equationDisplay;
        screenDisplay = "";
        numberScreen.innerHTML = screenDisplay
    } else if (this.innerHTML == "="){
        let toAdd = " " + screenDisplay + " " + this.innerHTML;
        equationDisplay += toAdd;
        equationHolder.innerHTML = equationDisplay;
        solveEquation(equationDisplay)
    }
}

//solve equations
function solveEquation(equation){
    console.log(equation)
    equationArray = equation.split(" ")
    console.log(equationArray)
    const operators = ["/","*","+","-"];
    let result;

    for (var i = 0; i < operators.length; i++){
        while (equationArray.includes(operators[i])){
            let index = equationArray.indexOf(operators[i]);
            let operator = equationArray[index];
            let first = Number(equationArray[index - 1]);
            let second = Number(equationArray[index + 1]);
            let miniResult = solvePortion(first, second, operator);
            console.log("mini:" + miniResult)
            equationArray.splice(index-1, 3, miniResult);
        }
    }
    console.log(equationArray)
    return result
}


function solvePortion(first, second, operator){
    return (operator == "/") ? first/second :
    (operator == "*") ? first*second :
    (operator == "+") ? first+second :
    first-second;
}