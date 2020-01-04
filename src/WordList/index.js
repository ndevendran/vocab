import React from 'react';
import {Button} from 'react-bootstrap';
import './index.css';

export default function WordList({words, dismiss, onDelete}) {
  const list = words || [];
  return (
    <div className="wordList">
        <table className="wordList">
          <tbody>
          {list.map((word) => {
            return (
              <tr key={word.name}>
                <td>{word.name}</td>
                <td>
                <Button variant="secondary"
                  className="delete"
                  onClick={() => onDelete(word.name)}
                >
                  Delete
                </Button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
    </div>
  );
}
