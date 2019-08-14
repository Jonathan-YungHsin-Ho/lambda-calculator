import React, { useState, useEffect } from 'react';
import './App.css';
// STEP 4 - import the button and display components
// Don't forget to import any extra css/scss files you build into the correct component

// Logo has already been provided for you. Do the same for the remaining components
import Logo from './components/DisplayComponents/Logo';
import Specials from './components/ButtonComponents/SpecialButtons/Specials';
import Numbers from './components/ButtonComponents/NumberButtons/Numbers';
import Operators from './components/ButtonComponents/OperatorButtons/Operators';
import Display from './components/DisplayComponents/Display';
import { equal } from 'uri-js';

function App() {
  // STEP 5 - After you get the components displaying using the provided data file, write your state hooks here.
  // Once the state hooks are in place write some functions to hold data in state and update that data depending on what it needs to be doing
  // Your functions should accept a parameter of the the item data being displayed to the DOM (ie - should receive 5 if the user clicks on
  // the "5" button, or the operator if they click one of those buttons) and then call your setter function to update state.
  // Don't forget to pass the functions (and any additional data needed) to the components as props
  const [display, setDisplay] = useState('');
  const [firstNum, setFirstNum] = useState(null);
  const [operation, setOperation] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [functional, setFunctional] = useState(true);
  const [numInputOn, setNumInputOn] = useState(true);

  const specialFunctions = input => {
    if (input === 'C') {
      setDisplay('');
      setFirstNum(null);
      setSecondNum(null);
      setOperation(null);
      setFunctional(true);
      setNumInputOn(true);
    } else if (functional && input === '+/-') {
      setDisplay(display * -1);
    } else if (functional && input === '%') {
      setDisplay(display / 100);
    }
  };

  const numDisplay = input => {
    if (functional && numInputOn) {
      const inputArr = [];
      inputArr.push(display.toString());
      inputArr.push(input.toString());
      setDisplay(Number(inputArr.join('')));
      inputArr.join('').length >= 14 && setNumInputOn(false);
    }
  };

  const operator = input => {
    if (functional) {
      if (input !== '=') {
        setNumInputOn(true);
        setFirstNum(display);
        setOperation(input);
        setDisplay('');
      } else if (input === '=') {
        setFunctional(false);
        setSecondNum(display);
      }
    }
  };

  const lengthCheck = input => {
    if (input > 99999999999999) {
      input = input.toExponential(8);
    } else if (input.toString().length >= 14) {
      input = input.toFixed(13 - input.toString().split('.')[0].length);
    }
    return input;
  };

  useEffect(() => {
    if (secondNum) {
      if (operation === '+') {
        let value = firstNum + secondNum;
        value = lengthCheck(value);
        setDisplay(value);
      } else if (operation === '-') {
        let value = firstNum - secondNum;
        value = lengthCheck(value);
        setDisplay(value);
      } else if (operation === 'x') {
        let value = firstNum * secondNum;
        value = lengthCheck(value);
        setDisplay(value);
      } else if (operation === '/') {
        let value = firstNum / secondNum;
        value = lengthCheck(value);
        setDisplay(value);
      }
    }
  }, [secondNum, operation, firstNum, display]);

  return (
    <div className="container">
      <Logo />
      <div className="App">
        {/* STEP 4 - Render your components here and be sure to properly import/export all files */}
        <Display display={display} />
        <div className="buttons">
          <div className="buttons-left">
            <Specials specialFunctions={specialFunctions} />
            <Numbers numDisplay={numDisplay} />
          </div>
          <div className="buttons-right">
            <Operators operator={operator} />
          </div>
        </div>
      </div>
      {/* <h1>Display: {display}</h1>
      <h1>FirstNum: {firstNum}</h1>
      <h1>Operator: {operation}</h1>
      <h1>SecondNum: {secondNum}</h1> */}
    </div>
  );
}

export default App;
