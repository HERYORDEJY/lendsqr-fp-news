import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsDetails from '~/screens/news/NewsDetails';
import NewsListing from '~/screens/news/NewsListing';
import { NewsStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<NewsStackParamList>();

export default function NewsStack() {
  return (
    <Navigator
      initialRouteName="NewsListing"
      // screenOptions={{ headerShown: false }}
    >
      <Screen
        name="NewsListing"
        component={NewsListing}
        options={{ headerTitle: 'News', headerLargeTitle: true }}
      />
      <Screen name="NewsDetails" component={NewsDetails} />
    </Navigator>
  );
}
