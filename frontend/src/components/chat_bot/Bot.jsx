import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import './Bot.css'


function Bot() {

  return (
    <div className="">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default Bot;