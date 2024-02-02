import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../modals/recent-contact.modal';
import { ChatService } from '../../services/chat.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent implements OnInit {
  private chat = inject(ChatService);
  private loader = inject(LoaderService);
  currentUser = {} as User;
  ngOnInit(): void {
    this.chat.currentChat$.subscribe((userDetails) => {
      console.log(
        '🚀 ~ ChatComponent ~ ngOnInit ~ this.currentUser:',
        this.currentUser
      );
      this.currentUser = userDetails;
      setTimeout(() => this.loader.hideSecondaryLoader(), 500);
    });
  }
}
