import React, { useContext, useState, useEffect } from "react";

// CONTEXT
import UserContext from "context/UserContext";

// UTILS
import { getAllFromCollection, saveInCollection } from "utils/DB";

// STYLES
import Styles from "./Foro.module.scss";

// @MATERIAL
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Add from "@material-ui/icons/Add";

// COMPONENTS
import FComment from "components/app/FComment/FComment";

const Foro = () => {
  // STATE
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [newComment, setNewComment] = useState<ForumComment>({
    _id: new Date().getTime() + "",
    date: new Date(),
    message: "",
    title: "",
    user_id: "",
    comments: [],
  });

  // CONTEXT
  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  useEffect(() => {
    getAllFromCollection<ForumComment>("ForumComments")
      .then((cmmts) => setComments(cmmts))
      .catch((err) => console.log("Ocurrio un error en: ", err));
  }, []);

  // MANEJADOR DE DATOS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;
    const tmp = newComment;
    tmp[name] = value;
    setNewComment(tmp);
  };

  // NUEVO FORUM-COMMENT
  const addNewComment = () => {
    // @ts-ignore
    window.Alert({
      title: "Publica tu opinion/pregunta",
      body: "Escribe la pregunta a hacer",
      type: "confirm",
      customElements: (
        <div className={Styles.container_alert}>
          <TextField
            name="title"
            style={{ marginTop: "16px" }}
            fullWidth
            label="Titulo"
            maxRows={3}
            onChange={handleChange}
          />
          <TextField
            name="message"
            style={{ marginTop: "16px" }}
            multiline
            fullWidth
            label="Mensaje"
            maxRows={8}
            onChange={handleChange}
          />
        </div>
      ),
      onConfirm: () => computeComment(),
    });
  };

  // GUARDAR EN DB
  const computeComment = () => {
    if (user) {
      const tmp = newComment;
      tmp.user_id = user.uid;
      setNewComment(tmp);
      
      saveInCollection<ForumComment>(
        newComment,
        newComment._id,
        "ForumComments"
        )
        .then(() => {
          // @ts-ignore
          window.Alert({
            title: "Tu pregunta se ha publicado",
            body: "Gracias por escibir en nuestro foro",
            type: "confirm",
          });
          setComments([...comments, tmp]);
        })
        .catch(() => {
          // @ts-ignore
          window.Alert({
            title: "Tu pregunta NO se publico",
            body: "Al parecer hubo un fallo en la app",
            type: "confirm",
          });
        });
    }
  };

  return (
    <main className={Styles.container}>
      {/* HEADER */}
      <section className={Styles.header}>
        <div className={Styles.header_info}>
          <h1>Bienvenido a nuestro Foro</h1>
          <h3>Comparte tu opinion o resuelve alguna duda</h3>
        </div>
        <div className={Styles.header_actions}>
          <TextField
            label="Buscar en foro"
            placeholder="Buscar por palabra o clave..."
            variant="outlined"
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addNewComment}
          >
            Nuevo tema
          </Button>
        </div>
      </section>

      {/* COMENTARIOS */}
      <section className={Styles.comments}>
        {comments.map((c: ForumComment) => (
          <FComment comment={c} key={`${c._id}_${c.date}`}></FComment>
        ))}
      </section>
    </main>
  );
};

export default Foro;
