import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './_components/pages/forget-password/forget-password.component';
import { HomeComponent } from './_components/pages/home/home.component';
import { LoginComponent } from './_components/pages/login/login.component';
import { OrganizationComponent } from './_components/pages/organization/organization.component';
import { RegisterComponent } from './_components/pages/register/register.component';
import { AuthenticationGuard } from './_helper/authentication.guard';
import { OrganizationResolver } from './_resolvers/organization.resolver';
import { UserResolver } from './_resolvers/user.resolver';

const routes: Routes = [
  {path:'',component:HomeComponent,pathMatch:'full',canActivate:[AuthenticationGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'organization',component:OrganizationComponent,canActivate:[AuthenticationGuard],resolve:{organization:OrganizationResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
