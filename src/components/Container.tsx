import React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
//import { initializeIcons } from '@fluentui/react/lib/Icons';
import { IIconProps } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';


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

    private cancelIconProps: IIconProps = { iconName: 'cancel' };
    private cancelButton: React.ReactElement = <IconButton iconProps={this.cancelIconProps} onClick={this.toggleSidebar} className={styles.sideBarCloseButton} />

    private app: React.ReactElement = <>
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={this.props.chatBotProps.hostDomain + myGptLogo} alt="Logo" height='24px' />
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>MyGPT</span>
            </div>
            <div className={styles.actionsContainer}>
                <div className={styles.clearChatContainer} onClick={this.clearChat} >
                    <span>Clear chat</span>
                    <button className={styles.clearButton}>
                        <img src={this.props.chatBotProps.hostDomain + clearChat} alt="Clear" height='24px' />
                    </button>
                </div>
                <button className={styles.helpButton} onClick={this.toggleHelpMenu} >
                    <img src={this.props.chatBotProps.hostDomain + help} alt="help" height='24px' />
                </button>
                {this.props.gptProps.displayMode === EDisplayMode.overlay && this.cancelButton }
            </div>
        </div>

        <Chat {...this.props} />
    </>
 



    componentDidMount(): void {
        initializeIcons(undefined, { disableWarnings: true });
    }

    public render(): React.ReactElement<IContainerProps> {


        return (
            <section className={`${styles.chatBot}`}>

                {this.props.gptProps.displayMode === EDisplayMode.overlay && <>

                    <button onClick={this.toggleSidebar} className={styles.overlay} >
                        <img src={this.props.chatBotProps.hostDomain + myGptLogo} alt="Logo" height='30px' />
                    </button>
                    <div className={this.state.isSidebarOpen ? styles.sideBar : styles.sideBarClosed} >
                        {this.app}
                    </div>
                </>}

                {this.props.gptProps.displayMode === EDisplayMode.embedded && this.app}

            </section>
        );
    }
}
