import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Testcomp} from '../../components/testcomp/testcomp';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Testcomp],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  auth: AuthService = inject(AuthService);
  private logger = inject(LoggerService);

  protected submit() {
    this.auth.login(this.form.value.username, this.form.value.password)
      .pipe(take(1))
      .subscribe({
      next: (res:any)=>{
        // window.location.reload();
        this.auth.setLoggedIn(res.sessionId);
      },
      error: (error:any)=>{
        this.logger.error('Login failed', error);
      }
    });
  }
}
