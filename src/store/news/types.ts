export interface NewsState {
  everything: Array<NewsArticleDataType> | null;
  topHeadlines: Array<NewsArticleDataType> | null;
  bookmarkedNews: { urls: Array<string> } | null;
}

export interface NewsArticleDataType {
  author: string;
  content: string;
  description: string;
  publishedAt: Date | string;
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}
