import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Logo from "../../../../public/images/Logo.png";
import NavItem from "@/components/UI/NavItem";
import Button from "@/components/UI/Button";

const Index = () => {
  const router = useRouter();

  const { user, isLogged, logout } = useContext(UserContext);

  const menu = [
    {
      title: "Home",
      link: "./",
      className: styles.nav__item,
    },
    {
      title: "About",
      link: "./about",
      className: styles.nav__item,
    },
    {
      title: "Profil",
      link: "./profil",
      className: styles.nav__item,
    },
  ];
  if (user && user.userType === "FREELANCE") {
    menu.push({
      title: "Freelance",
      link: "./freelance",
      className: styles.nav__item,
    });
  }
  if (user && user.userType === "COMPANY") {
    menu.push({
      title: "Company",
      link: "./company",
      className: styles.nav__item,
    });
  }

  return (
    <div className={`${styles.wrapper} flex`}>
      <div className={styles.logo}>
        <img src={Logo.src} alt="Qonto" />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {menu.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
          {isLogged ? (
            <li>
              {/* <span>Bonjour {user && user.firstName}</span> */}
              <Button
                type="button"
                title="logout"
                className="btn__primary"
                handleClick={() => logout()}
              />
            </li>
          ) : (
            <li className={styles.nav__item}>
              <Button
                type="button"
                title="login"
                className="btn__primary"
                handleClick={() => router.push("/auth/login")}
              />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Index;
