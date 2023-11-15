import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { BehaviorSubject } from 'rxjs';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(CustomEase, ScrollTrigger);

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationService {
  constructor() {}

  isIntroDivsAnimationComplete$ = new BehaviorSubject<boolean>(false);
  initSlider = new BehaviorSubject<boolean>(false);
  initSlider$ = this.initSlider.asObservable();
  transitionTimeLine = gsap.timeline({ paused: true });

  introDivsAnimation(
    divs: HTMLDivElement[],
    section: HTMLDivElement,
    img: HTMLDivElement
  ) {
    const tl = gsap.timeline();
    let controlFlag = false;

    tl.to(divs, {
      y: '-100%',
      duration: 0.8,
      stagger: 0.09,
      delay: 1.5,
      ease: CustomEase.create('custom', '.75, 0, .25, 1'),
      onStart: () => {
        gsap.to(divs, {
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          duration: 0.5,
        });
      },
      onComplete: () => {
        gsap.to(section, {
          display: 'none',
        });
        this.initSlider.next(true);
      },
      onUpdate: () => {
        if (!controlFlag && tl.progress() >= 0.55) {
          controlFlag = true;
          this.isIntroDivsAnimationComplete$.next(true);
        }
      },
    }).to(
      img,
      {
        y: '-100%',
        duration: 0.8,
        delay: 0.6,
        ease: CustomEase.get('custom'),
      },
      '1'
    );
  }

  heroTextAnimation(spans: HTMLSpanElement[]) {
    gsap.to(spans, {
      y: '0',
      duration: 1.1,
      stagger: 0.03,
      ease: CustomEase.create('custom2', '0.8, 0, 0.1, 1'),
    });
  }

  arrowAnimation(img: HTMLDivElement) {
    const arrowTl = gsap.timeline({ paused: true });

    arrowTl.to(img, {
      rotateZ: 90,
      duration: 0.2,
    });

    return arrowTl;
  }

  navAnimationOnScroll(nav: HTMLDivElement, trigger: HTMLDivElement) {
    ScrollTrigger.create({
      trigger: trigger,
      start: 'start+=100 start',
      end: 'start start+=100',
      onEnter: () => {
        gsap.to(nav, {
          y: '-100%',
          duration: 0.7,
          ease: CustomEase.get('custom'),
        });
      },
      onEnterBack: () => {
        gsap.to(nav, {
          y: '0%',
          duration: 0.7,
          ease: CustomEase.get('custom'),
        });
      },
    });
  }

  revealTextAnimation(
    texts: HTMLParagraphElement[],
    textContainer: HTMLDivElement
  ) {
    gsap.to(texts, {
      y: 0,
      duration: 0.5,
      stagger: 0.1,

      scrollTrigger: {
        trigger: textContainer,
        start: 'bottom center+=100',
      },
    });
  }

  revealLogoAnimation(logo: HTMLImageElement | HTMLDivElement) {
    gsap.to(logo, {
      y: 0,
      duration: 1.1,
      ease: CustomEase.get('custom2'),
    });
  }
}
