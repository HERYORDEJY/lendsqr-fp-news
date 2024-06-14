// TODO: get user response type

export type UserRoleType = 'host' | 'guest';

export interface AuthStoreInitialStateType {
  // isViewedOnboarding: boolean;
  isViewedWalkthrough: boolean;
  isInSession: boolean;
  // session: Session | null; // AuthSessionStateType | null;
  userRole: UserRoleType | null;
}

export interface PartialAuthStoreInitialStateType {
  isViewedOnboarding?: boolean;
  isViewedWalkthrough?: boolean;
  isInSession?: boolean;
  // session?: Session | null; // AuthSessionStateType | null;
  userRole?: UserRoleType | null;
}

export type AuthSessionStateType = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  // user: User;
};

export type AuthSessionUserType = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  last_sign_in_at: Date;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
    user_role: string;
  };
  identities: Array<AuthSessionUserIdentityType>;
  created_at: Date;
  updated_at: Date;
  is_anonymous: boolean;
};

export interface AuthSessionUserIdentityType {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
  email: string;
}
