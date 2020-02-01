import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/authservice';
import { FormGroup, FormControl, Validators, FormBuilder } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isSubmitted = false;
  name: string;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  email: string;
  password: string;
  data: any = {};
  errorMessage = '';

  constructor(public authService: AuthService, private router: Router) { }

  contents: any;
  ngOnInit() {
    sessionStorage.removeItem('Email');
    sessionStorage.clear();
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.required),
    });

    this.authService.logout();
  }

  get formControls() { return this.loginForm.controls; }

  public login() {
    this.errorMessage = '';
    // console.log(this.loginForm.value);
    // this.isSubmitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }

    this.authService.login(this.email, this.password)
      .subscribe(
        // response => {
        //   this.data = response;
        //   console.log("Login Berhasil");
        //   localStorage.setItem('token', this.data.access_token);
        //   this.router.navigate(['/listsalesman']);
        //  },
        data => {
          // console.log(data);
          this.router.navigate(['/main/listsalesman']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.error_description;
        }
      );
  }
  
}
