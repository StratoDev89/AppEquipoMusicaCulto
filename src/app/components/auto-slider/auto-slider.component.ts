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
  @ViewChild('sliderTrack', { static: true })
  sliderTrack!: ElementRef<HTMLDivElement>;

  @Input('text') text = '';
  Xpercent = 0;
  @Input('direction') direction = -1;
  @Input('speed') speed = 0.1;
  @Input('bgColor') bgColor: 'none' | 'black' = 'none';
  @Input('fontSize') fontSize = 6.5;

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
    this.Xpercent += this.speed * this.direction;
    requestAnimationFrame(this.animation);
  };

  ngOnInit(): void {
    requestAnimationFrame(this.animation);
  }

  ngAfterViewInit(): void {
    this.gsapService.isIntroDivsAnimationComplete$.subscribe(
      (isIntroComplete: boolean) => {
        if (isIntroComplete) {
          this.gsapService.revealLogoAnimation(this.sliderTrack.nativeElement);
        }
      }
    );
  }
}
