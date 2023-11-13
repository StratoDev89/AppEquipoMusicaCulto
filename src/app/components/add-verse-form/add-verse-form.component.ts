import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BibleService } from 'src/app/services/bible.service';
import { Verse } from 'src/app/utils/verses-dto';

@Component({
  selector: 'app-add-verse-form',
  templateUrl: './add-verse-form.component.html',
  styleUrls: ['./add-verse-form.component.scss'],
})
export class AddVerseFormComponent {
  newVerse: Verse = {
    name: '',
    text: '',
  };

  constructor(private bibleService: BibleService, private router: Router) {}

  onSave() {
    this.bibleService.create(this.newVerse).subscribe({
      next: (data) => {
        this.newVerse = data;
        this.router.navigate(['verses']);
      },
      error: (e) => {
        console.error(e.error);
      },
    });
  }
}
