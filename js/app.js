// initial vars
var inputNumber = document.getElementsByClassName("input");
var btnCalculate = document.getElementById("calculate");
var divLoading = document.getElementById("loading");
var divResult = document.getElementById("result");
var divResultNumber = document.getElementById("result-number");
var divDescription = document.getElementById("description");
var btnReset = document.getElementById("reset");

//hide elements
hideElement(divLoading);
hideElement(divResult);

window.onload = function(){
	// element events
	inputNumber[0].onchange = function(elem){
		changeInput(elem);
	};
	inputNumber[1].onchange = function(elem){
		changeInput(elem);
	};
	inputNumber[2].onchange = function(elem){
		changeInput(elem);
	};
	btnCalculate.onclick = function(){
		calculateInputs();
	}
	btnReset.onclick = function(){
		resetConfirm();
	}
}

function changeInput(elem){
	var value = elem.target.value;
	if(value != ""){
		elem.target.classList.add("notnull");
	}else{
		elem.target.classList.remove("notnull");
	}
}

function calculateInputs(){
	hideElement(btnCalculate);
	showElement(loading)

	var calculateProgress = setTimeout(function(){
		var values = getInputsValue();
		var result = values.number1 + values.number2 + values.number3;
		var description = getResultDescription(values);

		divResultNumber.innerHTML = result;
		divDescription.innerHTML = description.text;
		divResult.style.border = "2px solid "+description.color;
		divDescription.style.color = description.color;

		hideElement(loading);
		showElement(divResult);
		clearTimeout(calculateProgress);
	}, 1500);


}

function getInputsValue(){
	var number1 = (inputNumber[0].value == '') ? 0 : inputNumber[0].value;
	var number2 = (inputNumber[1].value == '') ? 0 : inputNumber[1].value;
	var number3 = (inputNumber[2].value == '') ? 0 : inputNumber[2].value;

	return {
		number1 : parseInt(number1),
		number2 : parseInt(number2),
		number3 : parseInt(number3),
	}
}

function hideElement(elem){
	elem.style.display = "none";
}

function showElement(elem){
	elem.style.display = "inline-block";
}

function getResultDescription(values){
	var count = 0;

	(values.number1 == values.number2) ? count++ : false;
	(values.number1 == values.number3) ? count++ : false;

	if(count == 2){
		return {
			text : "All numbers are same",
			color : "green"
		};
	}else if(count == 1){
		return {
			text : "There are 2 same numbers",
			color : "blue"
		}
	}else{
		return {
			text : "There is no same number",
			color : "red"
		}
	}
}

function resetConfirm(){
	swal({
		title: "Are you sure?",
		text: "reset this result ?",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((result) => {
		if (result) {
			resetResult();
		}
	});
}

function resetResult(){
	divResultNumber.innerHTML = "";
	divDescription.innerHTML = "";
	hideElement(divResult);
	showElement(btnCalculate);
}