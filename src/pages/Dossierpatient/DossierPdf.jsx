import React, { Fragment, useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "../../component/Invoice";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

export default function DossierPdf(props) {
  const { modalOpenDossierPdf, setModalOpenDossierPdf, dossier } = props;
  const idOrdonnance = dossier.id_ordonnance ?? 9;
  const [dossiers, setDossiers] = useState({});

  useEffect(() => {
 
    loadDossiers();
  }, [dossier]);

  const loadDossiers = async () => {
    const result = await axios.get(
      `http://localhost:8080/ordonnances/${idOrdonnance}`
      
    );
  
    const fetchdata = result.data;

    const transformedData = {};

    fetchdata.forEach((obj) => {
      if (!transformedData[obj.id]) {
     
        transformedData[obj.id] = {
          id: obj.id,
          name: obj.consultations[0].users[0].name,
          username: obj.consultations[0].users[0].username,
          datenaissance: obj.consultations[0].users[0].datenaissance,
          items: [],
          maladie: obj.consultations[0].maladie,
          resultat: obj.consultations[0].resultat,
          sexe: obj.consultations[0].users[0].sexe,
          adresse: obj.consultations[0].users[0].adresse,
          tel: obj.consultations[0].users[0].tel,
          email:obj.consultations[0].users[0].email,
          dateconsultation: obj.consultations[0].date_consultation
        };
      }
      transformedData[obj.id].items.push({
        idconsultation: obj.consultations[0].id_consultation,
        maladie: obj.consultations[0].maladie,
        resultat: obj.consultations[0].resultat,
        idordonnance: obj.idordonnance,
        medicament: obj.medicament,
        nombremedicament: obj.nombre_medicament,
        dureetraitement: obj.duree_traitement,
        modetraitement: obj.mode_traitement,
        observation: obj.observation,
      });
    });
    const transformed = Object.values(transformedData)[0];
    setDossiers(transformed);
  };


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
        {modalOpenDossierPdf && (
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
                  setModalOpenDossierPdf(false);
                }}
                onKeyDown={() => setModalOpenDossierPdf(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              <Fragment>
                <PDFViewer width="520" height="500" className="app">
                  <Invoice invoice={dossier} />
                </PDFViewer>
              </Fragment>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

