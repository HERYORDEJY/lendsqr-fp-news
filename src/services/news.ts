import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import HttpBaseRequest from './index';

class NewsApiRequest extends HttpBaseRequest {
  constructor() {
    super();
    this.api = axios.create({
      baseURL: `${Config.NewsAPI_BASE_URL}`,
    });
  }

  async getEverything<T>(source: string = 'cnn'): Promise<AxiosResponse> {
    return await this.api.get(`/everything/${source}.json`);
  }

  async getSources<T>(source: string): Promise<AxiosResponse> {
    return await this.api.get(`/everything/sources.json`);
  }

  async getTopHeadlines<T>(
    data: { category: string; countryCode: string } = {
      category: 'business',
      countryCode: 'us',
    },
  ): Promise<AxiosResponse> {
    return await this.api.get(
      `/top-headlines/category/${data.category}/${data.countryCode}.json`,
    );
  }
}

export const newsApiRequest = new NewsApiRequest();

const top = {
  author: 'Sam Shead',
  content:
    'Bill Gates has warned that Elon Musk could make Twitter "worse" after the Tesla CEO pledged to buy the social media firm for $44 billion. Speaking at the Wall Street Journal\'s CEO Summit Wednesday, … [+3281 chars]',
  description:
    'Bill Gates has warned that Elon Musk could make Twitter worse after the Tesla CEO pledged to buy the social media firm for $44 billion.',
  publishedAt: '2022-05-05T07:17:52Z',
  source: { id: null, name: 'CNBC' },
  title:
    "Bill Gates questions Elon Musk's goals with Twitter: 'He could make it worse' - CNBC",
  url: 'https://www.cnbc.com/2022/05/05/bill-gates-says-elon-musk-could-make-twitter-worse.html',
  urlToImage:
    'https://image.cnbcfm.com/api/v1/image/107017517-1645200499603-gettyimages-1236298089-jm1_6693.jpeg?v=1651738132&w=1920&h=1080',
};
