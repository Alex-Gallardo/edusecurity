import React, { useContext, useEffect, useState } from "react";

// COMPONENTS
import UComment from "./components/UComment/UComment";

// UTILS
import { saveInCollection } from "utils/DB";

// CONTEXT
import UserContext from "context/UserContext";

// @MATERIAL
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";

// STYLES
import Styles from "./BoxComments.module.scss";
import { Send } from "@material-ui/icons";

// PROPS
interface BoxCommentsProps {
  courseID: string;
  comments?: GComment[];
}

const BoxComments = (props: BoxCommentsProps) => {
  // STATE
  const [comments, setComments] = useState<GComment[]>([]);
  const [comment, setComment] = useState<GComment>({
    _id: new Date().getTime() + "",
    message: "",
    user_id: "",
  });

  // CONTEXT
  const userCTX = useContext(UserContext);
  const { user } = userCTX;

  // SETEAR COMENTARIOS
  useEffect(() => {
    if (props.comments) setComments(props.comments);
  }, []);

  // AGREGAR COMENTARIO
  const addComment = () => {
    // Validar que exista usurio y halla mensaje
    if (comment != null && user) {
      // Comentario nuevo
      const tmpC = comment;
      tmpC._id = new Date().getTime() + "";
      tmpC.user_id = user.uid;

      const tmpCS = comments;
      tmpCS.push(tmpC);
      setComments(tmpCS);
      console.log("Entro-comentarios-state:", comments);

      console.log("<send>", comments);
      setComment({ _id: "", message: "", user_id: "" });

      saveInCollection<Resource>(
        { comments },
        props.courseID,
        "Resources",
        true
      )
        .then((_res) => console.log("Mensaje subido correctamente"))
        .catch((err) => {
          console.error("saveResourceComments-merge-BoxComments", err);
          
          // @ts-ignore
          window.Alert({
            title: "Mensaje no enviado!",
            body: "Ocurrio un error al enviar el mensaje, prueba de nuevo o intentalo mas tarde.",
            type: "Confirm",
          });
        });
    }
  };

  // SETEAR VALORES
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setComment((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className={Styles.container}>
      <section className={Styles.comments}>
        {comments.map((com: GComment, i: number) => (
          <UComment comment={com} key={`${com._id}_${i}`} />
        ))}
      </section>
      <div className={Styles.add_comment}>
        <TextField
          fullWidth
          label="Comentario"
          name="message"
          onChange={handleChange}
          value={comment.message}
        ></TextField>
        <Fab
          onClick={addComment}
          color="primary"
          variant="extended"
          className={Styles.btn_add}
        >
          <Send />
        </Fab>
      </div>
    </div>
  );
};

export default BoxComments;
