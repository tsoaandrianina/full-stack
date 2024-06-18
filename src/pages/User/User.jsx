import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/style/Patient.css";
import { Col, Row } from "react-bootstrap";
import { UilEditAlt, UilTrashAlt, UilEye } from "@iconscout/react-unicons";
import CustomModalAjout from "./CustomModalAjout";
import CustomModalEdit from "./CustomModalEdit";
import CustomModalViewPatient from "./CustomModalViewPatient";

export default function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      `http://localhost:8080/users/patient/${"Docteur"}`
    );
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };
  const [modalOpenAjout, setModalOpenAjout] = useState(false);
  const openModalAjout = () => {
    setModalOpenAjout(true);
  };
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const openModalEdit = (user) => {
    setSelectedUser(user);
    setModalOpenEdit(true);
  };
  const [modalOpenView, setModalOpenView] = useState(false);
  const openModalView = (user) => {
    setSelectedUser(user);
    setModalOpenView(true);
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

  return (
    <div className="container">
      <h2 className="Titreh2">Liste des utilisateurs</h2>
      <div>
        <Row className="aligh-items-center">
          <Col size={12} sm={1} className="px-1"></Col>
          <Col size={12} sm={6} className="px-1">
            <input
              placeholder="Recherche"
              className="Recherche"
              value={recherche}
              onChange={(valeur) => rechercherPatient(valeur)}
            />
          </Col>

          <Col size={12} sm={4} className="px-1">
            <button className="Buttonajout" onClick={openModalAjout}>
              Creer une nouvelle utilisateur
            </button>
          </Col>
        </Row>
      </div>
      <br></br>

      <table className="table" id="tablePatient">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Sexe</th>
            <th scope="col">Adresse</th>
            <th scope="col">Telephone</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
        
          {
            users.length > 0 ?(
          users.map((user, index) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.sexe}</td>
              <td>{user.adresse}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>
                <UilEye className="Voir" onClick={() => openModalView(user)} />
              </td>
              <td>
                <UilEditAlt
                  className="Edit"
                  onClick={() => openModalEdit(user)}
                />
              </td>
              <td></td>
              <td>
                <UilTrashAlt
                  className="Delete"
                  onClick={() => deleteUser(user.id)}
                />
              </td>
            </tr>
            
          ))):(
            <tr style={{textAlign: "center"}}>
            Liste Vide
          </tr>
          )}
          
        </tbody>
      </table>

      <CustomModalAjout
        modalOpenAjout={modalOpenAjout}
        setModalOpenAjout={setModalOpenAjout}
      />
      <CustomModalEdit
        modalOpenEdit={modalOpenEdit}
        user={selectedUser}
        setModalOpenEdit={setModalOpenEdit}
      />
      <CustomModalViewPatient
        modalOpenView={modalOpenView}
        user={selectedUser}
        setModalOpenView={setModalOpenView}
      />
    </div>
  );
}
