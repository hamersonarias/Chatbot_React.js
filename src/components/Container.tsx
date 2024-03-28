import React from 'react';
import styles from './Container.module.scss';

import type { IContainerProps, IMyGptConfigJson } from './TypeDefinitions';
import { IconButton } from '@fluentui/react/lib/Button';
import { IIconProps, } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';

import MyGptLogo from "../assets/MyGptLogo.svg";
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

    private myGptConfigJson: IMyGptConfigJson = JSON.parse(this.props.config);

    private handleClickOverlay = (): void => {
        this.setState(prevstate => ({ isSidebarOpen: !prevstate.isSidebarOpen }));
    }
    
    componentDidMount(): void {
        initializeIcons(undefined, { disableWarnings: true });
    }

    public render(): React.ReactElement<IContainerProps> {

        const closeIconProps: IIconProps = { iconName: 'cancel',  };
        
        return (
            <section className={`${styles.chatBot}`}>

                {this.myGptConfigJson.displayMode === "overlay" && <>
                    
                    <button onClick={this.handleClickOverlay} className={styles.overlay} >
                        <img src={this.props.chatBotProps.hostDomain + MyGptLogo} alt="MyGptLogo" height='30px' />
                    </button>
                    <div className={this.state.isSidebarOpen ? styles.sideBar : styles.sideBarClosed} >
                        <div className={styles.header}>
                            <div className={styles.logoContainer}>
                                <img src={this.props.chatBotProps.hostDomain + MyGptLogo} alt="MyGptLogo" height='24px' />
                                <span style={{fontSize:'18px', fontWeight:'bold'}}>MyGPT</span>
                            </div>
                            <IconButton iconProps={closeIconProps} onClick={this.handleClickOverlay} className={styles.sideBarCloseButton}/>
                        </div>

                        <Chat {...this.props}/>
                    </div>
                </> }

                {this.myGptConfigJson.displayMode === "embedded" && <Chat {...this.props}/>}

            </section>
        );
    }
}
