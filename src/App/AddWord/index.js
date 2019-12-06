import 'React' from 'react';
import {InputGroup, Button} from 'react-bootstrap';

function AddWord({onClick, nameOnChange, defOnChange, name, def, hideStep}) {
  return (
    <div className="addWord">
      {hideStep
        ? <div></div>
        :
        <div>
        <InputGroup className="mb-3 wordInput">
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={nameOnChange}
            value={name}
          />
        </InputGroup>
          <br />
          <InputGroup className="definitionInput">
            <InputGroup.Prepend>
              <InputGroup.Text>Definition</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea"
              onChange={defOnChange}
              value={def}
            />
          </InputGroup>
          <br />
          <Button variant="primary" onClick={onClick}>Add Word</Button>
        </div>
      }
    </div>
  );
}
