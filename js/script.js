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
}

function calculateInput() {
    let currentOperator = this.value;
    if(selectedNumer == "0"){
        selectedNumer = '';
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
            var data = selectedNumer.replaceAll(' ', '').split(/(?=[-+*\%/])/);
            const result = math.parse(selectedNumer.replaceAll(' ', ''));
            const finalResult = result.compile();
            // for (let i = 0; i < data.length; i++) {
            //   total = displayTotal(total, data[i]);
            // }
            document.getElementById("lblTotal").innerText = finalResult.evaluate(); // total;
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