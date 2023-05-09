import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Title from "@/components/UI/Title";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import useFetch from "@/hooks/useFetch";
import styles from "./index.module.scss";

const Index = () => {
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
    userType: "",
    address: {
      city: "",
      zipCode: "",
      street: "",
    },
  });

  const { fetchData, data, error, loading } = useFetch({
    url: "/auth/register",
    method: "POST",
    body: userForm,
    token: null,
  });

  const handleUserChange = (e) => {
    const value = e.target.value;
    const name = e.target.name.split(".")[1];
    if (e.target.name.split(".")[0] === "address") {
      setUserForm({
        ...userForm,
        ["address"]: {
          ...userForm.address,
          [name]: value,
        },
      });
    } else {
      setUserForm({
        ...userForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      localStorage.setItem("token", data.token);
      router.push("/profil");
    }
  };

  return (
    <>
      <Title title="Inscription" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <div className={styles.displayLayout}>
          <Input
            label="Firstname"
            type="firstName"
            name="firstName"
            placeholder="Arnold"
            required={true}
            onChange={(e) => handleUserChange(e)}
            value={userForm.firstName}
          />
          <Input
            label="Lastname"
            type="lastName"
            name="lastName"
            placeholder="Schwarzenegger"
            required={true}
            onChange={(e) => handleUserChange(e)}
            value={userForm.lastName}
          />
        </div>
        <div className={styles.displayLayout}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="email@example.com"
            required={true}
            onChange={(e) => handleUserChange(e)}
            value={userForm.email}
          />
          <Input
            label="Phone"
            type="text"
            name="phone"
            placeholder="06 00 00 00 00"
            required={true}
            onChange={(e) => handleUserChange(e)}
            value={userForm.phone}
          />
        </div>
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Mot de passe"
          required={true}
          onChange={(e) => handleUserChange(e)}
          value={userForm.password}
        />
        <Input
          label="Street"
          type="text"
          name="address.street"
          placeholder="5 avenue Anatole France"
          required={true}
          onChange={(e) => handleUserChange(e)}
          value={userForm.address.street}
        />
        <div className={styles.displayLayout}>
          <Input
            label="City"
            type="text"
            name="address.city"
            placeholder="Paris"
            required={true}
            onChange={(e) => handleUserChange(e)}
            value={userForm.address.city}
          />
          <Input
            label="Zip Code"
            type="text"
            name="address.zipCode"
            placeholder="75000  "
            required={true}
            onChange={(e) => handleUserChange(e)}
            value={userForm.address.zipCode}
          />
        </div>
        <label>Type de compte</label>
        <select
          id="userType"
          name="userType"
          className={styles.select}
          onChange={(e) => handleUserChange(e)}
        >
          <option value="">--Veuillez choisir une option--</option>
          <option value="COMPANY">Company</option>
          <option value="FREELANCE">Freelance</option>
        </select>
        {(userForm.userType === "COMPANY" && (
          <>
            <label>Company</label>
          </>
        )) ||
          (userForm.userType === "FREELANCE" && (
            <>
              <label>Freelance</label>
            </>
          ))}
        <Button type="submit" title="Se connecter" className="btn__secondary" />
      </form>
      {error && <Notification type="warning" message={error.message} />}
      <p>
        Vous avez déjà un compte ?{" "}
        <Link href="/auth/login">Connectez-vous ?</Link>
      </p>
    </>
  );
};

export default Index;
