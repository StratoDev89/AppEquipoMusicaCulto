import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BibleService } from 'src/app/services/bible.service';
import { SavedVerse, Verse } from 'src/app/utils/verses-dto';

@Component({
  selector: 'app-single-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class SingleVerseComponent {
  @Input() verse: SavedVerse | null = null;

  constructor(private bibleService: BibleService, private router: Router) {}

  onDelete(_id: string) {
    this.bibleService.delete(_id).subscribe();
    window.scrollTo(0, 0);
    location.reload();
  }
}
