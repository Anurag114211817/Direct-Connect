import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../modals/recent-contact.modal';
import { ChatService } from '../../../services/chat.service';
import { UserService } from '../../../services/user.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-recent-contact',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './recent-contact.component.html',
  styles: ``,
})
export class RecentContactComponent {
  private router = inject(Router);
  private loader = inject(LoaderService)
  public user = inject(UserService);
  public chat = inject(ChatService);

  ngOnInit() {
    this.user.fetchRecentContact();
  }

  setCurrentChat(data: User) {
    this.loader.showLoader('secondary')
    this.chat.setCurrentChat(data);
    this.router.navigate([`chat`, btoa(data.id.value)]);
  }
}
