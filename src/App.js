import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  { name: "malevolent",
    definition: "having or showing a wish to do evil to others"},
  { name: "pejorative",
    definition: "expressing contempt or disapproval"}
];

const FLASHCARD = "flashcard";
const DEFAULT_STEP = "flashcard";
const ADD_WORD = "add";
const LIST_WORDS = "list";


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

    this.getNextWord = this.getNextWord.bind(this);
    this.getPreviousWord = this.getPreviousWord.bind(this);
    this.showDefinition = this.showDefinition.bind(this);
    this.nameOnChange = this.nameOnChange.bind(this);
    this.defOnChange = this.defOnChange.bind(this);
    this.addWord = this.addWord.bind(this);
    this.setStep = this.setStep.bind(this);
    this.showDefinition = this.showDefinition.bind(this);
  }

  getNextWord() {
    const currentIndex = this.state.index;
    const nextIndex = currentIndex + 1;
    const words = this.state.words;
    const len = words.length;

    if(nextIndex >= len) {
      this.setState({index: 0, hideMeaning: true});
    } else {
      this.setState({index: nextIndex, hideMeaning: true});
    }
  }

  getPreviousWord() {
    const previousIndex = this.state.index-1;
    const words = this.state.words;
    if(previousIndex <= 0) {
      this.setState({ index: 0, hideMeaning: true});
    } else {
      this.setState({index: previousIndex, hideMeaning: true});
    }
  }

  showDefinition() {
    const hideMeaning = !this.state.hideMeaning;
    this.setState({hideMeaning: hideMeaning});
  }

  nameOnChange(event) {
    this.setState({ addWordName: event.target.value });
  }

  defOnChange(event) {
    this.setState({ addWordDef: event.target.value });
  }

  hideStep(step) {
    return !(step === this.state.currentStep);
  }

  setStep(step) {
    this.setState({currentStep: step});
  }

  addWord() {
    const newWord = {
      name: this.state.addWordName,
      definition: this.state.addWordDef
    }
    const list = [...this.state.words, newWord];
    this.setState({words: list, addWordName: '', addWordDef: ''});
  }

  render() {
    const words = this.state.words;
    const index = this.state.index;
    const hidden = this.state.hideMeaning;

    return (
      <div>
        <div className="navigation">
          <nav>
            <button onClick={() => this.setStep(ADD_WORD)}>Add Word</button>
            |<button href="" onClick={() => this.setStep(FLASHCARD)}>Flashcards</button>
            |<button href="" onClick={() => this.setStep(LIST_WORDS)}>Word List</button>
          </nav>
        </div>
          <div>
            <AddWord onClick={this.addWord}
              nameOnChange={this.nameOnChange}
              defOnChange={this.defOnChange}
              name={this.state.addWordName}
              def={this.state.addWordDef}
              hideStep={this.hideStep(ADD_WORD)}
            />
          </div>
          <div>
            <Flashcard getPreviousWord={this.getPreviousWord}
              getNextWord={this.getNextWord}
              word={words[index]}
              hideStep={this.hideStep(FLASHCARD)}
              hideMeaning={hidden}
              showDefinition={this.showDefinition}
            />
          </div>
      </div>
    );
  }
}

function Meaning({definition, hidden, onClick}) {
  return (
    <div>
      <span>Meaning:</span>
      {hidden
       ? <button onClick={onClick}>Show</button>
       : <span>{definition}</span>
      }
    </div>
  );
}

function AddWord({onClick, nameOnChange, defOnChange, name, def, hideStep}) {
  return (
    <div className="addWord">
      {hideStep
        ? <div></div>
        :
        <div>
          Name:<input type="text"
            onChange={nameOnChange}
            value={name}
          ></input>
          <br />
          Definition:<textarea
            onChange={defOnChange}
            value={def}
          ></textarea>
          <br />
          <button onClick={onClick}>Create</button>
        </div>
      }
    </div>
  );
}

function Flashcard({getPreviousWord, getNextWord,
  word, hideStep, hideMeaning, showDefinition}) {
  return (
    <div class="flashcard">
    {hideStep
      ? <div></div>
      :
        <div>
          <div>Word: {word.name}</div>
          <Meaning definition={word.definition}
            hidden={hideMeaning} onClick={showDefinition}
          />
          <div className="interactions">
            <button onClick={getPreviousWord}>Prev</button>
            <button onClick={getNextWord}>Next</button>
          </div>
      </div>
    }
    </div>
  );
}

//TO DO: Component Composition for simple navigation
//TO DO: Component Composition for confirmation
//TO DO: Component Composition for loading

export default App;
