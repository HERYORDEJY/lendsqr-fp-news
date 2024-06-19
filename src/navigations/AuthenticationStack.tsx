import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '~/screens/authentication/Login';
import SignUpBio from '~/screens/authentication/SignUpBio';
import SignUpSocial from '~/screens/authentication/SignUpSocial';
import { AuthenticationStackParamList } from './types';

const { Navigator, Screen } =
  createNativeStackNavigator<AuthenticationStackParamList>();

export default function AuthenticationStack() {
  return (
    <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Screen name="SignUpBio" component={SignUpBio} />
      <Screen name="SignUpSocial" component={SignUpSocial} />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
