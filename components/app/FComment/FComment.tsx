import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

// UTILS
import { saveInCollection } from "utils/DB";

// COMPONENTS
import CComment from "./components/CComment";

// @MATERIAL
import Sms from "@material-ui/icons/SmsOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Add from "@material-ui/icons/Add";
import TextField from "@mui/material/TextField";

// CONTEXT
import UserContext from "context/UserContext";

// STYLES
import Styles from "./FComment.module.scss";

// PROPS
interface ForumCommentProps {
  comment: ForumComment;
  users: User[];
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
  const { comment, users } = props;

  //Context
  const userCTX = useContext(UserContext);
  const { user } = userCTX;

  useEffect(() => {
    const tmpUsr = users.find((u) => u.uid == comment.user_id);
    // console.log("users:", users, tmpUsr);
    setUserComment(tmpUsr);
  }, [users]);

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
              <CComment users={users} comment={c} key={`${c._id}_${index}`} />
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
          <Image
            src={
              userComment != null || userComment != undefined
                ? userComment.photo_url
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className={Styles.img}
            unoptimized
            width="30px"
            height="30px"
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
