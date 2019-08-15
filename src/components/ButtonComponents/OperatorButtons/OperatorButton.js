import React from 'react';
import './Operator.css';

const OperatorButton = props => {
  return (
    <div>
      {/* Display a button element rendering the data being passed down from the parent container on props */}
      <button
        className="btn-operator"
        onClick={() => props.operator(props.value)}>
        {props.value}
      </button>
    </div>
  );
};

export default OperatorButton;
