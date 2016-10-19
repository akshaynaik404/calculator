// OLD CODE

// function setOutputValue (value) {
//   $outputContainer.html(value);
// }
//
// function getInputValue (selectorObj) {
//   return selectorObj.attr("data-value");
// }
//
// function calcOutput(expression) {
//   return eval(expression).toString().slice(0, 12);
// }
// // function getExpression (operationType) {
// //   if(operationType === "delete") {
// //
// //   }
// // }
// // dom caching
// $calculator = $(".calculator");
// $buttons = $calculator.find(".btn");
// $outputContainer = $calculator.find(".output-container");
//
// var evalString = "";
// // console.log($buttons);
//
// //listen to click event on all buttons
// $buttons.click(function () {
//   // get input value and assign it to clickValue
//   var clickValue = getInputValue($(this));
//
//   if(clickValue === "C") {
//     // remove last character
//       // calculate evalString length
//       // var evalStringLength = evalString.length;
//
//       // remove length - 1 th character
//       // evalString = evalString.slice(0, -1);//       evalString = "";
//       setOutputValue("0");
//       // console.log("deleleted:" + evalString);
//   } else if (clickValue === "=") {
//     // evaluate expression
//     try {
//       // var outputValue = eval(evalString).toFixed(8);
//       var outputValue = calcOutput(evalString);
//       console.log(outputValue);
//
//     } catch (e) {
//       if(e instanceof SyntaxError) {
//         setOutputValue("Error");
//         evalString = "";
//       } else {
//         throw(e);
//       }
//     }
//
//
//     setOutputValue(outputValue);
//     if (outputValue != undefined) {
//       evalString = outputValue.toString();
//       console.log("output is :" + outputValue);
//     }
//   } else {
//     // add values to expression
//
//     // add / remove new value to the expression
//     evalString = evalString + clickValue;
//     console.log(evalString);
//
//     // show totla expression in output box
//
//     setOutputValue(evalString);
//   }
//
//
//   // var expression;
// });
// // console.log(evalString);




// NEW CODE - USING OBJECT LITERAL PATTERN
var calculator = {
    start: function() {
        // DOM caching
        this.$calculator = $(".calculator");
        this.$buttons = this.$calculator.find(".btn");
        this.$buttons.click(this._clickHandler);

        this._init();
    },
    _init: function() {
        this._setExpression("");
    },
    _evaluate: function() {
        var output;
        try {
            output = eval(this.expression);
        } catch (e) {
            if (e instanceof SyntaxError) {
                this._showError();
            } else {
                throw (e);
            }
        }
        if (output != undefined) {
            if (Number.isInteger(output)) {
                return output;
            } else {
                return output.toFixed(4);
            }
        } else {
            this._showError();
        }
    },
    _clickHandler: function(e) {

        $clickedBtn = $(this);
        clickedBtnValue = $clickedBtn.attr("data-value");
        // console.log(clickedBtnValue);
        // literals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "."];
        switch (clickedBtnValue) {
            case "C":
                calculator._setExpression("");
                break;
            case "=":
                calculator._setExpression(calculator._evaluate());
                break;
            case "del":
                calculator._removeFromExp();
                break;
            default:
                calculator._addToExp(clickedBtnValue);
        }
    },
    _addToExp: function(literal) {
        this.expression = this.expression + literal;
        this._setOutput(this.expression);
    },
    _removeFromExp: function() {
        this.expression = this.expression.slice(0, -1);
        this._setOutput(this.expression);
    },
    _setOutput: function(value) {
        this.output = value;
        this.$calculator.find(".output-container").html(this.output);
        console.log("expression is: " + this.output);
    },
    _setExpression: function(expression) {
        this.expression = expression;
        this._setOutput(this.expression);
    },
    _showError: function() {
        this._setExpression("");
        this._setOutput("Error");
    }
}
$(function() {
    calculator.start();
});
