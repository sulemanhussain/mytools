var _operators =document.getElementsByClassName("operator");
var _numbers = document.getElementsByClassName("number");
var selectedOperator = '';
var selectedNumer = 0;
var total = 0;
var tempValue = 0;
var displayText = '';

Array.from(_operators).forEach(function(element) {
    element.addEventListener('click', calculateInput);
 });

Array.from(_numbers).forEach(function(element) {
    element.addEventListener('click', getInput);
 });

function getInput() {
    var currentValue = this.value;
    if(selectedNumer == "0"){
        selectedNumer = '';
    }
    selectedNumer = selectedNumer + ' ' + currentValue;
    document.getElementById("lblCalculation").innerText = selectedNumer;
    document.getElementById("lblCalculation").scrollLeft += 100;
    printTotal();
}

function calculateInput() {
    let currentOperator = this.value;
    if(selectedNumer == "0"){
        return false;
    }
    if(isNaN(selectedNumer.substring(selectedNumer.length-2, selectedNumer.length).trim())){
        selectedNumer = selectedNumer.substring(0, selectedNumer.length-2);
    }
    total = parseFloat(total);
    switch(currentOperator){
        case "add":
            selectedNumer = selectedNumer + ' + ';
            break;
        case "subtract":
            selectedNumer = selectedNumer + ' - ';
            break;
        case "multiply":
            selectedNumer = selectedNumer + ' * ';
            break;
        case "divide":
            selectedNumer = selectedNumer + ' / ';
            break;
        case "modules":
            selectedNumer = selectedNumer + ' % ';
            break;
        case "equal":
            printTotal();
            break;
        case "clear":
            selectedNumer = '0';
            document.getElementById("lblTotal").innerText = '0';            
            break;
        case "backspace":
            selectedNumer = selectedNumer.substring(0, selectedNumer.length -2);
            break;
        default:
            break;
    }
    document.getElementById("lblCalculation").innerText = selectedNumer;
    document.getElementById("lblCalculation").scrollLeft += 100;
}

function printTotal(){
    //var data = selectedNumer.replaceAll(' ', '').split(/(?=[-+*\%/])/);
    const result = math.parse(selectedNumer.replaceAll(' ', ''));
    const finalResult = result.compile();
    let printResult = finalResult.evaluate();
    if(printResult != Infinity) {
        if(printResult % 1 !== 0) {
            let lengthofDecimals = printResult.toString().split('.')[1].length;
            if(lengthofDecimals > 5){
                lengthofDecimals = 5;
            }
            printResult = printResult.toFixed(lengthofDecimals);
        }
    }
    document.getElementById("lblTotal").innerText = printResult;
}

function displayTotal(total, inputValue) {
    let arithmaticOperator = inputValue.substring(0, 1);
    if(isNaN(arithmaticOperator)) {
        var _value = parseFloat(inputValue.substring(1, inputValue.length));
        
        switch(arithmaticOperator) {
            case "+":
                total = total +  _value;
                break;
            case "-":
                total = total -  _value;
                break;
            case "*":
                total = total *  _value;
                break;
            case "/":
                total = total /  _value;
                break;
            case "%":
                total = total %  _value;
                break;
        }
    } else {
        total = parseFloat(inputValue);
    }
    return total;
}

function toggleCalculator(){
    $("#chkCalculatorType").val();
}


/* Tick Toc Toe game */

var currentTurn = "X";
var currentTurnFlag = true; // if 1 it will print X else O;

var winningProbablity = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var gameStat = ['', '', '', '', '', '', '', '', ''];
var clearButtonClicked =  true;
var _boardCell = document.getElementsByClassName("tictactoe-board-cell");
Array.from(_boardCell).forEach(function(element) {
    element.addEventListener('click', fillCell);
 });

 function fillCell(){
    var _currentCell = this;
    var currentIndex = _currentCell.getAttribute("data-index");
    if(this.innerText == ""){
       if(currentTurnFlag) {
            this.innerText = "X";
            gameStat[currentIndex] = "X";
        } else {
            this.innerText = "O";
            gameStat[currentIndex] = "O";
        }
        _currentCell.setAttribute("disabled", true);
        currentTurnFlag = !currentTurnFlag;
        setTimeout(function() { 
            gameValidator();
        }, 300);
    }
 }

 function clearBoard() {
     if(gameStat.indexOf("X") == -1 && gameStat.indexOf("O") == -1) {
         return false;
     }
     var confirmation = true;
     if(clearButtonClicked == true) {
        confirmation = confirm("Are you sure to reset the game");
     } 
     if(confirmation) {
        _boardCell.forEach(function(cell) {
            cell.textContent = "";
            cell.setAttribute("disabled", false);
        });
        gameStat = ['', '', '', '', '', '', '', '', ''];
        currentTurnFlag = true;
        clearButtonClicked == true;
    }
 }

 function gameValidator() {
    winningProbablity.forEach(function(data){
        var a = gameStat[data[0]];
        var b = gameStat[data[1]];
        var c = gameStat[data[2]];
        if(a != "" && b != "" && c != "") {
            if(a == b && b == c) {
                alert("Player " + a +" won the game. ");
                clearButtonClicked = false;
                clearBoard();
                var result = 0;
                if(a == "X"){
                    var X = document.getElementById("txtX");
                    result = parseInt(X.innerText);
                    result++;
                     X.innerText = result.toString();   
                } else {
                    var O = document.getElementById("txtO");
                    result = parseInt(O.innerText);
                    result++;
                    O.innerText = result.toString();
                 }
            }
        }
    });

    if(gameStat.indexOf("") == -1) {
        clearButtonClicked = false;
        alert("Draw");
        clearBoard();
        return false;
    }
 }

 function newGame(){
     window.location.reload();
 }