import React from "react";

function PatientDetails({ onNext, user }) {
  return (
    <div>
      <h3>Detail de {user.name}</h3>
      <div>
        <div className="card-header">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Nom : </b>
              {user.name}
            </li>
            <li className="list-group-item">
              <b>Prenom : </b>
              {user.username}
            </li>
            <li className="list-group-item">
              <b>Date de naissance : </b>
              {user.datenaissance}
            </li>
            <li className="list-group-item">
              <b>Sexe : </b>
              {user.sexe}
            </li>
            <li className="list-group-item">
              <b>Adresse : </b>
              {user.adresse}
            </li>
            <li className="list-group-item">
              <b>Telephone : </b>
              {user.tel}
            </li>
            <li className="list-group-item">
              <b>E-mail : </b>
              {user.email}
            </li>

            <button className="nextButton" onClick={onNext}>
              Consultation &gt;&gt;
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
