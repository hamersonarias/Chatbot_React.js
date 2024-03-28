export interface IMyGptConfigJson {
    scope: string;
    chatMode: string;
    displayTabs: string;
    displayMode: string;
}


// asset-manifest.json from MyGPT server
export interface IAssetManifest {
    entrypoints: string[]
}
export interface IConfig {
    scope: string;
    chatMode: string;
    displayTabs: string;
    displayMode: string;
    siteUrl: string;
}

export interface IContainerProps {
    siteUrl: string;
    config: string;
    chatBotProps: IChatBotProps;
}

export interface IChatBotProps {
    hostDomain: string;
}