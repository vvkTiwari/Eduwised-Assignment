import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'profile/:id', component: ProfileComponent },
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'error', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
