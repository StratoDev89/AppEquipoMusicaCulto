import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimationService } from 'src/app/services/gsap-animation.service';

@Component({
  selector: 'app-auto-slider',
  templateUrl: './auto-slider.component.html',
  styleUrls: ['./auto-slider.component.scss'],
})
export class AutoSliderComponent implements OnInit {
  @ViewChild('text1', { static: true }) text1!: ElementRef<HTMLDivElement>;
  @ViewChild('text2', { static: true }) text2!: ElementRef<HTMLDivElement>;
  @ViewChild('sliderTrack', { static: true }) sliderTrack!: ElementRef<HTMLDivElement>;

  @Input('text') text = '';
  Xpercent = 0;
  direction = -1;

  constructor(private gsapService: GsapAnimationService) {}

  animation = () => {
    if (this.Xpercent <= -100) {
      this.Xpercent = 0;
    }
    if (this.Xpercent > 0) {
      this.Xpercent = -100;
    }
    gsap.set(this.text1.nativeElement, { xPercent: this.Xpercent });
    gsap.set(this.text2.nativeElement, { xPercent: this.Xpercent });
    this.Xpercent += 0.1 * this.direction;
    requestAnimationFrame(this.animation);
  };

  ngOnInit(): void {
    this.gsapService.initSlider$.subscribe((isComplete) => {
      if (isComplete) {
        requestAnimationFrame(this.animation);
      }
    });
  }

  ngAfterViewInit(): void {
    this.gsapService.isIntroDivsAnimationComplete$.subscribe(
      (isIntroComplete: boolean) => {
        if (isIntroComplete) {
         
          this.gsapService.revealLogoAnimation(
            this.sliderTrack.nativeElement,
          );
        }
      }
    );
  }

}
