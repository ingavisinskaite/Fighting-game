import { NewsService } from './../../services';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DeleteNewsDialogComponent } from './../../dialogs/delete-news-dialog/delete-news-dialog.component';
import { INews } from 'src/app/models/news.model';
import { Subscription } from 'rxjs';
import { EditNewsDialogComponent } from 'src/app/dialogs/edit-news-dialog/edit-news-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
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

  newsData: INews[];

  displayedColumns: string[] = ['author', 'version', 'content', 'actions'];
  dataSource = new MatTableDataSource<INews>();

  constructor(private article: NewsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getNews();
  }

  private getNews(): Subscription {
    return this.article.getNewsData().subscribe(data => {
      this.dataSource = new MatTableDataSource<INews>(data);
    });
  }

  addArticle(): void {
    this.article.addArticle(this.newsDetails);
  }

  confirmDelete(id: string): void {
    this.dialog.open(DeleteNewsDialogComponent, {data: id});
  }

  editForm(id: string, author: string, version: string, content: string): void {
    console.log(author);
    this.dialog.open(EditNewsDialogComponent, {data: { id, author, version, content}});
  }
}
