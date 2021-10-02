import React, { useEffect, useState } from "react";

// UTILS
import { deleteFromCollection, getFromCollection } from "utils/DB";
import { saveInCollection } from "utils/DB";

// STYLES
import Styles from "./ViewRequest.module.scss";

// @MATERIAL
import ToggleButton from "@mui/material/ToggleButton";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

// PROPS
interface VRequestProps {
  request: GComment;
}

const ViewRequest = ({ request }: VRequestProps) => {
  const [user, setUser] = useState<User | null>(null);

  // OPTIMIZAR PARA QUE SOLO TRAIGA LA IMG_PERFIL
  useEffect(() => {
    getFromCollection<User>(request.user_id, "users")
      .then((u: User) => setUser(u))
      .catch((err) => console.error("get-user-viewRequest:", err));
  }, []);

  //   DAR DE ALTA
  const aceptUser = () => {
    // @ts-ignore
    window.Alert({
      title: "Aceptar solicitud",
      body: `Seguro que quieres dar de alta a ${user.name}`,
      type: "confirm",
      onConfirm: () => {
        saveInCollection<User>({ state: 1 }, user.uid, "users", true)
          .then((_res) => {
            deleteFromCollection(request._id, "RequestCheck")
              .then((_res) => {
                location.reload();
                // @ts-ignore
                window.Alert({
                  title: `Haz dado de alta a ${user.name}`,
                  body: "Este usuario cambio a rol de maestro",
                  type: "confirm",
                });
              })
              .catch((err) =>
                console.log("delete-RequestCheck-ViewRequest:", err)
              );
          })
          .catch((err) => console.log("state=1-user-ViewRequest:", err));
      },
    });
  };

  //   DAR DE BAJA
  const rejectUser = () => {
    // @ts-ignore
    window.Alert({
      title: "Rechazar solicitud",
      body: "Seguro que quieres rechazar esta solicitud?",
      type: "confirm",
      onConfirm: () => {
        deleteFromCollection(request._id, "RequestCheck")
          .then((_res) => {
            // @ts-ignore
            window.Alert({
              title: `Haz dado de baja a ${user.name}`,
              body: "Este usuario no cambio su rol de estudiante",
              type: "confirm",
              onConfirm: () => location.reload(),
            });
          })
          .catch((err) => console.log("state=0-user-ViewRequest:", err));
      },
    });
  };

  return (
    <div className={Styles.box}>
      {/* INFORMACION */}
      <div className={Styles.info}>
        <img src={user?.photo_url} alt={user?.name} />
        <div className={Styles.info_user}>
          <h3>{`${user?.name} ${user?.last_name}`}</h3>
          <p>{request.message}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className={Styles.actions}>
        <ToggleButton value="thumbUp" onClick={aceptUser}>
          <ThumbUp />
        </ToggleButton>
        <ToggleButton value="thumbDown" onClick={rejectUser}>
          <ThumbDown />
        </ToggleButton>
      </div>
    </div>
  );
};

export default ViewRequest;
