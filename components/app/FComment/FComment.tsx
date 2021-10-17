import React, { useState, useEffect } from "react";
// UTILS
import { getFromCollection } from "./../../../utils/DB";

// @MATERIAL
import Sms from "@material-ui/icons/SmsOutlined";
import Tooltip from "@material-ui/core/Tooltip";

// STYLES
import Styles from "./FComment.module.scss";

// PROPS
interface ForumCommentProps {
  comment: ForumComment;
}

const FComment = (props: ForumCommentProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { comment } = props;

  useEffect(() => {
    getFromCollection<User>(comment.user_id, "users")
      .then((user) => setUser(user))
      .catch((err) => console.log("Error en traida de usuario: ", err));
  }, []);

  // MOSTRAR COMENTARIOS
  const showComments = () => {
    const { comments } = comment;

    // @ts-ignore
    window.Alert({
      title:
        comment.comments.length > 0
          ? "Todos los comentarios"
          : "Aun no hay comentarios",
      body:
        comment.comments.length > 0
          ? `${comment.comments.length}. comentarios de ${comment.title}`
          : "Sin comentarios",
      type: "confirm",
      customElements: (
        <div className={Styles.comments}>
          {comments.map((c: GComment) => {
            <div className={Styles.comments_comment}>
              <h4>{c.message}</h4>
            </div>;
          })}
        </div>
      ),
    });
  };

  return (
    <div className={Styles.container}>
      <h1>{comment.title}</h1>
      <p>{comment.message}</p>
      <hr />
      <section className={Styles.user}>
        <div className={Styles.user_info}>
          <img
            src={
              user !== null
                ? user.photo_url
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <p>
            Posteado por <span>{user?.name}</span>
          </p>
        </div>
        <Tooltip title="Comentarios">
          <div className={Styles.user_comments} onClick={showComments}>
            <Sms /> <p>{comment.comments.length}</p>
          </div>
        </Tooltip>
      </section>
    </div>
  );
};

export default FComment;
