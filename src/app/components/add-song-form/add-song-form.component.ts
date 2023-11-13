import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/utils/songs-dto';

@Component({
  selector: 'app-add-song-form',
  templateUrl: './add-song-form.component.html',
  styleUrls: ['./add-song-form.component.scss'],
})
export class AddSongFormComponent {
  newSong: Song = {
    name: '',
    tone: '',
    youtubeUrl: '',
    style: null,
    observations: '',
  };

  songSaved: Song | null = null;

  constructor(private songService: SongService, private router: Router) {}

  onSave() {
    this.songService.create(this.newSong).subscribe({
      next: (data) => {
        this.songSaved = data;
        this.router.navigate(['songs']);
      },
      error: (e) => {
        // console.error(e.error);
      },
    });
  }
}
