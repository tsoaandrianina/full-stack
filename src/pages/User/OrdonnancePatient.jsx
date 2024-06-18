import { useState,useEffect } from "react";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

export default function OrdonnancePatient({ onPrevious, user, consultation }) {
  const [ordonnance, setOrdonnance] = useState({
    medicament: "",
    nombre_medicament: "",
    duree_traitement: "",
    mode_traitement: "",
    observation: "",
    consultation: "",
  });
  
  const {
    medicament,
    nombre_medicament,
    duree_traitement,
    mode_traitement,
    observation,
  } = ordonnance;

 
  const onInputChange = (e) => {
    setOrdonnance({ ...ordonnance, [e.target.name]: e.target.value });
  };

  const validationSchema = Yup.object().shape({
    medicament: Yup.string().required("Verifier bien le resultat entree"),
    nombre_medicament: Yup.string().required("Verifier bien l'entre"),
    duree_traitement: Yup.string().required("Verifier bien l'entre"),
    mode_traitement: Yup.string().required("Verifier bien l'entre"),
    observation: Yup.string().required("Verifier bien l'entre"),
  });

  useEffect(() => {
    setOrdonnance({...ordonnance, consultation:consultation});
  }, [consultation])
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (e) => {
    await axios
      .post(`http://localhost:8080/ordonnance`,ordonnance)
      .then((response) => {
        alert("ordonnance bien enregistré");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
      
  };
  return (
    <div>
      <Row className="aligh-items-center">
        <TrackVisibility>
          <form className="login" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h3>
                Ordonnance : {user.name} {consultation}
              </h3>
              <Row>
                <Col size={12} sm={6} className="px-4">
                  <span>Medicament</span>
                  <select
                    {...register("medicament")}
                    value={medicament}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option></option>
                    <option value="Paracetamol">paraceta</option>
                    <option value="Vitamine C">VitaminC</option>
                  </select>
                </Col>
                <Col size={12} sm={1} className="px-1"></Col>
                <Col size={12} sm={4} className="px-1">
                  <span className="Text">Nombre</span>
                  <input
                    name="nombre_medicament"
                    type="text"
                    value={nombre_medicament}
                    {...register("nombre_medicament")}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div className="invalid-feedback">
                    {errors.nombre_medicament?.message}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col size={12} sm={6} className="px-4">
                  <span className="Text">Duree de traitement </span>
                  <input
                    name="duree_traitement"
                    type="text"
                    value={duree_traitement}
                    {...register("duree_traitement")}
                    className={` ${errors.duree_traitement ? "is-invalid" : ""}`}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div className="invalid-feedback">
                    {errors.duree_traitement?.message}
                  </div>
                </Col>
                <Col size={12} sm={1} className="px-1"></Col>
                <Col size={12} sm={4} className="px-1">
                  <span className="Text">Mode traitement</span>
                  <input
                    name="mode_traitement"
                    type="text"
                    value={mode_traitement}
                    {...register("mode_traitement")}
                    className={` ${errors.mode_traitement ? "is-invalid" : ""}`}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div className="invalid-feedback">
                    {errors.mode_traitement?.message}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size={12} sm={12} className="px-4">
                  <span className="Text">Observationou remarque</span>
                  <textarea
                    name="observation"
                    value={observation}
                    {...register("observation")}
                    onChange={(e) => onInputChange(e)}
                    className={` ${errors.observation ? "is-invalid" : ""}`}
                  />

                  <div className="invalid-feedback">
                    {errors.observation?.message}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size={12} sm={4}>
                  <button onClick={onPrevious} className="prevButton">
                    {" "}
                    &lt;&lt; Précédent
                  </button>
                </Col>
                <Col size={12} sm={8}>
                  <button type="submit" 
                  className="enregistrerButton"
                  
                  >
                    Enregistrer
                  </button>
                </Col>
              </Row>
            </div>
          </form>
        </TrackVisibility>
      </Row>
    </div>
  );
}
