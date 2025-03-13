import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './MinWebPart.module.scss';

export interface IMinWebPartProps {
}

export default class MinWebPart extends BaseClientSideWebPart<IMinWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.min }">
        <h1>Hello, SharePoint!</h1>
        <p>Welcome to your SPFx web part.</p>
      </div>
    `;
  }
  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
