export interface User {
  _id: string;
  photo_url: string;
  name: string;
  last_name: string;
  state: number;
  courses_taken: string[];
  score?: TypeUser;
  courses_id?: string[];
}

export enum TypeUser {
  student = 0,
  teacher = 1,
}
