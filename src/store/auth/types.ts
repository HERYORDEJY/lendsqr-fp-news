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

export type AuthUserType = {
  displayName: string | null;
  multiFactor: {
    enrolledFactors: Array<any>;
  };
  isAnonymous: boolean;
  emailVerified: boolean;
  providerData?:
    | FirebaseAuthTypes.UserInfo[]
    | Array<{
        providerId: string;
        uid: string;
        email: string;
      }>;
  uid: string;
  email: string;
  refreshToken?: string;
  tenantId?: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  metadata?:
    | FirebaseAuthTypes.UserMetadata
    | { creationTime: number; lastSignInTime: number };
  providerId: string;
};
