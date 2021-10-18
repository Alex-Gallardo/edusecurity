import React, { useState, useEffect, useContext } from "react";
// UTILS
import { getFromCollection, saveInCollection } from "./../../../utils/DB";

// @MATERIAL
import Sms from "@material-ui/icons/SmsOutlined";
import Tooltip from "@material-ui/core/Tooltip";

// STYLES
import Styles from "./FComment.module.scss";
import Add from "@material-ui/icons/Add";
import TextField from "@mui/material/TextField";
import UserContext from "context/UserContext";

// PROPS
interface ForumCommentProps {
  comment: ForumComment;
}

const FComment = (props: ForumCommentProps) => {
  // STATE
  const [userComment, setUserComment] = useState<User | null>(null);
  const [commentt, setCommentt] = useState<GComment>({
    _id: "",
    message: "",
    user_id: "",
  });

  // PROPS
  const { comment } = props;

  //Context
  const userCTX = useContext(UserContext);
  const { user } = userCTX;

  useEffect(() => {
    getFromCollection<User>(comment.user_id, "users")
      .then((user) => setUserComment(user))
      .catch((err) => console.log("Error en traida de usuario: ", err));
  }, []);

  // MOSTRAR COMENTARIOS
  const showComments = () => {
    // @ts-ignore
    window.Alert({
      title:
        comment.comments.length > 0
          ? "Todos los comentarios"
          : "Aun no hay comentarios",
      body:
        comment.comments.length > 0
          ? `${comment.comments.length}. comentarios para "${comment.title}"`
          : "Sin comentarios",
      type: "confirm",
      customElements: (
        <div className={Styles.comments}>
          {comment.comments.map((c: GComment, index: number) => {
            return (
              <div className={Styles.comments_comment} key={c._id + index}>
                <h4>{c.message}</h4>
              </div>
            );
          })}
        </div>
      ),
    });
  };

  // ASIGNAR COMENTARIO
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;
    const tmpC = commentt;
    tmpC[name] = value;
    setCommentt(tmpC);
  };

  // AGREGAR NUEVO COMENTARIO
  const addNewComment = () => {
    // @ts-ignore
    window.Alert({
      title: "Añadir Comentario",
      body: "Escribe tu comentario",
      type: "confirm",
      customElements: (
        <TextField
          fullWidth
          multiline
          name="message"
          onChange={handleChange}
          style={{ marginTop: "16px" }}
        />
      ),
      onConfirm: () => {
        // VARS
        const tmpCS = comment.comments;
        const tmpCT = commentt;

        tmpCT._id = new Date().getTime() + "";
        tmpCT.user_id = user.uid;
        tmpCS.push(tmpCT);

        setCommentt({ _id: "", message: "", user_id: "" });

        // GUARDAR COMENTARIOS EN DB
        saveInCollection(
          { comments: tmpCS },
          comment._id,
          "ForumComments",
          true
        )
          .then((_res) => {
            // @ts-ignore
            window.Alert({
              title: "Comentario Guardado",
              body: "Haz añadido un nuevo comentario",
              type: "confirm",
            });
          })
          .catch((err) => console.error("savecoment-comment", err));
      },
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
              userComment !== null
                ? userComment.photo_url
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <p>
            Posteado por <span>{userComment?.name}</span>
          </p>
        </div>
        <div className={Styles.user_comments}>
          <Tooltip title="Comentarios">
            <div className={Styles.comments_ms}>
              <Sms onClick={showComments} /> <p>{comment.comments.length}</p>
            </div>
          </Tooltip>
          <Tooltip title="Añadir comentario">
            <Add className={Styles.add_} onClick={addNewComment} />
          </Tooltip>
        </div>
      </section>
    </div>
  );
};

export default FComment;
