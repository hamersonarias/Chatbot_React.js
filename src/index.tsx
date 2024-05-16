import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Container from './components/Container';
//import reportWebVitals from './reportWebVitals';
import { IChatBotProps, IConfigDefault, IConfigJson, EChatMode, EBool, EDisplayMode, IGptElConfigJson } from './components/TypeDefinitions'


// helperfunctions and vars start
// ------------------------------

const ChatBotProps: IChatBotProps = {
    hostDomain: "https://whizzy-chatbotreact.netlify.app"
}
const configFallback: IConfigDefault = {
    scope: "global",
    chatMode: EChatMode.documentsearch,
    displayTabs: EBool.no,
    displayMode: EDisplayMode.embedded,
}
const fetchConfigReturnDefaultOrFallback = async (): Promise<IConfigDefault> => {
    const url = ChatBotProps.hostDomain + '/config.json';
    try {
        const response = await fetch(url);
        if (response.ok) return await response.json() as IConfigDefault;
        else {
            alert(`Error fetching ${url}: '${response.statusText}'`);
            return configFallback
        }
    }
    catch (error) {
        alert(`Error fetching ${url}: see console`);
        console.log(`Error fetching ${url}:`, error);
        return configFallback;
    }
}
const isStringEmptyNullUndef = (string: string|null|undefined):boolean => {
    if ((string === "") || (string === null) || undefined) return true;
    return false;
}
// ----------------------------
// helperfunctions and vars end

// the config passed from the wrapper web part or the site where this chatbot is embedded, is the overrride for the default config.
// get both, and check if the props from the gpt tag are valid, if not, use the default config.

// get HTML anchor tag create react root
const gptEl = document.getElementsByTagName('my-gpt')[0] as HTMLElement;
const root = ReactDOM.createRoot(gptEl);

// get attributes of HTML anchor tag 'my-gpt'
let gptEl_configString = gptEl.getAttribute("config");

// fetch the configDefault
fetchConfigReturnDefaultOrFallback()
// use then, because await is not allowed in top level
.then((configDefaultOrFallbackJson) => {
    // props from the gpt tag passed to the container component. For now they are identical with the configDefaultOrFallbackJson, but it can change later.
    let configJson: IConfigJson = {...configDefaultOrFallbackJson};
    // if attribute gptEl_configString has value
    if (!isStringEmptyNullUndef(gptEl_configString)) {
        try { // if JSON.parse error, configDefaultOrFallbackJson is kept as gptProps
            let gptElConfigJson: IGptElConfigJson = JSON.parse(gptEl_configString!);
            // check values of parsed gptEl_configString
            if (isStringEmptyNullUndef(gptElConfigJson.scope)) configJson.scope = gptElConfigJson.scope;
            if (!isStringEmptyNullUndef(gptElConfigJson.chatMode) ) {
                switch (gptElConfigJson.chatMode) {
                    case EChatMode.chat: configJson.chatMode = EChatMode.chat; break;
                    case EChatMode.documentsearch: configJson.chatMode = EChatMode.documentsearch; break;
                    default: break; 
                }
            }
            if (!isStringEmptyNullUndef(gptElConfigJson.displayMode) ) {
                switch (gptElConfigJson.displayMode) {
                    case EDisplayMode.embedded: configJson.displayMode = EDisplayMode.embedded; break;
                    case EDisplayMode.overlay: configJson.displayMode = EDisplayMode.overlay; break;
                    default: break; 
                }
            }
            if (!isStringEmptyNullUndef(gptElConfigJson.displayTabs) ) {
                switch (gptElConfigJson.displayTabs) {
                    case EBool.no: configJson.displayTabs = EBool.no; break;
                    case EBool.yes: configJson.displayTabs = EBool.yes; break;
                    default: break; 
                }
            }
        }
        catch (error) {
            // if JSON.parse error, configDefaultOrFallbackJson is kept as gptProps
            console.log("Error parsing 'gptEl_configString': ", error);
        }
    };

    root.render(
        //<React.StrictMode>
        <Container gptProps={configJson} chatBotProps={ChatBotProps} />
        //</React.StrictMode>
    );
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

