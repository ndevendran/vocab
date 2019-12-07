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
      index: this.props.index,
      hideMeaning: true
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
    const currentIndex = this.state.index;
    const nextIndex = currentIndex + 1;
    const words = this.props.words;
    const len = words.length;

    if(nextIndex >= len) {
      this.setState({index: 0, hideMeaning: true});
    } else {
      this.setState({index: nextIndex, hideMeaning: true});
    }
  }

  getPreviousWord() {
    const previousIndex = this.state.index-1;
    if(previousIndex <= 0) {
      this.setState({ index: 0, hideMeaning: true});
    } else {
      this.setState({index: previousIndex, hideMeaning: true});
    }
  }

  render () {
    const hideMeaning = this.state.hideMeaning;
    const word = this.props.words[this.state.index];
    const hideStep = this.props.hideStep;
    return (
      <div className="flashcard">
      {hideStep
        ? <div></div>
        :
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
      }
      </div>
    );
  }
}

export default Flashcard;
