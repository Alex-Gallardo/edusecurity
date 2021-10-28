import React, { useState, useEffect } from "react";

// STYLES
import Styles from "./CComment.module.scss";

// PROPS
interface CCommentProps {
  comment: GComment;
  users: User[];
}

const CComment = ({ users, comment }: CCommentProps) => {
  const [user, setUser] = useState<string>("https://developers.google.com/web/images/contributors/no-photo.jpg");

  useEffect(() => {
    const tmpUsr = users.find((u) => u.uid == comment.user_id);
    if (tmpUsr) setUser(tmpUsr.photo_url);
  }, []);

  return (
    <div className={Styles.container}>
      <img src={user} alt="img" />
      <p>{comment.message}</p>
    </div>
  );
};

export default CComment;
