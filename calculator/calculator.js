const operand1Input = document.getElementById("operand1Input");
const operatorSelect = document.getElementById("operatorSelect");
const operand2Input = document.getElementById("operand2Input");
const resultInput = document.getElementById("resultInput");


function calculateAndDisplayResult() {
  const operand1 = parseFloat(operand1Input.value);
  const operand2 = parseFloat(operand2Input.value);
  const selectedOperator = operatorSelect.value;

  let result;

  switch (selectedOperator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "*":
      result = operand1 * operand2;
      break;
    case "/":
      result = operand1 / operand2;
      break;
    default:
      result = "";
      break;
  }

  if (isNaN(result)) {
    resultInput.value = "";
  } else {
    resultInput.value = result;
  }
}

operand1Input.addEventListener("input", calculateAndDisplayResult);
operand2Input.addEventListener("input", calculateAndDisplayResult);
operatorSelect.addEventListener("change", calculateAndDisplayResult);