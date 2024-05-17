type avatar = {
  high: string;
  low: string;
  medium: string;
  id: number;
};

export interface UserData {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  avatar: avatar;
  type: string;
  created: string;
  modified: string;
  role: string;
}
