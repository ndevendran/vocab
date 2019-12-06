import React from 'react';

export default function WordList({words, hideStep, dismiss}) {
  const list = words || [];
  return (
    <div className="wordList">
    {hideStep
      ? <div></div>
      :
        <div>
          {list.map((word) => {
            return <div key={word.name}>{word.name}</div>
          })}
        </div>
    }
    </div>
  );
}
