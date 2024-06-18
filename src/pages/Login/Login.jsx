import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import TrackVisibility from "react-on-screen";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "../../assets/style/Login.css";
import { useNavigate } from "react-router-dom";
import authService from "../../Service/AuthService/AuthService";
import { Alert } from "react-bootstrap";
import Bienvenu from "./Bienvenu";
import Images from "./Images";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const sendLoginRequest = () => {
    authService
      .login(email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        setError("Vérifiez votre email ou mot de passe");
      });
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email est vide")
      .email("Email ")
      .matches(/@gmail\.com$/, 'L\'email doit se terminer par "@gmail.com"'),
    password: Yup.string()
      .required("Password est vide")
      .min(6, "Password doit superieur 6 caracteres")
      .max(12, "Password must not exceed 12 characters"),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const openRegistre = () => {
    navigate("/registre");
  };

  return (
    <div className="containerLogin">
      <Row className="aligh-items-center">
        <Col xs={12} md={6} xl={7}>
          <TrackVisibility>
            <form className="login" onSubmit={handleSubmit(sendLoginRequest)}>
              <div className="col-md-8 offset-md-3 border rounded p-3 mt-1 shadow">
                <Bienvenu />
                <Col size={12} className="px-1">
                  <input
                    type="text"
                    placeholder="E-mail"
                    id="email"
                    value={email}
                    {...register("email")}
                    className={` ${errors.email ? "is-invalid" : ""}`}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </Col>
                <br></br>
                <Col size={12} className="px-1">
                  <input
                    type="text"
                    placeholder="Password"
                    id="password"
                    value={password}
                    {...register("password")}
                    className={`${errors.password ? "is-invalid" : ""}`}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </Col>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="loginbouton">
                  <button id="submit" type="submit" className="bouton">
                    Se connecter
                    <ArrowRightCircle size={25} />
                  </button>
                  <button onClick={() => openRegistre()} className="bouton">
                    Créer compte
                  </button>
                </div>
              </div>
            </form>
          </TrackVisibility>
        </Col>

        <Col xs={12} md={6} xl={5}>
          <Images />
        </Col>
      </Row>
    </div>
  );
}
