import React, { useEffect, useState, useRef } from "react";
import "../../assets/style/Dossierpatient.css";
import { Col, Row } from "react-bootstrap";
import { UilEye,UilPrint } from "@iconscout/react-unicons";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Dossier from "./Dossier";
import DossierPdf from "./DossierPdf";



export default function Dossierpatient() {
  const componentPdf = useRef();
  const [dossiers, setDossiers] = useState([]);
  const [recherchedossier, setRecherchedossier] = useState("");
  const [selectedDossier, setSelectedDossier] = useState([]);
  const [modalOpenDossier, setModalOpenDossier] = useState(false);
  const [modalOpenDossierPdf, setModalOpenDossierPdf] = useState(false);
  
  const openModalDossier = (dossier) => {
    setSelectedDossier(dossier);
    setModalOpenDossier(true);
  };
  const openModalDossierPdf = (dossier) => {
    setSelectedDossier(dossier);
    setModalOpenDossierPdf(true);
  };

  useEffect(() => {
    loadDossiers();
  }, []);

  const loadDossiers = async () => {
    const result = await axios.get(`http://localhost:8080/ordonnances`);
    setDossiers(result.data);
  };

  const rechercherDossier = async (valeur) => {
    setRecherchedossier(valeur.target.value);

    await axios
      .get(`http://localhost:5000/recherchedossier/${valeur.target.value}`)
      .then((response) => {
        setDossiers(response.data);
      })
      .catch();
  };

  const generatePath = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Listes des patients",
    onAfterPrint: () => alert("Pdf ajouter "),
  });


  
  return (
    <div className="dossierpatient">
      <h2 className="Titreconsultation">Les patients et ses dossiers</h2>
      <div>
        <Row className="aligh-items-center">
          <Col size={12} sm={1} className="px-1"></Col>
          <Col size={12} sm={6} className="px-1">
            <input
              placeholder="Recherche"
              className="Recherche"
              value={recherchedossier}
              onChange={(valeur) => rechercherDossier(valeur)}
            />
          </Col>

          <Col size={12} sm={4} className="px-1">
            <button className="Buttonajout" onClick={generatePath}>
              Imprimer tous les dossiers
            </button>
          </Col>
        </Row>
      </div>
      <br></br>
      <div ref={componentPdf} style={{ width: "100%" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Sexe</th>
              <th scope="col">Maladie</th>
              <th scope="col">Observation</th>
              <th scope="col">Date consultation</th>
              <th scope="col">Voir</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
          {dossiers.map((dossier, index) => (
            <tr>
              <td>{dossier.consultations[0].users[0].name}</td>
              <td>{dossier.consultations[0].users[0].username}</td>
              <td>{dossier.consultations[0].users[0].sexe}</td>
              <td>{dossier.consultations[0].maladie}</td>
              <td>{dossier.observation}</td>
              <td>{dossier.consultations[0].date_consultation}</td>
              <td>
                <UilEye className="Voir" onClick={() => openModalDossier(dossier)}/>
              </td>
              <td>
                  <UilPrint className="Voir" onClick={() => openModalDossierPdf(dossier)}/>
                </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      <Dossier
        modalOpenDossier={modalOpenDossier}
        dossier={selectedDossier}
        setModalOpenDossier={setModalOpenDossier}
      />
      <DossierPdf
        modalOpenDossierPdf={modalOpenDossierPdf}
        dossier={selectedDossier}
        setModalOpenDossierPdf={setModalOpenDossierPdf}
      />
    </div>
  );
}
