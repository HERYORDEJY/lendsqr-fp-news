declare module 'react-native-config' {
  export interface NativeConfig {
    RAPID_API_KEY?: string;
    RAPID_API_BASE_URL?: string;
    LendsqrFpNews_ANDROID_GOOGLE_CLOUD_CLIENT_ID?: string;
    LendsqrFpNews_IOS_GOOGLE_CLOUD_CLIENT_ID?: string;
    LendsqrFpNews_WEB_GOOGLE_CLOUD_CLIENT_ID?: string;
    LendsqrFpNews_WEB_GOOGLE_CLOUD_CLIENT_SECRET?: string;
    BASE_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
