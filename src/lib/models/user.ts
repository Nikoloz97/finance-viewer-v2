export interface User {
  _id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  occupation?: string;
  profileImagePath?: string | null;
}
