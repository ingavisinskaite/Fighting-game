import { AngularFirestore } from '@angular/fire/firestore';
import { DataSource } from '@angular/cdk/collections';
import { NewsService } from './../../services';
import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteNewsDialogComponent } from './../../dialogs/delete-news-dialog/delete-news-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  updatedName: string;
  updatedVersion: number;
  updatedContent: string;

  author = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
  version = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]);
  content = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]);

  newsDetails = {
    author: '',
    version: '',
    content: ''
  };

  displayedColumns = ['author', 'version', 'content', 'actions'];
  dataSource = new NewsDataSource(this.article);

  constructor(private article: NewsService, private dialog: MatDialog, private afs: AngularFirestore) {}

  private addArticle(): void {
    this.article.addArticle(this.newsDetails);
  }

  private confirmDelete(num: number): void {
    this.article.getNewsData().subscribe(data => {
      this.article.getSelectedRow(data[num].id);
    });
    this.dialog.open(DeleteNewsDialogComponent);
  }

  setUpdatedName(event: any) {
    console.log(event.target.textContent);
    this.updatedName = event.target.textContent;
  }

  setUpdatedVersion(event: any) {
    this.updatedVersion = event.target.textContent;
  }

  setUpdatedContent(event: any) {
    this.updatedContent = event.target.textContent;
  }

  editForm(num) {
    this.article.getNewsData().subscribe(data => {
      this.article.updateArticle(data[num].id, this.updatedName, this.updatedVersion, this.updatedContent);
    });
  }
}

export class NewsDataSource extends DataSource<any> {

  constructor(private article: NewsService) { super(); }

  connect() {
    return this.article.getNews();
  }

  disconnect() { }
}
