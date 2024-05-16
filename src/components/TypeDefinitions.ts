export interface IGptElConfigJson {
    scope: string;
    chatMode: string;
    displayTabs: string;
    displayMode: string;
}


// asset-manifest.json from GPT server
export interface IAssetManifest {
    entrypoints: string[]
}
export interface IConfigDefault {
    scope: string;
    chatMode: EChatMode;
    displayTabs: EBool;
    displayMode: EDisplayMode;
}
export interface IConfigJson {
    scope: string;
    chatMode: EChatMode;
    displayTabs: EBool;
    displayMode: EDisplayMode;
}
export enum EChatMode {
    chat = "chat",
    documentsearch = "documentsearch",
}
export enum EBool {
    yes = "yes",
    no = "no",
}
export enum EDisplayMode {
    embedded = "embedded",
    overlay = "overlay",
}

export interface IContainerProps {
    gptProps: IConfigDefault;
    chatBotProps: IChatBotProps;
}

export interface IChatBotProps {
    hostDomain: string;
}