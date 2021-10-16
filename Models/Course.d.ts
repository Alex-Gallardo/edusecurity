interface Course {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  cover: string;
  score: number;
  students: string[];
  resources_id: string[];
}

interface Resource {
  _id: string;
  user_id: string;
  course_id: string;
  title: string;
  description: string;
  resource_url: string;
  comments?: GComment[];
}
