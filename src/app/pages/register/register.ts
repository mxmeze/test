import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
  })
  auth: AuthService = inject(AuthService);
  private logger = inject(LoggerService);

  submit() {
    this.auth.register(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.password_confirmation).subscribe({
      next: (res:any)=>{
        this.logger.log('Registration successful');
        this.auth.login(this.registerForm.value.username, this.registerForm.value.password);
      },
      error: (error:any)=> {
        this.logger.error('Registration failed', error);
      }
    })
  }

}
