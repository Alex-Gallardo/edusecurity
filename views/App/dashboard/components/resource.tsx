import React from "react";

// UTILS
import { deleteFromCollection } from "utils/DB";

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
}

const ResourceCmp = ({ resource }: ResourceCmpProps) => {
  // VER COMENTARIOS
  const viewComments = () => {};

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
              onConfirm: ()=>{
                  location.reload()
              }
            });
          })
          .catch((err) => {
            // @ts-ignore
            window.Alert({
              title: "Upss ocurrio un error",
              body: `Al parecer recurso ${resource.title} no se pudo eliminar. Recarga la pagina o intentalo mas tarde`,
              type: "confirm",
            });
            console.log('deleteResource-resource-', err)
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
        <IconButton onClick={viewComments}>
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
