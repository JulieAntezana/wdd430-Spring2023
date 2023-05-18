import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {

  constructor() {}
  
  documents = [
    new Document('1', 'test', 'This is a test.', 'https://www.example.com/'),
  ];

  

  ngOnInit(): void {}
}