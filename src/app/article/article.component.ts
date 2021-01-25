import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Article } from '../model/article.model';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less'],
  providers: [ArticleService],
})

export class ArticleComponent implements OnInit {

  public hidden: boolean = false;

  public articlesList: Array<Article> = [];
  id: number;
  title: string = '';
  description: string = '';

  constructor(private ref: ChangeDetectorRef, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticlesList().then((articlesList) => {
      this.articlesList = articlesList;
      this.ref.markForCheck();
    });
  }

  closeEditor() {
    this.hidden = false;
    this.title = '';
    this.description = '';
  }

  addArticle() {
    this.hidden = true;

    this.articleService.getLastRecordId().then((lastIndex) => {
      this.id = lastIndex.id + 1;
      this.ref.markForCheck();
    }).catch(function () {
      console.log("В базе данных отсутствуют записи");
    });

    this.title = '';
    this.description = '';
  }

  updateArticle(id: number) {
    this.hidden = true;

    this.articleService.getArticleById(id).then((updatedArticle) => {
      this.id = id;
      this.title = updatedArticle.title;
      this.description = updatedArticle.description;
      this.ref.markForCheck();
    });
  }

  deleteArticle(id: number) {
    this.articleService.deleteArticle(id);
    this.articleService.getArticlesList().then((articlesList) => {
      this.articlesList = articlesList;
      this.ref.markForCheck();
    });
  }

  saveArticle() {
    const article: Article = {
      id: this.id,
      title: this.title,
      description: this.description,
      date: new Date()
    }

    this.articleService.saveArticle(article);
    this.title = '';
    this.description = '';

    this.articleService.getArticlesList().then((articlesList) => {
      this.articlesList = articlesList;
      this.ref.markForCheck();
    });

  }

}