import React, {Component} from 'react';
import {InputGroup, Button, FormControl} from 'react-bootstrap';

export default class AddWord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      def: ''
    }

    this.nameOnChange = this.nameOnChange.bind(this);
    this.defOnChange = this.defOnChange.bind(this);
    this.addWord = this.addWord.bind(this);
  }

  nameOnChange(event) {
    this.setState({ name: event.target.value });
  }

  defOnChange(event) {
    this.setState({ def: event.target.value });
  }

  addWord() {
    const name = this.state.name;
    const def = this.state.def;
    this.props.onClick(name, def);
    this.setState({
      name: '',
      def: ''
    });
  }

  render () {
    return (
      <div className="addWord">
        {this.props.hideStep
          ? <div></div>
          :
          <div>
          <InputGroup className="mb-3 wordInput">
            <InputGroup.Prepend>
              <InputGroup.Text>Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={this.nameOnChange}
              value={this.state.name}
            />
          </InputGroup>
            <br />
            <InputGroup className="definitionInput">
              <InputGroup.Prepend>
                <InputGroup.Text>Definition</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea"
                onChange={this.defOnChange}
                value={this.state.def}
              />
            </InputGroup>
            <br />
            <Button variant="primary" onClick={this.addWord}>Add Word</Button>
          </div>
        }
      </div>
    );
  }
}
