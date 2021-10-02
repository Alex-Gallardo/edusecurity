// STYLES
import Styles from "./HeaderDsh.module.scss";

const HeaderDsh = () => {
  return (
    <nav className={Styles.container}>
      <h1>
        Edu <span>Security -</span> Dashboard
      </h1>
      <div className={Styles.config_perfil}>
        {/* <Settings className={Styles.setting_icon} onClick={sendConfig} /> */}
      </div>
    </nav>
  );
};

export default HeaderDsh;
