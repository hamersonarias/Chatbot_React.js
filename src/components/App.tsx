import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './App.module.scss';


import sendImg from "../assets/send.svg";

interface Props {
    siteUrl: string;
    config: string;
}
interface chatItem {
    isBot:boolean;
    message:string;
}

const App = (props:Props):React.ReactElement => {

    const [inputValue, setInputValue] = useState("");
    const configJson = JSON.parse(props.config);
    const configPretty = JSON.stringify(configJson, null, '\t');
    const [chatArray, setChatArray] = useState<chatItem[]>([
        {
            isBot:true,
            message:"Hi, I'm MyGPT, the AI powered chatbot. How can I help you?"
        },
        {
            isBot:true,
            message:`Site URL: ${props.siteUrl}`
        },
        {
            isBot:true,
            message:`Config: ${configPretty}`
        }
]);

    const handleChangeInput = (event:ChangeEvent<HTMLInputElement>):void => {
        setInputValue(event.target.value);
    }

    const handleSendButton = () => {
        // add input text to chat
        setChatArray([...chatArray, {
            isBot:false,
            message:inputValue
        }]);
        setInputValue("");
    }

    const handleKeyDown = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {handleSendButton();}
    }

    return (
        <section className={styles.app}>
            <div className={styles.chatContainer} >
                {chatArray.map((chatItem, index)=>{
                    return ( 
                        <div className={chatItem.isBot ? styles.botTextContainer : styles.userTextContainer} key={index}>
                            <div className={`${styles.text} ${chatItem.isBot ? styles.bot : styles.user}`}>
                                {chatItem.message}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.inputContainer}>
                <input value={(inputValue)} onChange={handleChangeInput} onKeyDown={handleKeyDown} className={styles.userInput} type="text" placeholder="Type your question here"></input>
                <button onClick={handleSendButton} className={styles.sendButton}>
                    <img src={"https://whizzy-chatbotreact.netlify.app/" + sendImg} height="20px" style={{opacity: '0.4'}} alt="send"/>
                </button>
            </div>

        </section>
    );
}

export default App;
