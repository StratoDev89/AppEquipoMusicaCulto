import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { UsersService } from 'src/app/services/users.service';
import { Payload } from 'src/app/utils/users.dto';
import { gsap } from 'gsap';
import { changeNav } from 'src/app/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [changeNav],
})
export class NavComponent implements OnInit {
  // Current user session
  user: Payload | null = null;

  // Reference to NAV tag
  @ViewChild('navRef', { static: true }) navRef!: ElementRef<HTMLDivElement>;

  // Variable to check background
  isClear = false;

  // Declare variables to check background based on current path
  routeColorMap: { [key: string]: boolean } = {
    '/': true,
    '/home': true,
    '/songs': false,
    '/register': false,
    '/login': false,
    '/verses': false,
    '/songs/addNewSong': false,
  };

  // Initialize navigation variables
  navItems: {
    title: string;
    routerLink: string;
    showWhen: boolean;
    onClick: Function;
  }[] = [];

  constructor(
    private cookieService: CookiesService,
    private userService: UsersService,
    private router: Router
  ) {
    this.initializeNavVars();
  }

  ngOnInit(): void {
    // Set subscription to user with session
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.initializeNavVars();
    });

    // Update is Clear variable according to the destination path
    this.router.events.subscribe((event) => {
      // It is necessary to filter the router events by the last one
      if (event instanceof NavigationEnd) {

        this.isClear = this.routeColorMap[event.url];
      }
    });
  }

  // Assign navigation variables
  initializeNavVars() {
    this.navItems = [
      {
        title: 'Home',
        routerLink: 'home',
        showWhen: true,
        onClick: () => {},
      },
      {
        title: 'Songs',
        routerLink: 'songs',
        showWhen: true,
        onClick: () => {},
      },
      {
        title: 'Sign in',
        routerLink: 'register',
        showWhen: !this.user,
        onClick: () => {},
      },
      {
        title: 'Log in',
        routerLink: 'login',
        showWhen: !this.user,
        onClick: () => {},
      },
      {
        title: 'Logout',
        routerLink: '',
        showWhen: this.user ? true : false,
        onClick: () => {
          this.onLogout();
        },
      },
      {
        title: this.user ? this.user.nick : '',
        routerLink: '',
        showWhen: this.user ? true : false,
        onClick: () => {},
      },
    ];
  }

  // Mouse Enter Hover effect
  onMouseEnter(div: HTMLDivElement) {
    gsap.to(div, {
      left: 0,
      duration: 0.3,
    });
  }

  // Mouse Leave Hover effect
  onMouseLeave(div: HTMLDivElement) {
    gsap.to(div, {
      left: '100%',
      duration: 0.3,
      onComplete: () => {
        gsap.set(div, { left: '-100%' });
      },
    });
  }

  // Logout management
  onLogout() {
    this.cookieService.removeToken();
    this.userService.user.next(null);
    this.router.navigate(['']);
  }
}
