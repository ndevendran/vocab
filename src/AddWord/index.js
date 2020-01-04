import React from 'react';
import {InputGroup, Button, FormControl} from 'react-bootstrap';

export default (props) =>
      <div className="addWord">
          <div>
            <InputGroup className="mb-3 wordInput">
              <InputGroup.Prepend>
                <InputGroup.Text>Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={props.onChangeName}
                value={props.name}
              />
            </InputGroup>
              <br />
              <InputGroup className="definitionInput">
                <InputGroup.Prepend>
                  <InputGroup.Text>Definition</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea"
                  onChange={props.onChangeDefinition}
                  value={props.definition}
                />
              </InputGroup>
              <br />
              <Button variant="primary" onClick={props.addWord}>Add Word</Button>
          </div>
      </div>
