import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import Config from './Config.jsx'
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import './Bot.css'


function Bot() {

  return (
    <div className="">
      <Chatbot
        config={Config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default Bot;