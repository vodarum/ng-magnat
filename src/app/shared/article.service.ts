import { Injectable } from "@angular/core";
import { Article } from '../model/article.model';
import { ArticleDatabase } from '../db/article.db';

@Injectable({ providedIn: 'root' })

export class ArticleService {

    public db = new ArticleDatabase();

    async getArticlesList(): Promise<Array<Article>> {
        return await this.db.articles.toArray();
    }

    async getArticleById(id: number) {
        return await this.db.articles.get({ id: id });
    }

    deleteArticle(id: number) {
        this.db.articles.delete(id)
    }

    async getLastRecordId() {
        return await this.db.articles.orderBy('id').last();
    }

    saveArticle(article: Article) {

        if (article.title && article.description) {

            this.db.articles.put(article, article.id).then(function (puted) {
                if (puted)
                    console.log("Статья сохранена!");
                else
                    console.log("Что-то пошло не так!");
            });

        } else {
            console.log("Необходимо ввести заголовок и описание статьи!");
        }

    }

}