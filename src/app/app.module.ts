import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './_components/common/navbar/navbar.component';
import { HomeComponent } from './_components/pages/home/home.component';
import { LoginComponent } from './_components/pages/login/login.component';
import { RegisterComponent } from './_components/pages/register/register.component';
import { ForgetPasswordComponent } from './_components/pages/forget-password/forget-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationComponent } from './_components/pages/organization/organization.component';
import { OrganizationResolver } from './_resolvers/organization.resolver';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    OrganizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    OrganizationResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
