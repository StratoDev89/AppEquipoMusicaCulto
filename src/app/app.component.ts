import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CookiesService } from './services/cookies.service';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';
import { routeTransition } from './animations';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { GsapAnimationService } from './services/gsap-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransition],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = '';
  @ViewChild(NavComponent, { static: true }) navComponent!: NavComponent;

  @ViewChild('mainContainerRef', { static: true })
  mainContainerRef!: ElementRef<HTMLDivElement>;

  @ViewChild(NavComponent, { static: true })
  navComponentRef!: NavComponent;

  isDesktop = window.innerWidth >= 961 ? true : false;

  constructor(
    private cookieService: CookiesService,
    private userService: UsersService,
    private router: Router,
    private gsapService: GsapAnimationService
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.getToken();

    if (token) {
      this.userService.getProfile(token).subscribe({
        next: (data) => {
          this.userService.user.next(data);
        },
        error: (error) => {
          this.router.navigate(['login']);
        },
      });
    }
  }

  ngAfterViewInit(): void {
    this.gsapService.navAnimationOnScroll(
      this.navComponent.navRef.nativeElement,
      this.mainContainerRef.nativeElement
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
