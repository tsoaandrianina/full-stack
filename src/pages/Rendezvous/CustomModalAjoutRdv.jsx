import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

export default function CustomModalAjoutRdv(props) {
  const { modalOpenAjout, setModalOpenAjout, user } = props;
  const [users, setUsers] = useState([]);

  const dropin = {
    hidden: {
      opacity: 0,
      transform: "scale(0.9)",
    },
    visible: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: "scale(0.9)",
      opacity: 0,
    },
  };

  const [rendezvous, setRendezvous] = useState({
    daterendezvous: "",
    heurerendezvous: "",
    raison: "",
    patients: user.id,
  });

  const { daterendezvous, heurerendezvous, raison } = rendezvous;

  const validationSchema = Yup.object().shape({
    daterendezvous: Yup.date()
      .required("Date de rendez vous est obligatoire")
      .min(
        new Date(),
        "Date de renezvous ne peut pas être antérieur à aujourd'hui"
      ),
    heurerendezvous: Yup.string().required("Verifier bien l'entre"),
    raison: Yup.string().required("Verifier bien l'entre"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onInputChange = (e) => {
    setRendezvous({ ...rendezvous, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setRendezvous({ ...rendezvous, patients: user.id });
  }, [user.id]);
  console.log(user.id)
 
  const onSubmit = async () => {
    await axios
      .post(`http://localhost:8080/rendezvousadd`, rendezvous)
      .then((response) => {
        alert("Rendez-vous bien enregistré");
        closeModal();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const closeModal = () => {
    setModalOpenAjout(false);
    setUsers(user);
  };
  return (
    <div>
      <AnimatePresence>
        {modalOpenAjout && (
          <motion.div
            className="wrapperm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="containerModal"
              variants={dropin}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="closeButton"
                onClick={() => closeModal()}
                onKeyDown={() => setModalOpenAjout(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              <Row>
                <div>
                  <h3>Rendez-vous : {user.name}</h3>

                  <form className="login" onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col size={12} sm={6} className="px-4">
                        <span className="Text">Date de rendez-vous </span>
                        <input
                          type="date"
                          name="daterendezvous"
                          value={daterendezvous}
                          {...register("daterendezvous")}
                          className={` ${
                            errors.daterendezvous ? "is-invalid" : ""
                          }`}
                          onChange={(e) => onInputChange(e)}
                        />
                        <div className="invalid-feedback">
                          {errors.daterendezvous?.message}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col size={12} sm={6} className="px-4">
                        <span className="Text">Heure de rendez-vous </span>
                        <input
                          name="heurerendezvous"
                          value={heurerendezvous}
                          {...register("heurerendezvous")}
                          className={` ${
                            errors.heurerendezvous ? "is-invalid" : ""
                          }`}
                          onChange={(e) => onInputChange(e)}
                        />
                        <div className="invalid-feedback">
                          {errors.heurerendezvous?.message}
                        </div>
                      </Col>
                      <Col size={12} sm={12} className="px-4">
                        <span className="Text">Raison</span>
                        <textarea
                          name="raison"
                          value={raison}
                          {...register("raison")}
                          className={` ${errors.raison ? "is-invalid" : ""}`}
                          onChange={(e) => onInputChange(e)}
                        />

                        <div className="invalid-feedback">
                          {errors.raison?.message}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col size={12} sm={6}>
                        <button type="submit" >
                          Enregistrer
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Row>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
