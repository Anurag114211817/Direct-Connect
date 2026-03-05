import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SUB_TAG_LINE, TAG_LINE, TITLE } from '../../constants/globle.constant';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styles: ``,
})
export class AuthComponent {
  title = TITLE;
  tagLine = TAG_LINE;
  subTagLine = SUB_TAG_LINE;
}
