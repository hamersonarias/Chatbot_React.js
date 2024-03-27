import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Container from './components/Container';
import reportWebVitals from './reportWebVitals';

const ChatBotReact = document.getElementsByTagName('my-gpt')[0] as HTMLElement;
const root = ReactDOM.createRoot(ChatBotReact);
const siteUrl = ChatBotReact.getAttribute("siteUrl")??"";
const config = ChatBotReact.getAttribute("config")??"";
root.render(
  //<React.StrictMode>
    <Container siteUrl={siteUrl} config={config} />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
