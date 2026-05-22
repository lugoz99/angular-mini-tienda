import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPageComponent {


  fb = inject(FormBuilder);

  private router = inject(Router);
  hassError = signal(false);
  isPosting = signal(false);



  loginForm = this.fb.group({
    // TODO: use expression regular->validate email
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
  });

  private authService = inject(AuthService);
  onSubmit(){
    if(this.loginForm.invalid){
      this.hassError.set(true);
      setTimeout(() => {
        this.hassError.set(false)
      }, 2000);
      return;
    }

    console.log(this.loginForm.value)
    const { email = '', password = '' } = this.loginForm.value;
    // Abc123 - test1@google.com
    this.authService.login(email!,password!).subscribe((isAuthenticated) =>{
      if(isAuthenticated){
        this.router.navigateByUrl('/')
        return;
      }
      this.hassError.set(true);
      setTimeout(() => {
        this.hassError.set(false)
      }, 2000);
    })
  }
}
