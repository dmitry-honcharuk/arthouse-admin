export interface User {
  id: string;
  email: string;
  facebookId: string;
  googleId: string;
  profile: {
    firstName: string | null;
    lastName: string | null;
    nickname: string | null;
    socialLinks: string[];
    summary: string | null;
  };
  admin: any | null;
}
