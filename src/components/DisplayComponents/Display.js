import React from 'react';
import './Display.css';

const Display = props => {
  return (
    <div className="display">
      {/* Display any props data here */}
      <h2>{props.display}</h2>
    </div>
  );
};

export default Display;
