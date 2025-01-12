import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-title-picture',
    templateUrl: './title-picture.component.html',
    styleUrl: './title-picture.component.scss',
    standalone: false
})
export class TitlePictureComponent {
  @Input()
  public title!: string;
}
