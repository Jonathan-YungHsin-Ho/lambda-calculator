import React, { useState } from 'react';
import './Numbers.css';

//import any components needed
import NumberButton from './NumberButton';

//Import your array data to from the provided data file
import { numbers } from '../../../data';

const Numbers = () => {
  // STEP 2 - add the imported data to state
  const [numberState, setNumberState] = useState(numbers);

  const numbersArray = numberState.map(element => (
    <NumberButton key="element" value={element} />
  ));

  return (
    <div className="numbers-container">
      {/* STEP 3 - Use .map() to iterate over your array data and return a button
       component matching the name on the provided file. Pass
       it any props needed by the child component*/}
      {numbersArray}
    </div>
  );
};

export default Numbers;
