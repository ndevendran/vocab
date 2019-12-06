import React from 'react';
import {Button} from 'react-bootstrap';

function Meaning({definition, hidden, onClick}) {
  return (
    <div>
      {hidden
       ? <Button className="showDefinition" variant="info" onClick={onClick}>Show Definition</Button>
       : <span>{definition}</span>
      }
    </div>
  );
}

export default Meaning;
