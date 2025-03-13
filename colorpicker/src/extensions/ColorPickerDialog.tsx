import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { DialogFooter, DialogContent } from 'office-ui-fabric-react/lib/Dialog';
import { IColor } from 'office-ui-fabric-react/lib/Color';

interface IColorPickerDialogContentProps {
    message: string;
    close: () => void;
    submit: (color: IColor) => void;
    defaultColor?: IColor;
  }

  class ColorPickerDialogContent extends React.Component<IColorPickerDialogContentProps, {}> {
    private _pickedColor: IColor;
  
    constructor(props: IColorPickerDialogContentProps) {
        super(props);
        // Default Color
        this._pickedColor = props.defaultColor || { hex: 'FFFFFF', str: '', r: 255, g: 255, b: 255, h: 0, s: 0, v: 100 };
    }
  
    public render(): JSX.Element {
        return <DialogContent
            title='Color Picker'
            subText={this.props.message}
            onDismiss={this.props.close}
            showCloseButton={true}
        >
            <ColorPicker color={this._pickedColor} onChange={this._onColorChange} />
            <DialogFooter>
                <DefaultButton text='Cancel' title='Cancel' onClick={this.props.close} />
                <PrimaryButton text='OK' title='OK' onClick={() => { this.props.submit(this._pickedColor); }} />
            </DialogFooter>
        </DialogContent>;
    }
  
    private _onColorChange = (ev: React.SyntheticEvent<HTMLElement, Event>, color: IColor) => {
        this._pickedColor = color;
    }
}

  
   

  export default class ColorPickerDialog extends BaseDialog {
    public message: string;
    public colorCode: IColor;
  
    public render(): void {
      ReactDOM.render(<ColorPickerDialogContent
      close={ this.close }
      message={ this.message }
      defaultColor={ this.colorCode }
      submit={ this._submit }
      />, this.domElement);
    }
  
    public getConfig(): IDialogConfiguration {
      return { isBlocking: false };
    }
  
    protected onAfterClose(): void {
      super.onAfterClose();
  
      // Clean up the element for the next dialog
      ReactDOM.unmountComponentAtNode(this.domElement);
    }
  
    private _submit = (color: IColor) => {
      this.colorCode = color;
      this.close();
    }
  }