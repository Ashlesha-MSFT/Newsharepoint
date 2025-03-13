declare interface IHelloWorld1CommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'HelloWorld1CommandSetStrings' {
  const strings: IHelloWorld1CommandSetStrings;
  export = strings;
}
