import Dexie from 'dexie';
import { Article } from '../model/article.model';

export class ArticleDatabase extends Dexie {
    public articles: Dexie.Table<Article, number>;

    public constructor() {
        super("ArticleDatabase");
        this.version(1).stores({
            articles: "++id,title,description,date"
        });
        this.articles = this.table("articles");
    }
}