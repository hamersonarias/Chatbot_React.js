import React from 'react';
// MUI
import CloseIcon from '@mui/icons-material/Close';

// assets
import myGptLogo from "../assets/myGptLogo.svg";
import clearChat from "../assets/clearChat.svg";
import help from "../assets/help.svg";

// components
import styles from './Container.module.scss';
import { IContainerProps, EDisplayMode } from './TypeDefinitions';
import Chat from './Chat';

// types
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

    private app: React.ReactElement = <>
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={this.props.chatBotProps.hostDomain + myGptLogo} alt="Logo" height='24px' />
                <span className={styles.logoText}>MyGPT</span>
            </div>
            <div className={styles.actionsContainer}>
                <div className={styles.clearChatContainer} onClick={this.clearChat} >
                    <span className={styles.clearText}>Clear chat</span>
                    <button className={styles.clearButton}>
                        <img src={this.props.chatBotProps.hostDomain + clearChat} alt="Clear" height='24px' />
                    </button>
                </div>
                <button className={styles.helpButton} onClick={this.toggleHelpMenu} >
                    <img src={this.props.chatBotProps.hostDomain + help} alt="help" height='24px' />
                </button>
                {this.props.gptProps.displayMode === EDisplayMode.overlay && 
                    <button className={styles.closeButton} onClick={this.toggleSidebar}><CloseIcon/></button> 
                }
            </div>
        </div>

        <Chat {...this.props} />
    </>
 
    componentDidMount(): void {
        //
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
