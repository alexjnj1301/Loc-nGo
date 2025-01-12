import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './main/components/home-page/home-page.component'
import { ErrorPageComponent } from './main/components/error-page/error-page.component'
import { AdminComponent } from './main/components/admin/admin.component'
import { LoginComponent } from './main/components/Authentication/login/login.component'
import { RegisterComponent } from './main/components/Authentication/register/register.component'
import { LieuDetailsComponent } from './main/components/lieu-details/lieu-details.component'

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'error/:errorKey', component: ErrorPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'lieu-details/:id', component: LieuDetailsComponent },
  { path: '**', redirectTo: 'error/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
