import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import useFetch from '@/hooks/useFetch';

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
      street: ""
    }
  });

  const {fetchData, data, error, loading} = useFetch({url:'/auth/register', method:"POST", body:userForm, token:null})
    
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name.split(".")[1];
    if (e.target.name.split(".")[0] === "address") {
      setUserForm({
        ...userForm,
        ["address"]: {
          ...userForm.address,
          [name]: value}
      })
    }
    else {
      setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
    }
    console.log(userForm)
  }

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      localStorage.setItem('token', data.token);
      router.push('/account/profil')
    }
  }

  return (
    <>
      <Title title="Inscription" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <Input
          label="Firstname"
          type="firstName"
          name="firstName"
          placeholder="veuillez saisir votre prénom"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.firstName}
        />
        <Input
          label="Lastname"
          type="lastName"
          name="lastName"
          placeholder="veuillez saisir votre nom"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.lastName}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="veuillez saisir votre email"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <Input
          label="Phone"
          type="text"
          name="phone"
          placeholder="veuillez saisir votre numéro de téléphone"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.phone}
        />
        <Input
          label="Street"
          type="text"
          name="address.street"
          placeholder="veuillez saisir votre rue de résidence"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.street}
        />
        <Input
          label="City"
          type="text"
          name="address.city"
          placeholder="veuillez saisir votre ville de résidence"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.city}
        />
        <Input
          label="Zip Code"
          type="text"
          name="address.zipCode"
          placeholder="veuillez saisir le code postal"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.zipCode}
        />
        <label>Type de compte</label>
        <Input
          label="COMPANY"
          type="radio"
          name="userType"
          value="COMPANY"
          placeholder="COMPANY"
          required={true}
          onChange={(e) => handleChange(e)}
        />
        <Input
        label="FREELANCE"
          type="radio"
          name="userType"
          value="FREELANCE"
          placeholder="FREELANCE"
          required={true}
          onChange={(e) => handleChange(e)}
        />
        <Button
          type="submit"
          title="Se connecter"
          className="btn__secondary"
        />
      </form>
      {
        error && (
          <Notification type="warning" message={error.message} />
        )
      }
      <p>
        Vous avez déjà un compte ? <Link href="/auth/login">Connectez-vous ?</Link>
      </p>
    </>
  );
}

export default Index;
