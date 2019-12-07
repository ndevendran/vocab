import React, {Component} from 'react';
import './index.css';
import AddWord from '../AddWord';
import Flashcard from '../Flashcard';
import WordList from '../WordList';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const list = [
  { name: "malevolent",
    definition: "having or showing a wish to do evil to others"},
  { name: "pejorative",
    definition: "expressing contempt or disapproval"}
];

const FLASHCARD = "flashcard";
const DEFAULT_STEP = "flashcard";
const ADD_WORD = "add";
const WORD_LIST = "list";

AddWord.propTypes = {
  onClick: PropTypes.func,
  hideStep: PropTypes.bool
};

Flashcard.propTypes = {
  words: PropTypes.array,
  index: PropTypes.number,
  hideStep: PropTypes.bool,
  hideMeaning: PropTypes.bool
};

WordList.propTypes = {
  words: PropTypes.array,
  hideStep: PropTypes.bool
};

Nav.Item.propTypes = {
  onClick: PropTypes.func
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: list,
      index: 0,
      hideMeaning: true,
      addWordName: '',
      addWordDef: '',
      currentStep: DEFAULT_STEP,
    }

    this.addWord = this.addWord.bind(this);
    this.setStep = this.setStep.bind(this);
  }

  hideStep(step) {
    return !(step === this.state.currentStep);
  }

  setStep(step) {
    this.setState({currentStep: step});
  }

  addWord(name, def) {
    const newWord = {name: name, definition: def};
    const duplicate = this.state.words.filter(word => word.name === newWord.name);

    if(duplicate.length !== 0) {
      alert("This word already exists. If you want to redefine it, delete the word from the word list first");
    } else {
      const list = [...this.state.words, newWord];
      this.setState({words: list});
    }
  }

  render() {
    const words = this.state.words;
    const index = this.state.index;
    const hidden = this.state.hideMeaning;

    return (
      <div className="App">
          <Nav variant="tabs" className="navigation">
            <Nav.Item onClick={() => this.setStep(ADD_WORD)}><Nav.Link>Add Word</Nav.Link></Nav.Item>
            <Nav.Item href="" onClick={() => this.setStep(FLASHCARD)}><Nav.Link>Flashcards</Nav.Link></Nav.Item>
            <Nav.Item href="" onClick={() => this.setStep(WORD_LIST)}><Nav.Link>Word List</Nav.Link></Nav.Item>
          </Nav>
          <div>
            <AddWord onClick={this.addWord}
              hideStep={this.hideStep(ADD_WORD)}
            />
          </div>
          <div>
            <Flashcard
              words={words}
              index={index}
              hideStep={this.hideStep(FLASHCARD)}
              hideMeaning={hidden}
            />
          </div>
          <div>
            <WordList hideStep={this.hideStep(WORD_LIST)}
              words={this.state.words}
             />
          </div>
      </div>
    );
  }
}

//TO DO: Component Composition for simple navigation
//TO DO: Component Composition for confirmation
//TO DO: Component Composition for loading
//TO DO: Class Composition with persistence layer
//TO DO: Custom Button, Text Area, Input, and Navigation
//TO DO: Delete Word

export default App;
