import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { SavedSong } from 'src/app/utils/songs-dto';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit {
  songsHardcoded: SavedSong[] = [
    {
      _id: '1',
      name: 'Canción 1',
      tone: 'Si, Fa',
      youtubeUrl: 'https://www.youtube.com/watch?v=video1',
      style: 'jubilo',
      observations:
        'Esta es la primera canción. Esta es la primera canción.Esta es la primera canción.Esta es la primera canción.Esta es la primera canción.',
    },
    {
      _id: '2',
      name: 'Canción 2',
      tone: 'Si, Fa',
      youtubeUrl: 'https://www.youtube.com/watch?v=video2',
      style: 'jubilo',
      observations: 'Segunda canción con un ritmo alegre.',
    },
    {
      _id: '3',
      name: 'Canción 3',
      tone: 'Si, Fa',
      youtubeUrl: 'https://www.youtube.com/watch?v=video3',
      style: 'jubilo',
      observations: 'Tercera canción en tono menor.',
    },
    {
      _id: '4',
      name: 'Canción 4',
      tone: 'Si, Fa',
      youtubeUrl: 'https://www.youtube.com/watch?v=video4',
      style: 'reflexion',
      observations: 'Cuarto tema con guitarra acústica.',
    },
    {
      _id: '5',
      name: 'Canción 5',
      tone: 'Si, Fa',
      youtubeUrl: 'https://www.youtube.com/watch?v=video5',
      style: 'reflexion',
      observations: 'Quinta canción con voces armoniosas.',
    },
  ];

  songs: SavedSong[] | null = null;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.songService.getAll('', '').subscribe((data) => {
      this.songService.songs.next(data);
    });

    this.songService.songs$.subscribe((data) => {
      this.songs = data;
    });
  }
}
