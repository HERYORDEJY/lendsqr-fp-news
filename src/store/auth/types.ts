import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from './../../../node_modules/@react-native-firebase/firestore/lib/index.d';

export interface AuthStoreInitialStateType {
  user: AuthUserType | null; //AuthUserType | null;
  additionalUserInfo?: FirebaseAuthTypes.AdditionalUserInfo | undefined; // AuthAdditionalUserInfo | null;
  bio?:
    | {
        emailAddress: string;
        phoneNumber: string;
        fullName: string;
        photoUrl: string;
      }
    | FirebaseFirestoreTypes.DocumentData
    | null;

  isLoggedIn: boolean;
}

export interface PartialAuthStoreInitialStateType
  extends Partial<AuthStoreInitialStateType> {}

export interface AuthAdditionalUserInfo {
  profile: Record<string, any> | null;
  username: string | null;
  providerId: string;
  isNewUser: boolean;
}

export interface AuthUserType extends Partial<FirebaseAuthTypes.User> {
  refreshToken?: string | null;
  tenantId?: string | null;
}

export interface Profile {
  at_hash: string;
  iat: number;
  email: string;
  exp: number;
  azp: string;
  nonce: string;
  picture: string;
  name: string;
  email_verified: boolean;
  aud: string;
  family_name: string;
  iss: string;
  sub: string;
  given_name: string;
}
