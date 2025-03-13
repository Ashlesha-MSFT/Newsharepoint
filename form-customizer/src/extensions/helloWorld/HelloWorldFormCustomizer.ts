import {
  BaseFormCustomizer
} from '@microsoft/sp-listview-extensibility';

import styles from './HelloWorldFormCustomizer.module.scss';

import { FormDisplayMode } from '@microsoft/sp-core-library';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import * as strings from 'HelloWorldFormCustomizerStrings';

export interface IHelloWorldFormCustomizerProperties {
  sampleText?: string;
}

export default class HelloWorldFormCustomizer
  extends BaseFormCustomizer<IHelloWorldFormCustomizerProperties> {

  private _item: {
    Title?: string;
  };
  private _etag?: string;

  public onInit(): Promise<void> {
    if (this.displayMode === FormDisplayMode.New) {
      return Promise.resolve();
    }

    return this.context.spHttpClient
      .get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.context.list.title}')/items(${this.context.itemId})`, SPHttpClient.configurations.v1, {
        headers: {
          accept: 'application/json;odata.metadata=none'
        }
      })
      .then(res => {
        if (res.ok) {
          this._etag = res.headers.get('ETag') as string | undefined;
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .then(item => {
        this._item = item;
        return this._setNewFormClientSideComponentId(); // Call the method here
      });
  }

  public render(): void {
    if (this.displayMode === FormDisplayMode.Display) {
      this.domElement.innerHTML =
        `<div class="${styles.helloWorld}">
          <label for="title">${strings.Title}</label>
          <br />
          ${this._item?.Title}
          <br />
          <br />
          <input type="button" id="cancel" value="${strings.Close}" />
        </div>`;

      const cancelButton = document.getElementById('cancel');
      if (cancelButton) {
        cancelButton.addEventListener('click', this._onClose.bind(this));
      }
    } else {
      this.domElement.innerHTML =
        `<div class="${styles.basics}">
          <label for="title">${strings.Title}</label><br />
          <input type="text" id="title" value="${this._item?.Title || ''}"/>
          <br />
          <br />
          <input type="button" id="save" value="${strings.Save}" />
          <input type="button" id="cancel" value="${strings.Cancel}" />
          <br />
          <br />
          <div class="${styles.error}"></div>
        </div>`;

      const saveButton = document.getElementById('save');
      if (saveButton) {
        saveButton.addEventListener('click', this._onSave.bind(this));
      }

      const cancelButton = document.getElementById('cancel');
      if (cancelButton) {
        cancelButton.addEventListener('click', this._onClose.bind(this));
      }
    }
  }

  public onDispose(): void {
    super.onDispose();
  }

  private _onSave = async (): Promise<void> => {
    this.domElement.querySelectorAll('input').forEach(el => el.setAttribute('disabled', 'disabled'));
    const errorElement = this.domElement.querySelector(`.${styles.error}`);
    if (errorElement) {
      errorElement.innerHTML = '';
    }

    let request: Promise<SPHttpClientResponse> = Promise.reject(new Error('Request not initialized'));
    const title: string = (document.getElementById('title') as HTMLInputElement).value;

    switch (this.displayMode) {
      case FormDisplayMode.New:
        request = this._createItem(title);
        break;
      case FormDisplayMode.Edit:
        request = this._updateItem(title);
    }

    const res: SPHttpClientResponse = await request;

    if (res.ok) {
      this.formSaved();
    } else {
      const error: { error: { message: string } } = await res.json();
      const errorElement = this.domElement.querySelector(`.${styles.error}`);
      if (errorElement) {
        errorElement.innerHTML = `An error has occurred while saving the item. Please try again. Error: ${error.error.message}`;
      }
      this.domElement.querySelectorAll('input').forEach(el => el.removeAttribute('disabled'));
    }
  }

  private _createItem(title: string): Promise<SPHttpClientResponse> {
    return this.context.spHttpClient
      .post(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getByTitle('${this.context.list.title}')/items`, SPHttpClient.configurations.v1, {
        headers: {
          'content-type': 'application/json;odata.metadata=none'
        },
        body: JSON.stringify({
          Title: title
        })
      });
  }

  private _updateItem(title: string): Promise<SPHttpClientResponse> {
    return this.context.spHttpClient
      .post(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getByTitle('${this.context.list.title}')/items(${this.context.itemId})`, SPHttpClient.configurations.v1, {
        headers: new Headers({
          'content-type': 'application/json;odata.metadata=none',
          'if-match': this._etag || '',
          'x-http-method': 'MERGE'
        }),
        body: JSON.stringify({
          Title: title
        })
      });
  }

  private _onClose = (): void => {
    this.formClosed();
  }

  private _setNewFormClientSideComponentId = async (): Promise<void> => {
    const siteUrl = this.context.pageContext.web.absoluteUrl;
    const listId = this.context.list.guid.toString();
    const contentTypeId = "<content-type-id>";
    const customFormId = "<custom-form-id>";
    const accessToken = "<your-access-token>";

    const url = `${siteUrl}/_api/web/lists(guid'${listId}')/ContentTypes('${contentTypeId}')`;

    const headers = {
      "Accept": "application/json;odata=verbose",
      "Content-Type": "application/json;odata=verbose",
      "Authorization": `Bearer ${accessToken}`
    };

    const body = JSON.stringify({
      "NewFormClientSideComponentId": customFormId
    });

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: headers,
        body: body
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}