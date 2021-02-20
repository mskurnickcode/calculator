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

//keyboard event listender
document.addEventListener('keyup', keyboardPassthrough)

//Screen
var equationDisplay = ""
var screenDisplay = "";


//Functions
function show() {
    if (screenDisplay.includes(".") && this.innerHTML == "."){
        return alert("A number can only have one decimal.")
    }
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
        let toAdd = " " + screenDisplay + " ";
        equationDisplay += toAdd;
        let answer = solveEquation(equationDisplay);
        screenDisplay = answer;
        equationDisplay = "";
        equationHolder.innerHTML = equationDisplay;
        numberScreen.innerHTML = answer;
    }
}

//solve equations
function solveEquation(equation){
    console.log(equation)
    equationArray = equation.split(" ")
    console.log(equationArray)
    const operators = ["/","*","+","-"];

    //check for a divided by 0
    for (var i = 0; i < equationArray.length; i++) {
        if (equationArray[i] == "/" && equationArray[i+1] == "0"){
            return "Not possible to divide by 0";
        }
    }

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
    return equationArray[1];
}


function solvePortion(first, second, operator){
    return (operator == "/") ? first/second :
    (operator == "*") ? first*second :
    (operator == "+") ? first+second :
    first-second;
}

//add in keyboard event listening
function keyboardPassthrough(key){
    let typed = `${key.key}`;
    const operators = ["/","*","+","-","="];
    const digits = /[0-9]/ig;

    if (operators.includes(key.key)){
        for (let button in buttonOperators){
            if (buttonOperators[button].innerHTML == typed){
                buttonOperators[button].click();
                break;
            }
        }
    } else if(digits.test(typed)){
        for (let button in buttonNumbers){
            if (buttonNumbers[button].innerHTML == typed){
                buttonNumbers[button].click();
                break;
            }
        }
    }
}