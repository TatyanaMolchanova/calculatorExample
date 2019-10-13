const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    // console.log( { displayValue, waitingForSecondOperand })
    // console.log(calculator)
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    // console.log( { displayValue, waitingForSecondOperand })
    console.log(calculator)
  }
  
  function inputDecimal(dot) {

    // console.log(calculator.waitingForSecondOperand);

      if (calculator.waitingForSecondOperand === true) return;
    
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

    console.log(calculator);
  }
  
  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {

    // console.log(event);
      
    const { target } = event;

    // console.log({ target });
    // console.log(event);


    // is equivalent to
    // const target = event.target;
    
    //If the element that was clicked is not a button...
    if (!target.matches('button')) {
        // console.log(event);
        //exit the function
      return;
    }
  
    if (target.classList.contains('operator')) {
        // console.log({ target });
        // console.log(event);
        // console.log('operator', target.value);
      handleOperator(target.value);
          updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
      inputDecimal(target.value);
          updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
        // console.log('clear', target.value);
      resetCalculator();
          updateDisplay();
      return;
    }
  
    // console.log('digit', target.value);
    inputDigit(target.value);
    updateDisplay();
  });



  // Sourse: https://freshman.tech/calculator/

  
