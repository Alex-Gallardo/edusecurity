import React, { useEffect, useState } from "react";

// STYLES
import Styles from "./UComment.module.scss";
import { getFromCollection } from "utils/DB";

// PROPS
interface UCommentProps {
  comment: GComment;
}

const UComment = ({ comment }: UCommentProps) => {
  // STATE
  const [img, setImg] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  useEffect(() => {
    // OBTENER DATOS DEL USUARIO
    getFromCollection<User>(comment.user_id, "users").then((res: User) =>
      setImg(res.photo_url)
    );
  });

  return (
    <div className={Styles.container}>
      <img src={img} alt={comment._id} />
      <section className={Styles.comments}>
        <p>{comment.message}</p>
        <hr />
      </section>
    </div>
  );
};

export default UComment;
