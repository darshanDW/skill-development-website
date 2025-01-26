import React from 'react';
import './Bot.css';

const Options = (props) => {
  const options = [
    { text: "Play Game", handler: () => props.actionProvider.handleOption('1'), id: 1 },
    { text: "Read Content", handler: () => props.actionProvider.handleOption('2'), id: 2 },
    { text: "Contact", handler: () => props.actionProvider.handleOption('3'), id: 3 },
  ];

  return (
    <div className=" flex-auto options-container">
      {options.map((option) => (
        <button className='start-btn' key={option.id} onClick={option.handler} >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Options;