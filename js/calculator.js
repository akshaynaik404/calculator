function setOutputValue (value) {
  $outputContainer.html(value);
}

function getInputValue (selectorObj) {
  return selectorObj.attr("data-value");
}

function calcOutput(expression) {
  return eval(expression).toString().slice(0, 12);
}
// function getExpression (operationType) {
//   if(operationType === "delete") {
//
//   }
// }
// dom caching
$calculator = $(".calculator");
$buttons = $calculator.find(".btn");
$outputContainer = $calculator.find(".output-container");

var evalString = "";
// console.log($buttons);

//listen to click event on all buttons
$buttons.click(function () {
  // get input value and assign it to clickValue
  var clickValue = getInputValue($(this));

  if(clickValue === "C") {
    // remove last character
      // calculate evalString length
      // var evalStringLength = evalString.length;

      // remove length - 1 th character
      // evalString = evalString.slice(0, -1);
      evalString = "";
      setOutputValue("0");
      // console.log("deleleted:" + evalString);
  } else if (clickValue === "=") {
    // evaluate expression
    try {
      // var outputValue = eval(evalString).toFixed(8);
      var outputValue = calcOutput(evalString);
      console.log(outputValue);

    } catch (e) {
      if(e instanceof SyntaxError) {
        setOutputValue("Error");
        evalString = "";
      } else {
        throw(e);
      }
    }


    setOutputValue(outputValue);
    if (outputValue != undefined) {
      evalString = outputValue.toString();
      console.log("output is :" + outputValue);
    }
  } else {
    // add values to expression

    // add / remove new value to the expression
    evalString = evalString + clickValue;
    console.log(evalString);

    // show totla expression in output box

    setOutputValue(evalString);
  }


  // var expression;
});
// console.log(evalString);
