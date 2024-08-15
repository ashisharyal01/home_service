import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddEditRegisterUserComponent } from './register-user/add-edit-register-user/add-edit-register-user.component';
import { ViewUserComponent } from './register-user/view-user/view-user.component';



const MODULES = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  NgxPaginationModule
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    AddEditRegisterUserComponent,
    ViewUserComponent
  ],
  imports: [...MODULES]
})
export class AuthModule { }
