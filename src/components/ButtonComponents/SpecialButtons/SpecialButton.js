import React from 'react';
import './Special.css';

const SpecialButton = props => {
  return (
    <div>
      {/* Display a button element rendering the data being passed down from the parent container on props */}
      <button className="btn-special">{props.value}</button>
    </div>
  );
};

export default SpecialButton;
