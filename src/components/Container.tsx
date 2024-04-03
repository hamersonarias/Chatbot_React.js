import React from 'react';
// MUI
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

// assets
import myGptLogo from "../assets/myGptLogo.svg";
//import clearChat from "../assets/clearChat.svg";
//import help from "../assets/help.svg";


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
                <img src={this.props.chatBotProps.hostDomain + myGptLogo} alt="Logo" />
                <span className={styles.logoText}>MyGPT</span>
            </div>
            <div className={styles.actionsContainer}>
                <button className={styles.clearButton} onClick={this.clearChat} >
                    <div className={styles.clearText}>Clear chat</div>
                    <DeleteOutlinedIcon/>
                    {/* <img src={this.props.chatBotProps.hostDomain + clearChat} alt="Clear" /> */}
                </button>
                <button className={styles.helpButton} onClick={this.toggleHelpMenu} >
                    <HelpOutlineOutlinedIcon/>
                    {/* <img src={this.props.chatBotProps.hostDomain + help} alt="help" /> */}
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
