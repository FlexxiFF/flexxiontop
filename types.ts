
export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  visible: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
}

export type ViewState = 'public' | 'login' | 'admin';
