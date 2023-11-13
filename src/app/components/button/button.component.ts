import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input('color') color: 'blue' | 'orange' |'black' | 'red' | 'green' | 'yellow' |'transparent' =
    'transparent';

  @Input('type') type: 'buttom' | 'submit' = 'buttom';
  @Input('isDisabled') isDisabled: boolean | null = null;

  @Output('onClick') click = new EventEmitter<MouseEvent>();

  onClick() {
    this.click.emit();
  }
}
