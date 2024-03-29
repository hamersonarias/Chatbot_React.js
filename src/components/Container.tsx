import React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { IIconProps, } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';

import myGptLogo from "../assets/myGptLogo.svg";
import clearChat from "../assets/clearChat.svg";
import help from "../assets/help.svg";

import styles from './Container.module.scss';
import { IContainerProps, EDisplayMode } from './TypeDefinitions';
import Chat from './Chat';

interface IChatBotState {
    isSidebarOpen: boolean;
    externalChatBotHtml: string;
    isDomRendered: boolean;
}

export default class Container extends React.Component<IContainerProps, IChatBotState> {
    state = {
        isSidebarOpen: false,
        externalChatBotHtml: "",
        isDomRendered: false,
    }

    private toggleSidebar = (): void => {
        this.setState(prevstate => ({ isSidebarOpen: !prevstate.isSidebarOpen }));
    }
    private clearChat = (): void => {
        alert("chat cleared!")
    }
    private toggleHelpMenu = (): void => {
        alert("help menu!")
    }
    
    componentDidMount(): void {
        initializeIcons(undefined, { disableWarnings: true });
    }

    public render(): React.ReactElement<IContainerProps> {

        const closeIconProps: IIconProps = { iconName: 'cancel',  };
        
        return (
            <section className={`${styles.chatBot}`}>

                {this.props.gptProps.displayMode === EDisplayMode.overlay && <>
                    
                    <button onClick={this.toggleSidebar} className={styles.overlay} >
                        <img src={this.props.chatBotProps.hostDomain + myGptLogo} alt="myGptLogo" height='30px' />
                    </button>
                    <div className={this.state.isSidebarOpen ? styles.sideBar : styles.sideBarClosed} >
                        <div className={styles.header}>
                            <div className={styles.logoContainer}>
                                <img src={this.props.chatBotProps.hostDomain + myGptLogo} alt="MyGptLogo" height='24px' />
                                <span style={{fontSize:'18px', fontWeight:'bold'}}>MyGPT</span>
                            </div>
                            <div className={styles.clearChatContainer}>
                                <span>Clear chat</span>
                                <button onClick={this.clearChat} >
                                    <img src={this.props.chatBotProps.hostDomain + clearChat} alt="clearChat" height='30px' />
                                </button>
                            </div>
                            <button onClick={this.toggleHelpMenu} >
                                <img src={this.props.chatBotProps.hostDomain + help} alt="help" height='30px' />
                            </button>
                            <IconButton iconProps={closeIconProps} onClick={this.toggleSidebar} className={styles.sideBarCloseButton}/>
                        </div>

                        <Chat {...this.props}/>
                    </div>
                </> }

                {this.props.gptProps.displayMode === EDisplayMode.embedded && <Chat {...this.props}/>}

            </section>
        );
    }
}
