import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document [] = [];
  private maxDocumentId: number;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
   }

   deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
 }
 
  getMaxId(): number {

    let maxId = 0

    this.documents.forEach((currentId) => {
      if (+currentId > maxId) maxId = +currentId;
    });
      return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) return;
    

    this.maxDocumentId++
    newDocument.id = `${this.maxDocumentId}`;
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice()); 
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (
      originalDocument === undefined || newDocument === undefined || originalDocument === null || newDocument === null) {
        return;
      }


    const pos = this.documents.indexOf(originalDocument)
    if (pos < 0) 
        return;
    

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }

}
