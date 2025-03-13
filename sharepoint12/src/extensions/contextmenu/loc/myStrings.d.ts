declare interface IContextmenuCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ContextmenuCommandSetStrings' {
  const strings: IContextmenuCommandSetStrings;
  export = strings;
}
