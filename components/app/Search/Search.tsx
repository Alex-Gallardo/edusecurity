import React, { useState } from "react";

import Styles from "./Search.module.scss";

// @MATERIAL
import Search from "@material-ui/icons/Search";

// PROPS
interface InputSearchProps {
  onSearch: any;
}

const InputSearch = (props: InputSearchProps) => {
  const [value, setValue] = useState<string>("");

  // Cambiar valor y enviarlo al padre
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dat: string = e.target.value;
    setValue(dat);
    props.onSearch(dat)
  };

  return (
    <div className={Styles.container}>
      <Search className={Styles.s_icon} />
      <input
        value={value}
        onChange={handleChange}
        className={Styles.input}
        placeholder="Buscar..."
      />
    </div>
  );
};

export default InputSearch;
