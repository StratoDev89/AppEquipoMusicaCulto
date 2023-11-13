import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BibleService } from 'src/app/services/bible.service';

@Component({
  selector: 'app-mision',
  templateUrl: './mision.component.html',
  styleUrls: ['./mision.component.scss'],
})
export class MisionComponent implements OnInit {
  missionText = [
    'Nuestro objetivo principal es brindar',
    'a los creyentes el apoyo necesario para ',
    'fomentar una vida de adoración genuina',
    'profunda, y bíblicamente consistente',
    'garantizando así su edificación, con el',
    'respaldo del Espíritu Santo y la',
    'Palabra de Dios como medios exclusivos',
    'para cumplir dicha tarea',
  ];

  // Reference to each element missionText paragraph
  @ViewChildren('missionSentenceRef') missionSentenceRef!: QueryList<
    ElementRef<HTMLParagraphElement>
  >;

  // Random Verse Variables
  verse: string | undefined = '';
  chapter: string | undefined = '';

  constructor(private bibleService: BibleService) {}

  ngOnInit(): void {
    // Subscription to obtain and assign the random verse
    this.bibleService.get().subscribe((data) => {
      this.chapter = data?.name;
      this.verse = data?.text;
    });
  }
}
