interface Report {
  _id: string;
  message: string;
  type: number;
  state: bool;
  user_id?: string;
  video_id?: string;
  course_id?: string
}
