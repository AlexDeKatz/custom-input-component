import { Component } from '@angular/core';
import { FormControl } from '../../node_modules/@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'custom-component';
  public myInput = new FormControl('');
}
