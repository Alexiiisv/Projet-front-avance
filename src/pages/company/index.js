import styles from "./index.module.scss";

const Index = () => {
  return (
    <div>
      <div className={styles.ProfileName}>
        <p className={styles.color}>Page Company</p>
      </div>
      <p>Création d'une mission indisponible</p>
    </div>
  );
};

export default Index;
