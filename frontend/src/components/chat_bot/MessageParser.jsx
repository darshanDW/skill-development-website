import React from 'react';

const MessageParser = ({ children, actions }) => {
     const parse = (message) => {
         const { checker } = children.props.state;
 
        if (checker === "name") {
            actions.afterNameMessage();
            children.props.state.userData = { name: message }; // Initialize userData with name
        } else if (checker === "options") {
            actions.handleOption(message);
        }
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;