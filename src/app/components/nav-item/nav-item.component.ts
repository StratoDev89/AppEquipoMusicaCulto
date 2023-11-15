import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NavItem } from 'src/app/models/shared.models';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements AfterViewInit {
  @Input('navItem') navItem!: NavItem;

  @ViewChild('item', { static: false }) liItem!: ElementRef<HTMLLIElement>;

  ngAfterViewInit(): void {}
}
