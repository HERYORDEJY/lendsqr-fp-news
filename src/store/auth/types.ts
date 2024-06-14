import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from './../../../node_modules/@react-native-firebase/firestore/lib/index.d';

export interface AuthStoreInitialStateType {
  user: FirebaseAuthTypes.User | null; //AuthUserType | null;
  additionalUserInfo?: FirebaseAuthTypes.AdditionalUserInfo | undefined; // AuthAdditionalUserInfo | null;
  bio?:
    | {
        emailAddress: string;
        phoneNumber: string;
        fullName: string;
      }
    | FirebaseFirestoreTypes.DocumentData
    | null;

  isLoggedIn: boolean;
}

export interface PartialAuthStoreInitialStateType
  extends Partial<AuthStoreInitialStateType> {}

export interface AuthAdditionalUserInfo {
  profile: null;
  username: null;
  providerId: string;
  isNewUser: boolean;
}

export type AuthUserType = {
  displayName: null;
  multiFactor: {
    enrolledFactors: Array<any>;
  };
  isAnonymous: boolean;
  emailVerified: boolean;
  providerData: Array<{
    providerId: string;
    uid: string;
    email: string;
  }>;
  uid: string;
  email: string;
  refreshToken: string;
  tenantId: null;
  phoneNumber: null;
  photoURL: null;
  metadata: { creationTime: number; lastSignInTime: number };
  providerId: string;
};
