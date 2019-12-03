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
  )
}

export default App;
