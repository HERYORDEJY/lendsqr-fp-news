import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import Config from 'react-native-config';

// For Make Log on Develop Mode
const logOnDev = (message: string) => {
  if (__DEV__) {
    console.log(message);
  }
};

class HttpBaseRequest {
  protected accessToken: string | null = null;
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: `${Config.BASE_URL}`,
    });

    this.attachInterceptors();
  }
  private async attachInterceptors() {
    this.api.interceptors.request.use(async req => {
      try {
        const accessToken = this.accessToken;

        if (Boolean(accessToken)) {
          this.accessToken = accessToken;
          req.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch {
        // do nothing
      }

      return req;
    });

    this.api.interceptors.response.use(
      async res => {
        const accessToken = res.data?.accessToken;
        if (accessToken) {
          await this.setAccessToken(accessToken);
        }

        return res;
      },
      (error: AxiosError | Error): Promise<AxiosError> => {
        if (axios.isAxiosError(error)) {
          const { message } = error;
          const { method, url } = error.config as AxiosRequestConfig;
          const { status } = (error.response as AxiosResponse) ?? {};

          logOnDev(
            `---🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`,
          );

          switch (status) {
            case 401: {
              // "Login required"
              break;
            }
            case 403: {
              // "Permission denied"
              break;
            }
            case 404: {
              // "Invalid request"
              break;
            }
            case 500: {
              // "Server error"
              break;
            }
            default: {
              // "Unknown error occurred"
              break;
            }
          }

          if (status === 401) {
            // Delete Token & Go To Login Page if you required.
            // sessionStorage.removeItem("token");
          }
          return Promise.reject({
            isError: true,
            status,
            message: error?.response?.data?.message ?? message,
            data: error?.response?.data,
          });
        } else {
          logOnDev(`+++🚨 [API] | Error ${error.message}`);
        }

        return Promise.reject(error);
      },
    );
  }

  protected async setAccessToken(token: string) {
    if (token) {
      this.accessToken = token;
    }
  }

  async deleteAccessToken() {
    this.accessToken = null;
  }

  autoBind(this: any) {
    const ignoreList = ['constructor', 'bindMethods', 'autoBind'];
    const list = Object.getOwnPropertyNames(this.prototype);
    list.forEach(method => {
      if (!ignoreList.includes(method)) {
        const localThis: any = this;
        localThis[method] = localThis[method].bind(this);
      }
    });
  }
}

export default HttpBaseRequest;
