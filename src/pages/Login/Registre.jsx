import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "animate.css";
import { Link } from "react-router-dom";
import TrackVisibility from "react-on-screen";
import "../../assets/style/Registre.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function Registre() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    datenaissance: "",
    sexe: "",
    adresse: "",
    tel: "",
    email: "",
    type: "Docteur",
    password: "",
  });
  const {
    name,
    username,
    datenaissance,
    sexe,
    adresse,
    tel,
    email,
    type,
    password,
  } = user;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Nom est vide")
      .matches(/^[a-zA-Z ]+$/, "Le nom ne doit contenir que des lettres"),
    username: Yup.string()
      .required("Prenom est vide")
      .min(3, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters")
      .matches(/^[a-zA-Z ]+$/, "Le prenom ne doit contenir que des lettres"),
    datenaissance: Yup.date()
      .required("Date de naissance est obligatoire")
      .max(
        new Date(),
        "Date de naissance ne peut pas être postérieure à aujourd'hui"
      ),
    sexe: Yup.string().oneOf(["Masculin", "Feminin"], "Votre sexe"),
    adresse: Yup.string()
      .required("Adresse est vide")
      .min(3, "Adresse doit plus de 3 caracteres")
      .max(20, "Username must not exceed 20 characters"),
    tel: Yup.string()
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{2,4}[-\s.]?[0-9]{2,4}$/,
        "Veuillez saisir un numéro de téléphone valide"
      )
      .required("Veuillez saisir un numéro de téléphone"),
    type: Yup.string().oneOf(["Docteur", "Patient"], "Choisir le type"),
    email: Yup.string()
      .required("Email est vide")
      .email("Email ")
      .matches(/@gmail\.com$/, 'L\'email doit se terminer par "@gmail.com"'),
    password: Yup.string()
      .required("Password est vide")
      .min(6, "Mot de passe doit superieur 6 caracteres")
      .max(12, "Mot de passe doit not exceed 12 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirmer bien votre mot de passe"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    await axios
      .post("http://localhost:8080/user", user)
      .then((response) => {
        alert("Enregistrement reussi");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="container">
      <Row className="aligh-items-center">
        <br></br>
        <Col size={12} md={6}>
          <TrackVisibility>
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-12 offset-md-6 border rounded p-4 mt-2 shadow">
                <h1>
                  <span> Registre </span>
                </h1>
                <Row>
                  <Col size={12} sm={12} className="px-1">
                    <input
                      placeholder="Nom"
                      name="name"
                      type="text"
                      value={name}
                      {...register("name")}
                      className={` ${errors.name ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.name?.message}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col size={12} sm={12} className="px-1">
                    <input
                      placeholder="Prenom"
                      name="username"
                      type="text"
                      value={username}
                      {...register("username")}
                      className={` ${errors.username ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.username?.message}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      type="date"
                      {...register("datenaissance")}
                      value={datenaissance}
                      onChange={(e) => onInputChange(e)}
                    />
                    {errors.datenaissance && (
                      <span>{errors.datenaissance.message}</span>
                    )}
                  </Col>

                  <Col size={12} sm={6} className="px-1">
                    <select
                      {...register("sexe")}
                      value={sexe}
                      onChange={(e) => onInputChange(e)}
                    >
                      <option>Sexe</option>
                      <option value="Masculin">Masculin</option>
                      <option value="Feminin">Feminin</option>
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      placeholder="Adresse"
                      name="adresse"
                      type="text"
                      value={adresse}
                      {...register("adresse")}
                      className={`${errors.adresse ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.adresse?.message}
                    </div>
                  </Col>

                  <Col size={12} sm={6} className="px-1">
                    <input
                      placeholder="Telephone"
                      name="tel"
                      type="tel"
                      value={tel}
                      {...register("tel")}
                      className={`${errors.tel ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.tel?.message}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      placeholder="E-mail"
                      name="email"
                      type="text"
                      value={email}
                      {...register("email")}
                      className={` ${errors.email ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  </Col>

                  <Col size={12} sm={6} className="px-1">
                    <select
                      {...register("type")}
                      value={type}
                      onChange={(e) => onInputChange(e)}
                    >
                      <option>Type</option>
                      <option value="Docteur">Docteur</option>
                      <option value="Patient">Infirmiere</option>
                    </select>
                    <div className="invalid-feedback">
                      {errors.type?.message}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      placeholder="Mot de passe"
                      name="password"
                      type="password"
                      value={password}
                      {...register("password")}
                      className={`${errors.password ? "is-invalid" : ""}`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </Col>
                  <Col size={12} sm={6} className="px-1">
                    <input
                      placeholder="Confirmer mot de passe"
                      name="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                      className={`${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      onChange={(e) => onInputChange(e)}
                    />
                    <div className="invalid-feedback">
                      {errors.confirmPassword?.message}
                    </div>
                  </Col>
                </Row>
                <div className="form-group">
                  <button type="submit">Enregistrer</button>
                  <Link to="/" className="boutonretour">
                    Retour
                  </Link>
                </div>
              </div>
            </form>
          </TrackVisibility>
        </Col>
      </Row>
    </div>
  );
}
