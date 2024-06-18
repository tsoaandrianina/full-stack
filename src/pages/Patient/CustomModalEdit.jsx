import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/style/CustomModalAjout.css";
import TrackVisibility from "react-on-screen";
import { Col, Row } from "react-bootstrap";
import axios from "axios";

function CustomModalEdit(props) {
  const { modalOpenEdit, setModalOpenEdit, user } = props;
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(user);
  }, [user, modalOpenEdit]);
  const { name, username, datenaissance, sexe, adresse, tel, email } = users;

  const closeModalEdit = () => {
    setModalOpenEdit(false);
    setUsers(user);
  };

  const onInputChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    await axios
      .put(`http://localhost:8080/user/${user.id}`, users)
      .then((response) => {
        alert("Modification patient reussi");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div>
      <AnimatePresence>
        {modalOpenEdit && (
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
                onClick={() => closeModalEdit(false)}
                onKeyDown={() => setModalOpenEdit(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              <Row className="aligh-items-center">
                <br></br>
                <TrackVisibility>
                  <form className="login" onSubmit={onSubmit}>
                    <div>
                      <br></br> <br></br>
                      <br></br>
                      <h3>Modification : {user.name}</h3>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Nom"
                            name="name"
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={name}
                            defaultValue={name}
                          />
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Prenom"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            type="date"
                            value={datenaissance}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>

                        <Col size={12} sm={6} className="px-3">
                          <select
                            value={sexe}
                            onChange={(e) => onInputChange(e)}
                          >
                            <option>Sexe</option>
                            <option value="Masculin">Masculin</option>
                            <option value="Feminin">Feminin</option>
                          </select>
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Adresse"
                            name="adresse"
                            type="text"
                            value={adresse}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>

                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Telephone"
                            name="tel"
                            type="tel"
                            value={tel}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={3} className="px-1"></Col>
                        <Col size={12} sm={6} className="px-1">
                          <input
                            placeholder="E-mail"
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Row>
                          <Col size={12} sm={2}></Col>
                          <Col size={12} sm={8}>
                            <button type="submit">Modifier</button>
                          </Col>
                        </Row>
                      </Row>
                    </div>
                  </form>
                </TrackVisibility>
              </Row>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomModalEdit;
