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
  const [userF, setUserF] = useState<User | null>(null);
  const { comment } = props;
  const [comments, setComments] = useState<GComment[]>([])
  const [commentt, setCommentt] = useState<GComment>({
    _id: "",
    message: "",
    user_id: ""
  })

  //Context 
  const userCtx = useContext(UserContext)
  const { user } = userCtx



  useEffect(() => {
    getFromCollection<User>(comment.user_id, "users")
      .then((user) => setUserF(user))
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
          ? `${comment.comments.length}. comentarios de ${comment.title}`
          : "Sin comentarios",
      type: "confirm",
      customElements: (
        <div className={Styles.comments}>
          {comment.comments.map((c: GComment, index:number) => {
            return <div className={Styles.comments_comment} key={c._id+index}>
              <h4>{c.message}</h4>
            </div>;
          })}
        </div>
      ),
    });
  };

  const computetext = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value, name } } = e
    const tmpC = commentt
    tmpC.message = value
    tmpC._id = new Date().getTime() + ""
    tmpC.user_id = user.uid
    setCommentt(tmpC)

  }

  const addnewcomment = () => {
    // @ts-ignore
    window.Alert({
      title: "Añadir Comentario",
      body: "Escribir comentario",
      type: "confirm",
      customElements: (
        <div>
          <TextField fullWidth name="comment" onChange={computetext}>

          </TextField>
        </div>

      ), onConfirm: () => {
        //  setComments([...comments])
        console.log(comments, commentt)
        const tmpCS = comment.comments
        tmpCS.push(commentt)
        setComments(tmpCS)
        setCommentt({ _id: "", message: "", user_id: "" })
        console.log(tmpCS, comment._id)
        saveInCollection({ comments:tmpCS }, comment._id, "ForumComments", true).then((res) => {
          // @ts-ignore
          window.Alert({
            title: "Comentario Guardado",
            body: "Haz añadido un nuevo comentario",
            type: "confirm"
          })
        }).catch((err) => console.error("savecoment-comment", err))
      }
    })



  }

  return (
    <div className={Styles.container}>
      <h1>{comment.title}</h1>
      <p>{comment.message}</p>
      <hr />
      <section className={Styles.user}>
        <div className={Styles.user_info}>
          <img
            src={
              userF !== null
                ? userF.photo_url
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <p>
            Posteado por <span>{userF?.name}</span>
          </p>
        </div>
        <Tooltip title="Comentarios">
          <div className={Styles.user_comments} >
            <Sms onClick={showComments} /> <p>{comment.comments.length}</p>
            <Add onClick={addnewcomment} />
          </div>
        </Tooltip>
      </section>
    </div>
  );
};

export default FComment;
