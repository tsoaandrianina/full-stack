import React from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { Col, Row } from "react-bootstrap";
export default function Dossier(props) {
  const { modalOpenDossier, setModalOpenDossier, dossier } = props;
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
  return (
    <div>
      <AnimatePresence>
        {modalOpenDossier && (
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
                onClick={() => {
                  setModalOpenDossier(false);
                }}
                onKeyDown={() => setModalOpenDossier(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              <div>
                <h4>
                  Dossier de {dossier.consultations[0].users[0].name} {dossier.consultations[0].users[0].username}
                </h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Nom : </b>
                    {dossier.consultations[0].users[0].name}
                  </li>
                  <li className="list-group-item">
                    <b>Prenom : </b>
                    {dossier.consultations[0].users[0].username}
                  </li>
                  <li className="list-group-item">
                    <b>Date de naissance : </b>
                    {dossier.consultations[0].users[0].datenaissance}
                  </li>
                  <li className="list-group-item">
                    <b>Sexe : </b>
                    {dossier.consultations[0].users[0].sexe}
                  </li>
                  <li className="list-group-item">
                    <b>Adresse : </b>
                    {dossier.consultations[0].users[0].adresse}
                  </li>
                  <li className="list-group-item">
                    <b>Telephone : </b>
                    {dossier.consultations[0].users[0].tel}
                  </li>
                  <li className="list-group-item">
                    <b>E-mail : </b>
                    {dossier.consultations[0].users[0].email}
                  </li>
                  <li className="list-group-item">
                    <b>Maladie : </b>
                    {dossier.consultations[0].maladie}
                  </li>
                  <li className="list-group-item">
                    <b>Medicament : </b>
                    {dossier.medicament}
                  </li>
                  <li className="list-group-item">
                    <b>Nombre medicament : </b>
                    {dossier.nombre_medicament}
                  </li>
                  <li className="list-group-item">
                    <b>Duree traitement : </b>
                    {dossier.duree_traitement}
                  </li>
                  <li className="list-group-item">
                    <b>Mode traitement : </b>
                    {dossier.mode_traitement}
                  </li>
                  <li className="list-group-item">
                    <b>Observation : </b>
                    {dossier.observation}
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
