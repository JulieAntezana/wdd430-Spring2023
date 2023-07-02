import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  private contactsUrl = 'http://localhost:3000/contacts';
  private contacts: Contact [] = [];
  // private maxContactId: number;
  
  constructor(private http: HttpClient) { 
    // this.maxContactId = this.getMaxId();
  }

  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }

  getContacts() {
    this.http
      .get<{ message: string, contacts: Contact[] }>(this.contactsUrl)
      .subscribe(
        (responseData) => {
          console.log(responseData.message);
          this.contacts = responseData.contacts;
          this.sortAndSend();
          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error(error.message);
          console.error(error.error);
        },
      );
  }

  getContact(id: string) {
    return this.http.get<{message: string, contact: Contact}>(this.contactsUrl + '/' + id);
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    
    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

   
    this.http.post<{ message: string, contact: Contact }>(this.contactsUrl,
    newContact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(responseData.message);
        // add new document to documents
        this.contacts.push(responseData.contact);
        this.sortAndSend();
        this.contactChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error(error.message);
        console.error(error.error);
      },
    );
  }

  deleteContact(contact: Contact) { 
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }

   this.http.delete(this.contactsUrl + contact.id)
     .subscribe(
       (response: Response) => {
         this.contacts.splice(pos, 1);
         this.contacts.sort();
         this.contactChangedEvent.next(this.contacts.slice());
       },
       (error: any) => {
        console.error(error.message);
        console.error(error.error);
      },
     );

  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!newContact || !originalContact) return;
    const pos = this.contacts.findIndex(contact => contact.id === originalContact.id);
    if (pos < 0) {
      return;
    } 

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http
      .put<{ message: string }>(
        this.contactsUrl + originalContact.id,
        newContact,
        {
          headers: headers})
          .subscribe(
            (res) => {
            console.log(res.message);
            this.contacts[pos] = newContact;
            this.sortAndSend();
            this.contactChangedEvent.next(this.contacts.slice());
          },
          (error: any) => {
            console.error(error.message);
            console.error(error.error);
          },
      );
  }
}
