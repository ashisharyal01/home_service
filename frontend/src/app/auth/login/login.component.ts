import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  hide: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    authService.autoLogin();
  }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get form() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.authService.login(this.form.email.value, this.form.password.value);
  }

}
