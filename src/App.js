import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  { name: "malevolent",
    definition: "having or showing a wish to do evil to others"},
  { name: "pejorative",
    definition: "expressing contempt or disapproval"}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: list,
      index: 0,
      hideMeaning: true,
    }

    this.getNextWord = this.getNextWord.bind(this);
    this.getPreviousWord = this.getPreviousWord.bind(this);
    this.showDefinition = this.showDefinition.bind(this);
    this.nameOnChange = this.nameOnChange.bind(this);
    this.defOnChange = this.defOnChange.bind(this);
    this.addWord = this.addWord.bind(this);
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
    const len = words.length;
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

  addWord() {
    const newWord = {
      name: this.state.addWordName,
      definition: this.state.addWordDef
    }
    const list = [...this.state.words, newWord];
    this.setState({words: list});
  }

  render() {
    const words = this.state.words;
    const index = this.state.index;
    const hidden = this.state.hideMeaning;

    return (
      <div>
        <div>Word: {words[index].name}</div>
        <Meaning definition={words[index].definition}
          hidden={hidden} onClick={this.showDefinition}
        />
        <div className="interactions">
          <button onClick={this.getPreviousWord}>Prev</button>
          <button onClick={this.getNextWord}>Next</button>
        </div>
        <div>
          <AddWord onClick={this.addWord}
            nameOnChange={this.nameOnChange}
            defOnChange={this.defOnChange}
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

function AddWord({onClick, nameOnChange, defOnChange}) {
  return (
    <div>
      Name:<input type="text"
        onChange={nameOnChange}
      ></input>
      <br />
      Definition:<textarea
        onChange={defOnChange}
      ></textarea>
      <br />
      <button onClick={onClick}>Create</button>
    </div>
  );
}

export default App;
