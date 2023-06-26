import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  private messagesUrl = 'https://jacms-2c7d5-default-rtdb.firebaseio.com/messages.json';
  private messages: Message [] = [];
  private maxMessageId: number;

  constructor(private http: HttpClient) { 
    // this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    this.http.get<Message[]>(this.messagesUrl).subscribe((msgs: Message[]) => {
      this.messages = msgs;
      this.maxMessageId = this.getMaxId();
      this.messages.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.messageChangedEvent.next(this.messages.slice());
    });

    return this.messages.slice();
  }


  storeMessages() {
    this.http
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.messages.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  // getMessages(): Message[] {
  //   return this.messages.slice();
  // }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
   } 

   addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    this.maxMessageId++;
    newMessage.id = `${this.maxMessageId.toString}`;
    this.messages.push(newMessage);
    this.storeMessages();
    // this.messageChangedEvent.emit(this.messages.slice());
   }

   getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      if (+message.id > maxId) maxId = +message.id;
    });
    return maxId;
  }
}
