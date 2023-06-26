import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  private contactsUrl = 'https://jacms-2c7d5-default-rtdb.firebaseio.com/contacts.json';
  private contacts: Contact [] = [];
  private maxContactId: number;
  
  constructor(private http: HttpClient) { 
    // this.maxContactId = this.getMaxId();
  }


  getContacts(): Contact[] {
    this.http
      .get<Contact[]>(this.contactsUrl)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.contactChangedEvent.next(this.contacts.slice());
      });

    return this.contacts.slice();
  }

  storeContacts() {
    this.http
      .put(this.contactsUrl, JSON.stringify(this.contacts), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.contacts.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }


  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    

    this.maxContactId++;
    newContact.id = `${this.maxContactId.toString}`;
    this.contacts.push(newContact);
    this.storeContacts();
    // this.contactChangedEvent.next(this.contacts.slice()); 
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
    // this.contactChangedEvent.next(this.contacts.slice());
  }

  // getContacts(): Contact[] {
  //   return this.contacts.slice();
  // }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }

    return null;

    // return this.contacts.find((contact) => contact.id === id);
   } 


  getMaxId(): number {

    let maxId = 0

    this.contacts.forEach((contact) => {
      if (+contact.id > maxId) {
        maxId = +contact.id;
      } 
    });
      return maxId;
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
    this.storeContacts();
    // this.contactChangedEvent.next(this.contacts.slice());
  }
}
