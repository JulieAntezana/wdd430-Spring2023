import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documentsUrl = 'https://jacms-2c7d5-default-rtdb.firebaseio.com/documents.json';

  private documents: Document [] = [];
  private maxDocumentId: number;


  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http
      .get<Document[]>(this.documentsUrl)
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });

    return this.documents.slice();
  }

  storeDocuments() {
    this.http
      .put(this.documentsUrl, JSON.stringify(this.documents), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }

    return null;
    // return this.documents.find((document) => document.id === id);
   }

   deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice());
 }
 
  getMaxId(): number {

    let maxId = 0

    this.documents.forEach((currentId) => {
      if (+currentId > maxId) maxId = +currentId;
    });
      return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    } 
    

    this.maxDocumentId++
    newDocument.id = `${this.maxDocumentId.toString}`;
    this.documents.push(newDocument);
    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice()); 
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
    // this.documentListChangedEvent.next(this.documents.slice());
  }
}
