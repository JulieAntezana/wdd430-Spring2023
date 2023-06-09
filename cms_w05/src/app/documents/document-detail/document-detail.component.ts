import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document;
  id: string;


  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRef: WindRefService
  ) {}

  ngOnInit() {
    this.nativeWindow = this.windRef.getNativeWindow();
    this.route.params
      .subscribe(
      (params: Params) => {
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);
      // this.documentService.getDocument(this.id);
      //   .subscribe(documentData => {
      //     this.document = documentData.document;
      //     console.log(this.document);
      //   });
      });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['../'], { relativeTo: this.route });
 }
}
