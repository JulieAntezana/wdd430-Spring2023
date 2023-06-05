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

  private documentsListClone: Document [] = [];
  private maxDocumentId: number;


  constructor() {
    this.documentsListClone = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documentsListClone.slice();
  }

  getDocument(id: string): Document {
    return this.documentsListClone.find((document) => document.id === id);
   }

   deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documentsListClone.indexOf(document);
    if (pos < 0) return;
    this.documentsListClone.splice(pos, 1);
    this.documentListChangedEvent.next(this.documentsListClone.slice());
 }
 
  getMaxId(): number {

    let maxId = 0

    this.documentsListClone.forEach((currentId) => {
      if (+currentId > maxId) maxId = +currentId;
    });
      return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) return;
    

    this.maxDocumentId++
    newDocument.id = `${this.maxDocumentId}`;
    this.documentsListClone.push(newDocument);
    this.documentListChangedEvent.next(this.documentsListClone.slice()); 
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (
      originalDocument === undefined || newDocument === undefined || originalDocument === null || newDocument === null) {
        return;
      }


    const pos = this.documentsListClone.indexOf(originalDocument)
    if (pos < 0) 
        return;
    

    newDocument.id = originalDocument.id;
    this.documentsListClone[pos] = newDocument;
    this.documentListChangedEvent.next(this.documentsListClone.slice());
  }

}
