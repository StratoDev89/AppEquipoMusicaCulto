import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { GsapAnimationService } from 'src/app/services/gsap-animation.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements AfterViewInit {
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLDivElement>;
  @ViewChild('img', { static: true }) img!: ElementRef<HTMLImageElement>;
  @ViewChildren('div') divs!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private gsapService: GsapAnimationService) {}

  ngAfterViewInit(): void {
    this.gsapService.introDivsAnimation(
      this.divs.map((div) => div.nativeElement),
      this.section.nativeElement,
      this.img.nativeElement
    );
  }
}
