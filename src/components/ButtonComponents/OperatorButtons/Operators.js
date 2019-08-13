import React, { useState } from 'react';
import './Operator.css';

//import any components needed
import OperatorButton from './OperatorButton';

//Import your array data to from the provided data file
import { operators } from '../../../data';

const Operators = () => {
  // STEP 2 - add the imported data to state
  const [operatorState, setOperatorState] = useState(operators);

  console.log(operatorState);

  const operatorsArray = operatorState.map(element => (
    <OperatorButton key="element.char" value={element.char} />
  ));

  return (
    <div className="operators-container">
      {/* STEP 3 - Use .map() to iterate over your array data and return a button
       component matching the name on the provided file. Pass
       it any props needed by the child component*/}
      {operatorsArray}
    </div>
  );
};

export default Operators;
