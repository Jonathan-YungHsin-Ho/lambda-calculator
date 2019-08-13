import React from 'react';
import './Display.css';

const Display = props => {
  return (
    <div className="display">
      {/* Display any props data here */}
      <h2>0</h2>
      {props.display}
    </div>
  );
};

export default Display;
