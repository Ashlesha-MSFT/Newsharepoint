import {
  BaseListViewCommandSet,
  type Command,
  type IListViewCommandSetExecuteEventParameters,
} from "@microsoft/sp-listview-extensibility";
import * as React from "react";

export interface IArchiveCommandSetProperties {
  // Define properties here
}
import * as ReactDOM from "react-dom";
import CommandPanel from "../components/CommandPanel";

export default class ArchiveCommandSet extends BaseListViewCommandSet<IArchiveCommandSetProperties> {
  private _panelPlaceHolder: HTMLDivElement;

  public onInit(): Promise<void> {
    this._panelPlaceHolder = document.body.appendChild(
      document.createElement("div")
    );

    const archiveCommand: Command = this.tryGetCommand("COMMAND_ARCHIVE");
    archiveCommand.visible = true;

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case "COMMAND_ARCHIVE":
        this._renderPanelComponent();
        break;
      default:
        throw new Error("Unknown command");
    }
  }

  public onDispose(): void {
    ReactDOM.unmountComponentAtNode(this._panelPlaceHolder);
  }

  private _renderPanelComponent = (): void => {
    const element: React.ReactElement = React.createElement(CommandPanel);
    ReactDOM.render(element, this._panelPlaceHolder);
  };
}