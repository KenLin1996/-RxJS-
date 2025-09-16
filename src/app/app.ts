// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {

  ngOnInit(): void {
    console.log('--- 開始 ---');

    // 建立 subject
    const youtuber$ = new Subject<number>();

    // 影片 1 上架，尚未有人訂閱
    youtuber$.next(1);

    // 建立觀察者 A
    const observerA = {
      next: (id: number) => {
        console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
      },
      error: () => {},
      complete: () => {}
    };

    // A 訂閱
    const observerASubscription: Subscription = youtuber$.subscribe(observerA);

    // 影片 2 上架
    youtuber$.next(2);
    // 印出：我是觀察者 A，我收到影片 2 上架通知了

    // B 訂閱（簡寫）
    const observerBSubscription: Subscription = youtuber$.subscribe((id: number) => {
      console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
    });

    // 影片 3 上架
    youtuber$.next(3);
    // 印出：我是觀察者 A，我收到影片 3 上架通知了
    // 印出：我是觀察者 B，我收到影片 3 上架通知了

    // B 退訂
    observerBSubscription.unsubscribe();

    // 影片 4 上架
    youtuber$.next(4);
    // 印出：我是觀察者 A，我收到影片 4 上架通知了

    console.log('--- 結束 ---');
  }
}
