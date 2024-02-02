import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../modals/recent-contact.modal';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private currentChat = new BehaviorSubject<User>({} as User);
  public currentChat$ = this.currentChat.asObservable();

  setCurrentChat(userData: User) {
    this.currentChat.next(userData);
    
  }
}
