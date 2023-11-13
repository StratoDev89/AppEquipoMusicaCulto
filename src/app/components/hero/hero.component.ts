import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { GsapAnimationService } from 'src/app/services/gsap-animation.service';
import { SavedVerse } from 'src/app/utils/verses-dto';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit {
  bibleVerse: SavedVerse | null = null;
  text = 'equipo musica y culto';

  status: 'loading' | 'complete' = 'loading';

  @ViewChildren('spans')
  spans!: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChild('textTypeRef', { static: true })
  textTypeRef!: ElementRef<HTMLHeadElement>;

  @ViewChild('logoOrangeRef', { static: true })
  logoOrangeRef!: ElementRef<HTMLImageElement>;

  constructor(private gsapService: GsapAnimationService) {}

  ngOnInit(): void {
    this.status = 'loading';
  }

  ngAfterViewInit(): void {
    this.gsapService.isIntroDivsAnimationComplete$.subscribe(
      (isIntroComplete: boolean) => {
        if (isIntroComplete) {
          this.gsapService.heroTextAnimation(
            this.spans.map((span) => span.nativeElement)
          );

          this.gsapService.revealLogoAnimation(
            this.logoOrangeRef.nativeElement,
            this.textTypeRef.nativeElement
          );
        }
      }
    );
  }

  splitText(text: string) {
    return text.split('');
  }
}
