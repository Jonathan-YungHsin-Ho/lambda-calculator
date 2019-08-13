import React from 'react';
import './Numbers.css';

const NumberButton = props => {
  return (
    <div>
      {/* Display a button element rendering the data being passed down from the parent container on props */}
      <button className="btn-number">{props.value}</button>
    </div>
  );
};

export default NumberButton;
