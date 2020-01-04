import React, {Component} from 'react';
import './index.css';
import AddWord from '../AddWord';
import Flashcard from '../Flashcard';
import WordList from '../WordList';
import Toast from '../Notifications/Toast.js';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const list = [
  { name: "malevolent",
    definition: "having or showing a wish to do evil to others"},
  { name: "pejorative",
    definition: "expressing contempt or disapproval"}
];

const notifications = [
  {key: 'abate', header: 'Added new word!', body: 'Added new word abate!'}
];

const FLASHCARD = "flashcard";
const DEFAULT_STEP = "flashcard";
const ADD_WORD = "add";
const WORD_LIST = "list";

AddWord.propTypes = {
  addWord: PropTypes.func,
};

Flashcard.propTypes = {
  words: PropTypes.array,
};

WordList.propTypes = {
  words: PropTypes.array,
};

Nav.Item.propTypes = {
  onClick: PropTypes.func
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: this.props.list || list,
      name: "",
      definition: "",
      currentStep: DEFAULT_STEP,
      notifications: notifications,
    }

    this.addWord = this.addWord.bind(this);
    this.setStep = this.setStep.bind(this);
    this.onChangeDefinition = this.onChangeDefinition.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.dismissNotification = this.dismissNotification.bind(this);
  }

  dismissNotification(key) {
    const notifications = this.state.notifications.filter(notification => !(notification.key === key));
    this.setState({notifications: notifications});
  }

  setStep(step) {
    this.setState({currentStep: step});
  }

  addWord() {
    const newWord = {name: this.state.name,
        definition: this.state.definition};
    const duplicate = this.state.words
      .filter(word => word.name === newWord.name);
    if(duplicate.length > 0) {
      alert("This word already exists. If you want to redefine it, delete the word from the word list first");
    } else {
      const list = [...this.state.words, newWord];
      const notify = {key: newWord.name,
          header: "Added new word!",
          body: `Added new word ${newWord.name}`,
      };
      const notifications = [...this.state.notifications, notify];
      this.setState({words: list, name: '', definition: '', notifications});
    }
  }

  onChangeDefinition(event) {
    this.setState({definition: event.target.value});
  }

  onChangeName(event) {
    this.setState({name: event.target.value});
  }

  render() {
    const words = this.state.words;

    return (
      <div className="App">
          <Nav variant="tabs" className="navigation">
            <Nav.Item id="addWord" onClick={() => this.setStep(ADD_WORD)}>
            <Nav.Link>Add Word</Nav.Link></Nav.Item>
            <Nav.Item id="flashcards" href="" onClick={() => this.setStep(FLASHCARD)}>
            <Nav.Link>Flashcards</Nav.Link></Nav.Item>
            <Nav.Item id="wordList" href="" onClick={() => this.setStep(WORD_LIST)}>
            <Nav.Link>Word List</Nav.Link></Nav.Item>
          </Nav>
          <div>
            { this.state.currentStep === ADD_WORD
              ?
              <AddWord addWord={this.addWord}
                name={this.state.name}
                definition={this.state.definition}
                onChangeDefinition={this.onChangeDefinition}
                onChangeName={this.onChangeName}
              />
              : null
            }
          </div>
          <div>
            {this.state.currentStep === FLASHCARD
              ?
              <Flashcard
                words={words}
              />
              :null
            }
          </div>
          <div>
            {this.state.currentStep === WORD_LIST
              ?
              <WordList
                words={this.state.words}
              />
              :null
            }
          </div>
          <div>
            <Toast notifications={this.state.notifications}
              dismissNotification={this.dismissNotification}/>
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
//TO DO: Remove hide step from App and all components. simplify components

export default App;
