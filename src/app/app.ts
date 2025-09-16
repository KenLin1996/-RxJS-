// app.component.ts
import { Component, OnInit, ViewChild, ElementRef, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  title = signal('rxjs-practice');

  counter = 0;
  counter$!: Subject<number>;

  @ViewChild('currentCounter') currentCounterLabel!: ElementRef;
  @ViewChild('evenCounter') evenCounterLabel!: ElementRef;
  @ViewChild('status') statusLabel!: ElementRef;

  ngOnInit(): void {}

  start() {
    this.counter$ = new Subject();
    this.counter = 0;
    this.statusLabel.nativeElement.innerHTML = '開始計數';

    // 只取偶數的 Observable
    const evenCounter$ = this.counter$.pipe(filter(data => data % 2 === 0));

    // 訂閱主 Subject
    this.counter$.subscribe({
      next: (data) => {
        this.currentCounterLabel.nativeElement.innerHTML = data.toString();
      },
      error: (message) => {
        this.statusLabel.nativeElement.innerHTML = `錯誤 -> ${message}`;
      },
      complete: () => {
        this.statusLabel.nativeElement.innerHTML = '完成';
      },
    });

    // 訂閱偶數 Subject
    evenCounter$.subscribe(data => {
      this.evenCounterLabel.nativeElement.innerHTML = data.toString();
    });

    this.counter$.next(this.counter);
  }

  count() {
    this.counter$.next(++this.counter);
  }

  error() {
    const reason = prompt('請輸入錯誤訊息');
    this.counter$.error(reason || 'error');
  }

  complete() {
    this.counter$.complete();
  }
}
