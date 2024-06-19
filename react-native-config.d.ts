declare module 'react-native-config' {
  export interface NativeConfig {
    RAPID_API_KEY?: string;
    RAPID_API_BASE_URL?: string;
    LendsqrFpNews_ANDROID_GOOGLE_CLOUD_CLIENT_ID?: string;
    LendsqrFpNews_IOS_GOOGLE_CLOUD_CLIENT_ID?: string;
    LendsqrFpNews_WEB_GOOGLE_CLOUD_CLIENT_ID?: string;
    LendsqrFpNews_WEB_GOOGLE_CLOUD_CLIENT_SECRET?: string;
    RAPID_API_HOST?: string;
    RAPID_API_HOSTNAME?: string;
    NewsAPI_BASE_URL?: string;
    BASE_URL?: string;
    LendsqrFpNews_IOS_APPCENTER_API_TOKEN?: string;
    LendsqrFpNews_IOS_APPCENTER_CODEPUSH_DEPLOYMENT_STAGING_KEY?: string;
    LendsqrFpNews_IOS_APPCENTER_CODEPUSH_DEPLOYMENT_PRODUCTION_KEY?: string;
    LendsqrFpNews_ANDROID_APPCENTER_CODEPUSH_DEPLOYMENT_STAGING_KEY?: string;
    LendsqrFpNews_ANDROID_APPCENTER_CODEPUSH_DEPLOYMENT_PRODUCTION_KEY?: string;
    LendsqrFpNews_ANDROID_APPCENTER_APP_SECRET?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
