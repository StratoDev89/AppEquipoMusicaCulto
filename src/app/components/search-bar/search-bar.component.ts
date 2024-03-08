import { Component } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { Style } from 'src/app/utils/songs-dto';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  title = '';
  style: Style | '' = '';

  constructor(private songService: SongService) {}

  onSearch() {
    this.songService.getAll(this.title, this.style).subscribe((data) => {
      this.songService.songs.next(data);
    });
  }
}
