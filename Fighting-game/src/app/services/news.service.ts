import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NewsService {
  articleId: string;
  articleData: object;

  constructor(private afs: AngularFirestore) { }

  addArticle(newsDetails): void {
    this.afs.collection('news').add(newsDetails);
  }
  getNewsData(): Observable<any[]> {
    return this.afs.collection('news').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }
  getSelectedRow(id: string): string {
    this.articleId = id;
    return this.articleId;
  }

  delArticle(): void {
    this.afs.collection('news').doc(this.articleId).delete();
  }

  updateArticle(articleId, updatedAuthor, updatedVersion, updatedContent) {
    // console.log(articleId);
    // console.log(updatedAuthor);
    // console.log(updatedVersion);
    // console.log(updatedContent);

    this.afs.collection('news').doc(articleId).update({ author: updatedAuthor });
    this.afs.collection('news').doc(articleId).update({ version: updatedVersion });
    this.afs.collection('news').doc(articleId).update({ content: updatedContent });
  }

  getNews() {
    return this.afs.collection('news', ref => ref.orderBy('version')).valueChanges();
  }
}
