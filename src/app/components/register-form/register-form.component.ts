import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { CreateUser, User, UserSaved } from 'src/app/utils/users.dto';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  requestStatus: 'init' | 'process' | 'failed' = 'init';

  user: CreateUser = {
    nick: '',
    password: '',
    adminPassword: '',
  };

  newUser: UserSaved | null = null;

  constructor(private userService: UsersService) {}

  onRegister(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach((control) =>
        form.controls[control].markAllAsTouched()
      );
      return;
    }

    this.userService.create(this.user).subscribe({
      next: (data) => {
        this.newUser = data;
      },
      error: (e) => {
        this.requestStatus = 'failed'
      }
    });
  }
}
