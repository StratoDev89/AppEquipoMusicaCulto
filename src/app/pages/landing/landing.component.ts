import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  // Element reference to start the animation
  @ViewChild('triggerReference', { static: true })
  triggerReference!: ElementRef<HTMLDivElement>;
}
