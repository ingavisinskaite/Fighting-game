import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NewsService } from './../../services';

@Component({
  selector: 'app-delete-news-dialog',
  templateUrl: './delete-news-dialog.component.html',
  styleUrls: ['./delete-news-dialog.component.scss']
})
export class DeleteNewsDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteNewsDialogComponent>,
              private article: NewsService) { }

  private closeNewsDeleteDialog(): void {
    this.dialogRef.close();
  }

  private deleteArticle(): void {
    this.article.delArticle();
    this.dialogRef.close();
  }
}
