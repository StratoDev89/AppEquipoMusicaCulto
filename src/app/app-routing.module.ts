import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { SongsComponent } from './pages/songs/songs.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddSongFormComponent } from './components/add-song-form/add-song-form.component';
import { AuthGuard } from './guards/auth.guard';
import { VerseComponent } from './pages/verse/verse.component';
import { AddVerseFormComponent } from './components/add-verse-form/add-verse-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: LandingComponent,
    data: { animation: 'home' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'register' },
  },
  {
    path: 'songs',
    component: SongsComponent,
    data: { animation: 'songs' },
  },
  {
    path: 'songs/addNewSong',
    canActivate: [AuthGuard],
    component: AddSongFormComponent,
    data: { animation: 'addNewSong' },
  },
  {
    path: 'verses',
    canActivate: [AuthGuard],
    component: VerseComponent,
    data: { animation: 'verses' },
  },
  {
    path: 'verses/addNewVerse',
    canActivate: [AuthGuard],
    component: AddVerseFormComponent,
    data: { animation: 'addNewVerse' },
  },

  // { path: '**' }, // Ruta para manejar 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
