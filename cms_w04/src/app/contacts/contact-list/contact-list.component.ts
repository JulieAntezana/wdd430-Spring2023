import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
    
    constructor() {}

    @Output() selectedContactEvent = new EventEmitter<Contact>();

    contacts: Contact[] = [
      new Contact(
        '1',
        'R. Kent Jackson',
        'jacksonk@byui.edu',
        '208-496-3771',
        '../../assets/images/jacksonk.jpg',
        null
      ),
      new Contact(
        '2',
        'Rex Barzee',
        'barzeer@byui.edu',
        '208-496-3768',
        '../../assets/images/barzeer.jpg',
        null
      ),
    ];
  
    ngOnInit() {}

    onSelected(contact: Contact) {
      this.selectedContactEvent.emit(contact);
  }
}