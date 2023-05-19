import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter();
  
  constructor() {}
  
  
    documents: Document[] = [
      {
        id: '1', 
        name: 'GS 170 - Career Development', 
        description: ' Develop resources, professional connections, and essential professional skills to obtain and improve employment.', 
        url: 'https://byui.instructure.com/courses/245946', children: null 
      },
      {
        id: '2', 
        name: 'CIT 327 - Data Warehousing', 
        description: 'This course defines the theory and practice of how database warehouse systems are designed and managed.', 
        url: 'https://byui.instructure.com/courses/237180',
        children: null
      },
      {
        id: '3', 
        name: 'CSE 430 - Architectural Design', 
        description: 'This class will focus on designing software systems at the largest possible level. An emphasis will be placed on problem solving, analysis skills, and interpersonal social skills.', url: 'https://byui.instructure.com/courses/239224',
        children: null
      },
      {
        id: '4',
        name: 'WDD 430 - Web Full-Stack Development', 
        description: 'This course will teach students how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack.', 
        url: 'https://byui.instructure.com/courses/244888',
        children: null
      },
    ];
  
  ngOnInit() {}

    onSelectedDocument(document: Document) {
      this.selectedDocumentEvent.emit(document);
    } 
}