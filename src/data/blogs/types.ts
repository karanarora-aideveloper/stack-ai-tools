import { Article, DeepArticleContent } from '../../lib/blog';

export interface BreakingNewsArticle {
  metadata: Article;
  content: DeepArticleContent;
}
