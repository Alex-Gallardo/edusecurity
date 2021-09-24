interface User {
  uid: string;
  photo_url: string;
  name: string;
  last_name: string;
  state: number;
  courses_taken: string[];
  score?: TypeUser;
  courses_id?: string[];
}

enum TypeUser {
  student = 0,
  teacher = 1
}

interface RequestCheck {
  _id: string;
  user_id: string;
  date: Date;
  state: boolean;
}
