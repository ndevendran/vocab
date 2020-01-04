import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Meaning from '../Meaning';
import PropTypes from 'prop-types';

Button.propTypes = {
  onClick: PropTypes.func
};

Meaning.propTypes = {
  onClick: PropTypes.func,
  definition: PropTypes.string,
  hidden: PropTypes.bool
};


class Flashcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      hideMeaning: true,
    };

    this.getPreviousWord = this.getPreviousWord.bind(this);
    this.getNextWord = this.getNextWord.bind(this);
    this.showDefinition = this.showDefinition.bind(this);
  }

  showDefinition() {
    const hideMeaning = !this.state.hideMeaning;
    this.setState({hideMeaning: hideMeaning});
  }

  getNextWord() {
      this.setState((prevState) => {
        let newIndex;
        if((prevState.index + 1) === this.props.words.length) {
          newIndex = 0;
        } else {
          newIndex = prevState.index+1;
        }
        return {index: newIndex, hideMeaning: true};
      });
  }

  getPreviousWord() {
    this.setState((prevState) => {
      let newIndex;
      if(prevState.index === 0) {
        newIndex = this.props.words.length - 1;
      } else {
        newIndex = prevState.index - 1;
      }
      return {index: newIndex, hideMeaning: true};
    });
  }

  render () {
    const hideMeaning = this.state.hideMeaning;
    const word = this.props.words[this.state.index];
    return (
      <div className="flashcard">

          <div>
            <div className="word">Word: {word.name}</div>
            <Meaning definition={word.definition}
              hidden={hideMeaning} onClick={this.showDefinition}
            />
            <div className="interactions">
              <Button variant="primary" onClick={this.getPreviousWord}>Prev</Button>
              <Button variant="primary" onClick={this.getNextWord}>Next</Button>
            </div>
        </div>
      </div>
    );
  }
}

export default Flashcard;
