import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  // private messagesUrl = 'https://jacms-2c7d5-default-rtdb.firebaseio.com/messages.json';
  private messagesUrl = 'http://localhost:3000/messages';
  private messages: Message [] = [];
  private maxMessageId: number;

  constructor(private http: HttpClient) { 
  }

  getMessages() {
    this.http
      .get<{ message: string; messages: Message[] }>(this.messagesUrl)
      .subscribe(res => {
        console.log(res.message);
        console.log(res.messages);
        this.messages = res.messages;
        this.sortAndSend();
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
   } 

  addMessage(newMsg: Message) {
    if (!newMsg) return;
    newMsg.id = '';
    this.http
      .post<{ message: string; messages: Message }>(
        this.messagesUrl,
        newMsg,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe(res => {
          console.log(res.message);
          this.messages.push(res.messages);
          this.sortAndSend();
          this.messageChangedEvent.next(this.messages.slice());
      });
  }

  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
      this.messageChangedEvent.next(this.messages.slice());
    });
  }
}
