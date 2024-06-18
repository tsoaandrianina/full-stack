import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "../../assets/style/Rendezvous.css";
import { UilPlusSquare, UilTrashAlt, UilEdit } from "@iconscout/react-unicons";
import CustomModalAjoutRdv from "./CustomModalAjoutRdv";
import CustomModalEditRdv from "./CustomModalEditRdv";
import rdv from "../../assets/img/rdv.png"
import { motion } from "framer-motion";
export default function Rendezvous() {
  const [rendezvous, setRendezvous] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedRendezvous, setSelectedRendezvous] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [rechercheRdv, setRechercheRdv] = useState("");

  useEffect(() => {
    loadRendezvous();
    loadPatient();
  }, [rendezvous]);
  const loadRendezvous = async () => {
    const result = await axios.get(`http://localhost:8080/rendezvous`);
    setRendezvous(result.data);
  };

  const loadPatient = async () => {
    const result = await axios.get(
      `http://localhost:8080/users/patient/${"Patient"}`
    );
    setUsers(result.data);
  };
  const deleteRendezvous = async (idrendezvous) => {
    await axios.delete(`http://localhost:8080/rendezvous/${idrendezvous}`);
    loadRendezvous();
  };

  const [modalOpenAjout, setModalOpenAjout] = useState(false);
  const openModalAjout = (user) => {
    setSelectedUser(user);
    setModalOpenAjout(true);
    loadRendezvous();
  };

  const [modalOpenEdit, setModalOpenEdit] = useState(false)
  const openModalEdit = (rendezvous) => {
    setSelectedRendezvous(rechercheRdv);
    setModalOpenEdit(true);
  };
  const rechercherPatient = async (valeur) => {
    setRecherche(valeur.target.value);

    await axios
      .get(
        `http://localhost:8080/users/patientRecherche/${valeur.target.value}`
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch();
  };

  const rechercherRdv = async (valeurrdv) => {
    setRechercheRdv(valeurrdv.target.value);
    await axios
      .get(
        `http://localhost:8080/rendezvousRecherche/${valeurrdv.target.value}`
      )
      .then((response) => {
        setRendezvous(response.data);
      })
      .catch();
  };
  return (
    <div className="containerRdv">
      <div className="tableaurdv">
        <Row className="rdvtitre">
          <Col size={12} sm={6}>
            {" "}
            <h4>Rendez-Vous</h4>
          </Col>
          <Col size={12} sm={4}>
            {" "}
            <input
              placeholder="Recherche"
              value={rechercheRdv}
              style={{ width: "150px", marginLeft: "20px" }}
              onChange={(valeurrdv) => rechercherRdv(valeurrdv)}
            />
          </Col>
        </Row>
        <Row>
          <Col size={12} sm={9}>
            <Row>
              <table
                className="table"
                id="tablePatient"
                style={{ width: "900px" }}
              >
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Heure rdv</th>
                    <th scope="col">Date rdv</th>
                    <th scope="col">Raison</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody className="table-group-divider">
                  {rendezvous.map((rdv, index) => (
                    <tr>
                      <td>{rdv.patients[0].name}</td>
                      <td>{rdv.patients[0].username}</td>
                      <td>{rdv.heurerendezvous}</td>
                      <td>{rdv.daterendezvous}</td>
                      <td>{rdv.raison}</td>
                      <td>
                        <UilEdit className="Edit"
                          onClick={() => openModalEdit(rdv)} />
                      </td>
                      <td>
                        <UilTrashAlt
                          className="Delete"
                          onClick={() =>
                            deleteRendezvous(rendezvous.idrendezvous)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>
            <Row>
              <Row className="rdvpatient">
                <Col size={12} sm={8}>
                  {" "}
                  <h4>Liste patient sans rendez-vous</h4>
                </Col>
                <Col size={12} sm={4}>
                  {" "}
                  <input
                    placeholder="Recherche"
                    value={recherche}
                    style={{ width: "150px" }}
                    onChange={(valeur) => rechercherPatient(valeur)}
                  />
                </Col>
              </Row>
              <table
                className="table"
                id="tablePatient"
                style={{ width: "900px" }}
              >
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Sexe</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Ajout rdv</th>
                  </tr>
                </thead>

                <tbody className="table-group-divider">
                  {users.map((user, index) => (
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.sexe}</td>
                      <td>{user.adresse}</td>
                      <td>
                        <UilPlusSquare
                          className="Voir"
                          onClick={() => openModalAjout(user)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>
          </Col>
          <Col
            size={12}
            sm={3}
          >
            <motion.div
              layout
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}>
              <h4>Planifiez le rendez-vous</h4>
              <img src={rdv} alt="Rendezvous"  />
            </motion.div>
            {/* <motion.h4
              layout
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3 }}
              >
              Ajouter des nouveaux rendez-vous
            </motion.h4> */}
          </Col>
        </Row>
      </div>
      <CustomModalAjoutRdv
        modalOpenAjout={modalOpenAjout}
        user={selectedUser}
        setModalOpenAjout={setModalOpenAjout}
      />
      <CustomModalEditRdv
        modalOpenEdit={modalOpenEdit}
        rdv={selectedRendezvous}
        setModalOpenEdit={setModalOpenEdit}
      />
    </div>
  );
}
