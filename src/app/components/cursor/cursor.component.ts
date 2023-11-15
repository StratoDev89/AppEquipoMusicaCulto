import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { NavComponent } from '../nav/nav.component';
import { CursorService } from 'src/app/services/cursor.service';
import { windowCount } from 'rxjs';

gsap.registerPlugin(CustomEase);
type XYCords = { x: number; y: number };

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss'],
})
export class CursorComponent implements OnInit {
  @ViewChild('cursorRef', { static: true })
  cursorRef!: ElementRef<HTMLDivElement>;
  x = 0;
  y = 0;
  cursorSize = 15;
  hoverCords = {};
  windowScrollY = 0;

  @Input('navItemComponentRef') navItemComponentRef!: NavComponent;

  menuCenterCords!: XYCords;
  menuHeight = 0;
  menuWidth = 0;

  isliItemHovered = false;

  scale = { x: 1, y: 1 };

  constructor(private cursorService: CursorService) {}

  ngOnInit(): void {
    this.cursorService.isliHovered$.subscribe((isHovered) => {
      this.isliItemHovered = isHovered;
    });
  }

  updateCursorSize() {
    this.cursorSize = this.isliItemHovered ? 70 : 15;
  }

  gsapQuikCursor(target: HTMLDivElement, x: number, y: number) {
    const xTo = gsap.quickTo(target, 'x', {
      duration: 0.3,
      ease: CustomEase.create('custom', '0.34,1.56,0.64,1'),
    });
    const yTo = gsap.quickTo(target, 'y', {
      duration: 0.3,
      ease: CustomEase.get('custom'),
    });

    xTo(x);
    yTo(y);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    this.windowScrollY = window.scrollY;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.updateCursorSize();

    window.requestAnimationFrame(() => {
      this.x = e.clientX - this.cursorSize / 2;
      this.y = e.clientY - this.cursorSize / 2 + this.windowScrollY;
      this.gsapQuikCursor(this.cursorRef.nativeElement, this.x, this.y);
    });
  }
}
