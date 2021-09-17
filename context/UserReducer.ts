import { AGREGAR_USUARIO } from "../types";

const UserReducer = (state, action) => {
  switch (action.type) {
    case AGREGAR_USUARIO:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
