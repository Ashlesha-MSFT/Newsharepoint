// // A file is required to be in the root of the /src directory by the TypeScript compiler
// import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import YourWebPart from './webparts/button/components/ButtonWebPart';  // Import the ButtonWebPart component

// export default class ButtonWebPart extends BaseClientSideWebPart<{}> {
//     public render(): void {
//         const element = React.createElement(YourWebPart); // Create React element
//         ReactDOM.render(element, this.domElement);  // Render to the DOM element in the web part container
//       }
    
//       // Ensure proper unmounting of the component when the web part is disposed
//       public onDispose(): void {
//         ReactDOM.unmountComponentAtNode(this.domElement); // Unmount the component to avoid memory leaks
//       }
// }
