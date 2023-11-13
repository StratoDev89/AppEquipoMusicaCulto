import { Component, OnInit } from '@angular/core';
import { BibleService } from 'src/app/services/bible.service';
import { SavedVerse } from 'src/app/utils/verses-dto';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  verses: SavedVerse[] = [];

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    this.bibleService.getAll().subscribe((data) => {
      this.verses = data;
    });
  }
}
