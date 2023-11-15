import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SongComponent } from './components/song/song.component';
import { SongsComponent } from './pages/songs/songs.component';

import { LandingComponent } from './pages/landing/landing.component';
import { LogoComponent } from './components/logo/logo.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AddSongFormComponent } from './components/add-song-form/add-song-form.component';
import { SlideComponent } from './components/slide/slide.component';
import { ButtonComponent } from './components/button/button.component';
import { PageTransitionComponent } from './components/page-transition/page-transition.component';
import { VerseComponent } from './pages/verse/verse.component';
import { AddVerseFormComponent } from './components/add-verse-form/add-verse-form.component';
import { SingleVerseComponent } from './components/verse/verse.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MisionComponent } from './components/mision/mision.component';
import { GridComponent } from './components/grid/grid.component';
import { CursorComponent } from './components/cursor/cursor.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { MagneticComponent } from './components/magnetic/magnetic.component';
import { AutoSliderComponent } from './components/auto-slider/auto-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SongComponent,
    SongsComponent,
    LandingComponent,
    LogoComponent,
    HeroComponent,
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AddSongFormComponent,
    SlideComponent,
    ButtonComponent,
    PageTransitionComponent,
    VerseComponent,
    AddVerseFormComponent,
    SingleVerseComponent,
    SearchBarComponent,
    MisionComponent,
    GridComponent,
    CursorComponent,
    NavItemComponent,
    MagneticComponent,
    AutoSliderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
