import { Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-magnetic',
  templateUrl: './magnetic.component.html',
  styleUrls: ['./magnetic.component.scss']
})
export class MagneticComponent {
  // select element
  @ViewChild('icon', { static: true }) icon!: ElementRef<HTMLDivElement>;


  ngAfterViewInit(): void {
    // define gsap using the QuickTo function to optimize the animation
    const xTo = gsap.quickTo(this.icon.nativeElement, 'x', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
    const yTo = gsap.quickTo(this.icon.nativeElement, 'y', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
    

    // add listeners to the element
    this.icon.nativeElement.addEventListener('mousemove', (e) => {
      const { x, y } = this.getPosition(e, this.icon);
      xTo(x*0.4);
      yTo(y*0.4);
    });

    this.icon.nativeElement.addEventListener('mouseleave', (e) => {
      xTo(0);
      yTo(0);
    });
  }

  getPosition(e: MouseEvent, element: ElementRef) {
    // mouse current position over the target element
    const { clientX, clientY } = e;

    // get data of the target element
    const { width, height, left, top } =
      element.nativeElement.getBoundingClientRect();

    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;

    return { x, y };
  }
}
