import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/style/Home.css";
import { Col, Row } from "react-bootstrap";
import { UilUsersAlt, UilUserMd, UilClock } from "@iconscout/react-unicons";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";



export default function Home() {
  const [nombrepatient, setNombrepatient] = useState(0);
  const [nombreuser, setNombreuser] = useState(0);
  const [rendezvous, setRendezvous] = useState([]);
  const [dateRdv, setDateRdv] = useState(new Date());
  const moment = require("moment");

  const formattedDate = moment(dateRdv).format("YYYY-MM-DD");

  const nombrep = async () => {
    await axios
      .get(`http://localhost:8080/nombrepatient/${"Patient"}`)
      .then((response) => {
        setNombrepatient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const nombreu = async () => {
    await axios
      .get(`http://localhost:8080/nombrepatient/${"Docteur"}`)
      .then((response) => {
        setNombreuser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    nombrep();
    nombreu();
    loadRendezvous();
  }, [formattedDate, nombrepatient, nombreuser]);


  const loadRendezvous = async () => {
    const result = await axios.get(
      `http://localhost:8080/recherche/${formattedDate}`
    );
    setRendezvous(result.data);
    console.log(result.data)
  };


  return (
    <div className="container">
      <div className="Cardcontainer">
        <Row>
          <Col size={12} sm={8}>
            <Row>
              <Col size={12} sm={1}></Col>
              <Col size={12} sm={3} className="Cardcompte">
                <div className="Cardtext">
                  <span>Nombre de patients </span>
                  <br></br>
                  <br></br>
                  <span className="nombre">{nombrepatient}</span>
                  <br></br>
                  <UilUsersAlt className="iconCard" />
                </div>
              </Col>
              <Col size={12} sm={1}></Col>
              <Col size={12} sm={3} className="Cardcomptecentre">
                <div className="Cardtext">
                  <span>Nombre d'utilisateur</span>
                  <br></br>
                  <br></br>
                  <span className="nombre">{nombreuser}</span>
                  <br></br>
                  <UilUserMd className="iconCardcentre" />
                </div>
              </Col>
              <Col size={12} sm={1}></Col>
              <Col size={12} sm={3} className="Cardcompte">
                <div className="Cardtext">
                  <span>Nombre de rdv </span>
                  <br></br>
                  <br></br>
                  <span className="nombre">{rendezvous.length}</span>
                  <br></br>
                  <UilClock className="iconCard" />
                </div>
              </Col>
              <Col size={12} sm={1}></Col>
            </Row>

            <Row>
              <Col size={12} sm={1}></Col>
              <Col size={12} sm={11}>
                <h4>Rendez-Vous</h4>
                <table
                  className="table"
                  id="tablePatient"
                  style={{ width: "100%", marginLeft: "0", height: "300px" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Nom</th>
                      <th scope="col">Prenom</th>
                      <th scope="col">Heure rdv</th>
                      <th scope="col">Date rdv</th>
                      <th scope="col">Raison</th>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
          <Col size={12} sm={1}></Col>
          <Col
            size={12}
            sm={3}
          >
            <Row>
              <Row>
                <Col
                  size={12}
                  sm={12}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "30px",
                    height: "300px",
                  }}
                >
                  <div className="Calendrierrdv">
                    <Calendar onChange={setDateRdv} value={dateRdv} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Statistique</h4>
                  <div className="chart">
                    <div className="chartgif">

                    </div>
                    <div className="chartgifs">

                    </div>
                  </div>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
