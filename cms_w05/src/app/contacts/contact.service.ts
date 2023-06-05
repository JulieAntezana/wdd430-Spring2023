import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  private contacts: Contact [] = [];
  private maxContactId: number;
  
  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
   } 

   deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }
  getMaxId(): number {

    let maxId = 0

    this.contacts.forEach((currentId) => {
      if (+currentId > maxId) maxId = +currentId;
    });
      return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) return;
    

    this.maxContactId++
    newContact.id = `${this.maxContactId}`;
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice()); 
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (
      originalContact === undefined || newContact === undefined || originalContact === null || newContact === null) {
        return;
      }


    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0) 
        return;
    

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactChangedEvent.next(this.contacts.slice());
  }
}
