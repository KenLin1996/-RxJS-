// app.component.ts
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  title = signal('rxjs-practice');


  ngOnInit(): void {}
}
