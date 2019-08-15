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
  const [newOperation, setNewOperation] = useState(true);
  const [numInputOn, setNumInputOn] = useState(true);

  // Re-initialize state
  const reInitState = () => {
    setDisplay('');
    setFirstNum(null);
    setSecondNum(null);
    setOperation(null);
    setNewOperation(true);
    setNumInputOn(true);
  };

  // Set functionality of special buttons
  const specialFunctions = input => {
    // Re-initializes state and restore functionality
    if (input === 'C') {
      reInitState();
    } else if (newOperation && input === '+/-') {
      setDisplay(display * -1);
    } else if (newOperation && input === '%') {
      setDisplay(display / 100);
    }
  };

  // Takes input as a string then converts to number with maximum 14 digits
  const numDisplay = input => {
    if (newOperation) {
      const inputArr = [];
      inputArr.push(display.toString());
      inputArr.push(input.toString());
      setDisplay(Number(inputArr.join('')));
      inputArr.join('').length >= 14 && setNumInputOn(false);
    } else if (!newOperation) {
      reInitState();
    }
  };

  // Functionality for operation buttons; //! need to update logic for operation chaining
  const operator = input => {
    if (newOperation) {
      if (input !== '=') {
        setFirstNum(display);
        setOperation(input);
        setDisplay('');
      } else if (input === '=') {
        setNewOperation(false);
        setSecondNum(display);
      }
    } else if (!newOperation) {
      if (input === '=') {
        setFirstNum(display);
      }
    }
  };

  // Limits display output of large numbers and irrational numbers in decimal form
  const lengthCheck = input => {
    if (input > 9999999999999) {
      input = input.toExponential(8);
    } else if (input.toString().length >= 14) {
      input = input.toFixed(13 - input.toString().split('.')[0].length);
    }
    return input;
  };

  // Calculate operations and update display
  useEffect(() => {
    if (secondNum) {
      if (operation === '+') {
        let value = firstNum + secondNum;
        setDisplay(lengthCheck(value));
      } else if (operation === '-') {
        let value = firstNum - secondNum;
        setDisplay(lengthCheck(value));
      } else if (operation === 'x') {
        let value = firstNum * secondNum;
        setDisplay(lengthCheck(value));
      } else if (operation === '/') {
        let value = firstNum / secondNum;
        setDisplay(lengthCheck(value));
      }
    }
  }, [secondNum, operation, firstNum]);

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
      {/* <h1>New Operation: {newOperation ? 'Yes' : 'No'}</h1>
      <h1>Display: {display}</h1>
      <h1>FirstNum: {firstNum}</h1>
      <h1>Operator: {operation}</h1>
      <h1>SecondNum: {secondNum}</h1> */}
    </div>
  );
}

export default App;
