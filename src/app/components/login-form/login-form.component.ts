import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/utils/users.dto';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  requestStatus: 'init' | 'process' | 'failed' = 'init';
  user: User = {
    nick: '',
    password: '',
  };

  constructor(
    private userService: UsersService,
    private router: Router,
    private cookiesService: CookiesService
  ) {}

  onSubmit(form: NgForm) {
    this.requestStatus = 'process';

    if (form.invalid) {
      Object.keys(form.controls).forEach((control) =>
        form.controls[control].markAllAsTouched()
      );
      this.requestStatus = 'init';

      return;
    }

    this.userService.login(this.user).subscribe({
      next: (token) => {
        this.cookiesService.saveToken(token);
        this.router.navigate(['songs']);
      },

      error: (e) => (this.requestStatus = 'failed'),
    });
  }
}
