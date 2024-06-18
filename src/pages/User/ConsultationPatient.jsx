import { useEffect, useState } from "react";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

function ConsultationPatient({ onNext, onPrevious ,user, setConsultationId }) {

  const [consultation, setConsultation] = useState({
    date_consultation: "",
    maladie: "",
    resultat: "",
    user: "",
  });

  const {  date_consultation,maladie, resultat} = consultation;

  const validationSchema = Yup.object().shape({
    resultat: Yup.string().required("Verifier bien le resultat entree"),
    maladie: Yup.string().required("Verifier bien l'entre"),
    date_consultation: Yup.date()
      .required("Date de naissance est obligatoire")
      .max(
        new Date(),
        "Date de consultation ne peut pas être postérieure à aujourd'hui"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onInputChange = (e) => {
    setConsultation({ ...consultation, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setConsultation({...consultation, user: user.id})
  }, [user.id])
  

  const onSubmit = async () => {
    onNext();
    await axios
      .post(`http://localhost:8080/consultation`,consultation)
      .then((response) => {
        setConsultationId(response.data.id_consultation);
      })
      .catch((error) => {
       
      });

  };
  return (
    <div>
      <Row>
        <TrackVisibility>
            <div>
              <h3>Consultation : {user.name}</h3>

              <form className="login" onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col size={12} sm={6} className="px-4">
                  <span className="Text">Date consultation </span>
                 
                   <input
                   type="date"
                   name="date_consultation"
                   value={date_consultation}
                   {...register("date_consultation")}
                   className={` ${
                     errors.date_consultation ? "is-invalid" : ""
                   }`}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div className="invalid-feedback">
                    {errors.date_consultation?.message}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size={12} sm={6} className="px-4">
                  <span className="Text">Nom de la maladie </span>
                  <input
                    name="maladie"
                    type="text"
                    value={maladie}
                    {...register("maladie")}
                    className={` ${errors.maladie ? "is-invalid" : ""}`}
                    onChange={(e) => onInputChange(e)}
                  />
                  <div className="invalid-feedback">
                    {errors.maladie?.message}
                  </div>
                </Col>
                <Col size={12} sm={12} className="px-4">
                  <span className="Text">Resultat </span>
                  <textarea
                    name="resultat"
                    value={resultat}
                    {...register("resultat")}
                    className={` ${errors.resultat ? "is-invalid" : ""}`}
                    onChange={(e) => onInputChange(e)}
                  />

                  <div className="invalid-feedback">
                    {errors.resultat?.message}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col size={12} sm={4}>
                  <button 
                  onClick={onPrevious}
                  className="prevButton">
                  {" "}
                    &lt;&lt; Précédent
                  </button>
                </Col>
                <Col size={12} sm={6}>
                  <button
                    type="submit"
                    className="nextButtonOrdonnance"
                    
                  >
                    Ordonnance &gt;&gt;
                  </button>
                </Col>
              </Row>
              </form>
            </div>
        </TrackVisibility>
      </Row>
    </div>
  );
}

export default ConsultationPatient;
