import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import HttpBaseRequest from '.';

class NewsApiRequest extends HttpBaseRequest {
  constructor() {
    super();
    this.api = axios.create({
      baseURL: `${Config.RAPID_API_BASE_URL}`,
      headers: {
        'x-api-key': `${Config.RAPID_API_KEY}`,
      },
    });
  }

  async getAllNews<T>(): Promise<AxiosResponse> {
    return await this.api.get('');
  }
}
