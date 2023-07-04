import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from '../../contacts/contact.model'
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  currentSender: Contact;

  constructor(
    private messageService: MessageService, 
    private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContact("101")
      .subscribe(response => {
        this.currentSender = response.contact;
      })
  }

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    const newMessage: Message = new Message(
      '',
      '',
      subjectValue, 
      msgTextValue, 
      this.currentSender
    );
    
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}