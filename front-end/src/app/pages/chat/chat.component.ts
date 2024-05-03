import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { User } from '../../modals/recent-contact.modal';
import { ChatService } from '../../services/chat.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent implements OnInit, OnDestroy {
  private chat = inject(ChatService);
  private loader = inject(LoaderService);
  private destroy$ = new Subject<void>();
  currentUser = {} as User;
  ngOnInit(): void {
    this.chat.currentChat$
      .pipe(
        tap((userDetails) => {
          this.currentUser = userDetails;
        }),
        delay(500),
        tap(() => this.loader.hideLoader('secondary')),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
