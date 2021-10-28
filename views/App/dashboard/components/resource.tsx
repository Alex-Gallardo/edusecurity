import React from "react";

// UTILS
import { deleteFromCollection } from "utils/DB";

// COMPONENTS
import CComment from "components/app/FComment/components/CComment";

// @MATERIAL
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Delete from "@material-ui/icons/Delete";
import Comment from "@material-ui/icons/Comment";

// STYLES
import Styles from "./resource.module.scss";

// PROPS
interface ResourceCmpProps {
  resource: Resource;
  users: User[]
}

const ResourceCmp = ({ resource, users }: ResourceCmpProps) => {


  // MOSTRAR COMENTARIOS
  const showComments = () => {
    // @ts-ignore
    window.Alert({
      title:
        resource.comments.length > 0
          ? "Todos los comentarios"
          : "Aun no hay comentarios",
      body:
        resource.comments.length > 0
          ? `${resource.comments.length}. comentarios para "${resource.title}"`
          : "Sin comentarios",
      type: "confirm",
      customElements: (
        <div className={Styles.comments}>
          {resource.comments.map((c: GComment, index: number) => {
            return (
              <CComment users={users} comment={c} key={`${c._id}_${index}`} />
            );
          })}
        </div>
      ),
    });
  };

  // ELIMINAR RECURSO
  const deleteResource = () => {
    // @ts-ignore
    window.Alert({
      title: "Deseas eliminar este recurso?",
      body: "Si eliminas este recurso ya no lo podras rehacer, estas seguro?",
      type: "confirm",
      onConfirm: () => {
        deleteFromCollection(resource._id, "Resources")
          .then((_res) => {
            // @ts-ignore
            window.Alert({
              title: "Recurso eliminado",
              body: `El recurso ${resource.title} se elimino con exito`,
              type: "confirm",
              onConfirm: () => {
                location.reload();
              },
            });
          })
          .catch((err) => {
            // @ts-ignore
            window.Alert({
              title: "Upss ocurrio un error",
              body: `Al parecer recurso ${resource.title} no se pudo eliminar. Recarga la pagina o intentalo mas tarde`,
              type: "confirm",
            });
            console.log("deleteResource-resource-", err);
          });
      },
    });
  };

  return (
    <div className={Styles.resource}>
      <div className={Styles.ct_info}>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
      </div>
      {/* VER COMENTARIOS */}
      <Tooltip title="Comentarios" className={Styles.btn_act}>
        <IconButton onClick={showComments}>
          <p className={Styles.p_}>{resource.comments?.length || 0}</p>
          <Comment color="disabled" />
        </IconButton>
      </Tooltip>
      {/* ELIMINAR RECURSO */}
      <Tooltip title="Borrar recurso" className={Styles.btn_act}>
        <IconButton onClick={deleteResource}>
          <Delete color="disabled" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ResourceCmp;
