import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    console.log("ActionProvider rendered");

    const initialAction = () => {
        console.log('initialAction called');
        const message = createChatBotMessage('Just type in your name to begin.');
        updateState(message, "name");
    }

    const afterNameMessage = () => {
        console.log('afterNameMessage called');
        const message = createChatBotMessage("What would you like to do?", {
            widget: "options",
        });
        updateState(message, "options");
    }

    const handleOption = (option) => {
        console.log('handleOption called with option:', option);
        let message;
        switch(option) {
            case '1':
                message = createChatBotMessage("Great! Let's play a game here are the steps. create account/login -> on navbar click game ->click play .");
                break;
            case '2':
                message = createChatBotMessage("Awesome! Let's read some content. create account/login -> on navbar click on skill -> access the content .");
                break;
            case '3':
                message = createChatBotMessage("Sure! Let's get in touch. go to navbar -> click on contact -> fill the form and submit.");
                break;
            default:
                message = createChatBotMessage("Please choose a valid option: 1, 2, or 3.");
                updateState(message, "options");
                return;
        }
        updateState(message);
    }

    const updateState = (message, checker) => {
        console.log('updateState called with checker:', checker);
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
            checker,
        }));
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        initialAction,
                        afterNameMessage,
                        handleOption,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;