import styles from "./index.module.scss";

const Index = () => {
  return (
    <div>
      <div className={styles.ProfileName}>
        <p className={styles.color}>Page Freelance</p>
      </div>
      <p>Liste des missions proposées au Compte</p>
      <p>Aucune mission proposée</p>
    </div>
  );
};

export default Index;
