import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected form!: FormGroup;

  constructor(private auth: AuthService) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  protected submit() {
    console.log(this.form.value.username);
    this.auth.login(this.form.value.username, this.form.value.password).subscribe();
  }
}
