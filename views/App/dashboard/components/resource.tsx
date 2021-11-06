import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

// UTILS
import { deleteFromCollection } from "utils/DB";
import { addToStorage, getURLFromStorage } from "utils/Storage";

// CONTEXT
import UserContext from "context/UserContext";

// COMPONENTS
import CComment from "components/app/FComment/components/CComment";

// @MATERIAL
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Comment from "@material-ui/icons/Comment";
import TextField from "@mui/material/TextField";

// STYLES
import Styles from "./resource.module.scss";

// PROPS
interface ResourceCmpProps {
  resource: Resource;
  users: User[];
}

const ResourceCmp = ({ resource, users }: ResourceCmpProps) => {
  const [srcIMG, setSrcIMG] = useState<string>("/images/click.jpg");
  const [state, setState] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });
  const [resFocus, setResFocus] = useState<Resource>(resource);

  // CONTEXT
  const userCTX = useContext(UserContext);
  const { user } = userCTX;

  useEffect(() => {
    if (resource) setResFocus(resource);
  }, [resource]);

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
              body: `Al parecer el recurso ${resource.title} no se pudo eliminar. Recarga la pagina o intentalo mas tarde`,
              type: "confirm",
            });
            console.log("deleteResource-resource-", err);
          });
      },
    });
  };

  // SETEAR VALORES
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setResFocus((state) => ({ ...state, [name]: value }));
  };

  // EDITAR RECURSO
  const edithResource = () => {
    window.Alert({
      title: "Editar recurso",
      body: "",
      type: "confirm",
      customElements: (
        <div className={Styles.ctn_edith}>
          <p>Titulo: </p>
          <TextField
            fullWidth
            multiline
            name='title'
            placeholder={resFocus.title}
            className={Styles.input}
            onChange={handleChange}
          />
          <p>Descripcion:</p>
          <TextField
            fullWidth
            multiline
            name='description'
            placeholder={resFocus.description}
            className={Styles.input}
            onChange={handleChange}
          />
          <p>Video:</p>
          <label htmlFor="user_image">
            <Image
              className={Styles.img}
              src={srcIMG}
              alt={resFocus._id}
              unoptimized
              width="164px"
              height="150px"
            />
          </label>
          <input
            id="user_image"
            accept="video/*"
            // accept="video/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            type="file"
            multiple={false}
            style={{ display: "none" }}
            onChange={(e: any) => computeResource(e)}
          />
          <p>
            (La calidad soportada es hasta 720px, no se permiten videos mayores
            a los 10 min.)
          </p>
        </div>
      ),
      onConfirm:()=>{
        console.log('antes de subir', resFocus)
      },
      onCancel: ()=>{
        setResFocus(resource)
      }
    });
  };

  // COMPUTAR STORAGE-FIREBASE - Video
  const computeResource = (value: any) => {
    // setLoading(true);
    const files = value.target.files;
    console.log("file-input", files, files[0].name);

    addToStorage(user.uid, files[0].name, files[0])
      .then((_res) => {
        getURLFromStorage(user.uid, files[0].name).then((r) => {
          console.log("Respuesta:", _res, r);
          const tmp = resource;
          tmp.resource_url = r;
          // setResource(tmp);
          setSrcIMG(
            "https://images.assetsdelivery.com/thumbnails/blankstock/blankstock1802/blankstock180200731.jpg"
          );
          // setLoading(false);

          // @ts-ignore
          window.Alert({
            title: "Accion completada",
            body: `El archivo "${files[0].name}" se ha subido correctamente!`,
            type: "confirm",
          });
        });
      })
      .catch((err) => {
        // setLoading(false);
        // @ts-ignore
        window.Alert({
          title: "Uppss, a ocurrido un error!",
          body: "Hubo un error en la subida del archivo, intenta recargar la pagina e intentalo de nuevo",
          type: "error",
        });
        console.error("upload-image-NewResource", err);
      });
  };

  return (
    <div className={Styles.resource}>
      <div className={Styles.ct_info}>
        <h3>{resFocus.title}</h3>
        <p>{resFocus.description}</p>
      </div>
      {/* VER COMENTARIOS */}
      <Tooltip title="Comentarios" className={Styles.btn_act}>
        <IconButton onClick={showComments}>
          <p className={Styles.p_}>{resFocus.comments?.length || 0}</p>
          <Comment color="disabled" />
        </IconButton>
      </Tooltip>
      {/* EDITAR RECURSO */}
      <Tooltip title="Editar" className={Styles.btn_act}>
        <IconButton onClick={edithResource}>
          <Edit color="disabled" />
        </IconButton>
      </Tooltip>
      {/* ELIMINAR RECURSO */}
      <Tooltip title="Borrar" className={Styles.btn_act}>
        <IconButton onClick={deleteResource}>
          <Delete color="disabled" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ResourceCmp;
