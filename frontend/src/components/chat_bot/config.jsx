import { createChatBotMessage } from 'react-chatbot-kit';
import { Avatar } from './component/Avatar.jsx';
import { Header } from './component/Avatar.jsx';
import Options from './Options.jsx';
import StartBtn from './Component/StartBtn.jsx';

const Config = {
  botName: 'BUDDY BOT',
  initialMessages: [createChatBotMessage(`Welcome to BUDDY,click on start button to start!`, {
    widget: "startBtn"
  })],

  customComponents: {
    header: (props) => <Header {...props} />,
    botAvatar: (props) => <Avatar {...props} />,
  },
  widgets: [
    {
      widgetName: "startBtn",
      widgetFunc: (props) => <StartBtn {...props} />,
    },
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      mapStateToProps: ["checker"],
    },
  ],
};

export default Config;