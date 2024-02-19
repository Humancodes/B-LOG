import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>B-LOG</div>
      <div className={styles.text}>
        B-LOG thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
