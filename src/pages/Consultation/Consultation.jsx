import React, { useState, useEffect } from "react";
import "../../assets/style/Consultation.css";
import axios from "axios";
export default function Consultation() {
  const [consultation, setConsultation] = useState([]);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    loadConsultation()
  },[]);

  const loadConsultation = async () => {
    const result = await axios.get(`http://localhost:8080/consultations`);
    setConsultation(result.data);
  };

  const rechercherConsultation = async (valeur) => {
    setRecherche(valeur.target.value);

    await axios
      .get(`http://localhost:8080/consultationRecherche/${valeur.target.value}`)
      .then((response) => {
        setConsultation(response.data);
      })
      .catch();
  };
  return (
    <div className="consultation">
      <h2 className="Titreconsultation">Liste consultation</h2>
      <input
        placeholder="Recherche"
        style={{width:"200px",marginLeft:"3%"}}
        className="Recherche"
        value={recherche}
        onChange={(valeur) => rechercherConsultation(valeur)}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Sexe</th>
            <th scope="col">Maladie</th>
            <th scope="col">Date de consultation</th>
            <th scope="col">Resultat</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {consultation.map((cons, index) => (
            <tr>
              <td>{cons.users[0].name}</td>
              <td>{cons.users[0].username}</td>
              <td>{cons.users[0].sexe}</td>
              <td>{cons.maladie}</td>
              <td>{cons.date_consultation}</td>
              <td>{cons.resultat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
