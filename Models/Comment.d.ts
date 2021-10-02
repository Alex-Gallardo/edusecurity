interface GComment {
  _id: string;
  message: string;
  user_id: string;
}

interface ForumComment {
  _id: string;
  title: string;
  message: string;
  date: Date;
  user_id: string;
  comments: GComment[];
}
