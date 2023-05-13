import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Subject 1', 'This is the first message.', 'Julie Antezana'),
    new Message('2', 'Subject 2', 'This is the second message.', 'Julie Antezana'),
    new Message('3', 'Subject 3', 'This is the third message.', 'Julie Antezana'),
  ];

  constructor() {}

  ngOnInit() {
    
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}