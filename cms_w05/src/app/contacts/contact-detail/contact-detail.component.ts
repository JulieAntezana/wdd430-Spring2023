import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // this.contact = this.contactService.getContact(params['id']);
      this.id = params['id'];
      this.contactService.getContact(this.id)
        .subscribe(contactData => {
          this.contact = contactData.contact;
          console.log(this.contact);
        });
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}