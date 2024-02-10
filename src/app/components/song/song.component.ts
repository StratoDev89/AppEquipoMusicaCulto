import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { SavedSong, UpdateSongDto } from 'src/app/utils/songs-dto';
import { CookiesService } from 'src/app/services/cookies.service';
import { GsapAnimationService } from 'src/app/services/gsap-animation.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit, AfterViewInit {
  @Input('song') song!: SavedSong;
  isDisabled = true;
  isOpen = false;
  isEditing = false;
  wasDeleted = false;
  songToUpdate: UpdateSongDto = {};
  canEdit = true;
  arrowAnimation!: GSAPTimeline;

  @ViewChild('img', { static: true }) img!: ElementRef<HTMLDivElement>;

  constructor(
    private songService: SongService,
    private cookiesService: CookiesService,
    private gsapService: GsapAnimationService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.arrowAnimation = this.gsapService.arrowAnimation(
      this.img.nativeElement
    );
  }

  showInfo() {
    this.isOpen = !this.isOpen;

    this.isOpen ? this.arrowAnimation.play() : this.arrowAnimation.reverse();

    if (!this.isOpen) {
      this.isEditing = false;
      this.isDisabled = true;
    }
  }

  onEdit() {
    const canEdit = this.isLogged();
    console.log(canEdit);

    if (canEdit) {
      this.isEditing = !this.isEditing;
      this.isDisabled = !this.isDisabled;
      return;
    }
    this.canEdit = false;
  }

  onSave() {
    this.songToUpdate = {
      tone: this.song.tone,
      youtubeUrl: this.song.youtubeUrl,
      style: this.song.style,
      observations: this.song.observations,
    };

    this.isEditing = !this.isEditing;
    this.isOpen = !this.isOpen;
    this.isDisabled = !this.isDisabled;

    this.songService.update(this.song._id, this.songToUpdate).subscribe({
      next: (data:any) => {
        if (data) {
          this.songService.getAll('', '');
        }
      },
      error: (e:any) => console.error(e),
    });
  }

  onDelete() {
    const canDelete = this.isLogged();

    if (canDelete) {
      this.songService.delete(this.song._id).subscribe((bool:any) => {
        this.wasDeleted = bool;

        if (this.wasDeleted) {
          this.songService.updateSongsList();
        }
      });
      return;
    }

    this.canEdit = false;
  }

  isLogged() {
    const token = this.cookiesService.getToken();

    if (!token) {
      return false;
    }

    return true;
  }
}
