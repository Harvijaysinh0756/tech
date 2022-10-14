import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './Components/landingpage/create-post/create-post.component';
import { LandingpageComponent } from './Components/landingpage/landingpage.component';
import { ProfileComponent } from './Components/landingpage/profile/profile.component';
import { SigninComponent } from './Components/signin/signin.component';


const routes: Routes = [
  {path : '', component : SigninComponent},
  {path : 'createpost', component : CreatePostComponent},
  {path : 'createpost/:id', component : CreatePostComponent},
  {path : 'landingpage', component : LandingpageComponent},
  {path : 'profile', component : ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
