type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  NewsList: undefined;
  NewsDetail: { news: any }; // Adjust type according to your news object structure
};

export type AuthenticationStackParamList = {
  Login: undefined;
  SignUpBio: undefined;
  SignUpSocial: undefined;
};

export type NewsStackParamList = {
  NewsListing: undefined;
  Profile: undefined;
  NewsDetails: { news: string; isLoadingWebpage?: boolean };
  BookmarkedNewsListing: undefined;
};
